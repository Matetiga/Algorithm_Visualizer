import React, {useState, useEffect} from "react";
import './css/HeapSortVisualizer.css'
import {heapSortAnimations} from "./algorithms/heapSort";


const ACCENT_COLOR = '#5F80D9'
const PRIMARY_COLOR = 'transparent'
const SORTED_COLOR = '#808080'

export default function HeapSortVisualizer(){
    const [array, setArray] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const ANIMATION_SPEED = 1000;

    useEffect(() => {
        resetArray();
    }, []);

    const resetArray = () =>{
        if (isSorting) return;

        let newArray = [];
        for(let i = 0; i< 7 ; i++){
            newArray.push(Math.floor(Math.random() * 99) + 1);
        }
        setArray(newArray);
        let nodes = document.getElementsByClassName('heap-node');
        for(let i = 0; i < nodes.length; i++){
            nodes[i].style.backgroundColor = PRIMARY_COLOR;
        }
    };

    const rootPosition = {x: 280, y: 100};
    const levelHeight = 70;
    const horizontalSpacing = 70;

    const getNodePosition = (index) =>{
        if(index === 0){
            return rootPosition;
        }        
        const level = Math.floor(Math.log2(index +1));
        const nodesInLevel = Math.pow(2, level);
        const positionInLevel = index - (nodesInLevel - 1);

        const levelWidth = horizontalSpacing * Math.pow(2, level - 1); 
        const nodeSpacing = levelWidth / (nodesInLevel /2);

        const x = rootPosition.x + (positionInLevel- (nodesInLevel -1)/2) * nodeSpacing;  
        const y = rootPosition.y + levelHeight * level;

        return {x, y};
    };

    const heapSort = async () =>{
        setIsSorting(true);
        const animations = heapSortAnimations([...array]);
        console.log("animations", animations);
        const nodes = document.getElementsByClassName('heap-node');
        const currentArray = [...array];
        
        for(let i= 0; i < animations.length; i++){
            const {type, indices, sortedIndex} = animations[i];
            if(type === "compare"){
                console.log("comparing");
                const [ index1, index2] = indices;
                await new Promise(resolve => setTimeout(() =>{
                    nodes[index1].style.backgroundColor = ACCENT_COLOR;
                    nodes[index2].style.backgroundColor = ACCENT_COLOR;
                    resolve();
                }, ANIMATION_SPEED));
            }
            if(type === "swap"){
                const [ index1, index2] = indices;
                const node1 =nodes[index1];
                const node2 = nodes[index2];

                const pos1 = getNodePosition(index1);
                const pos2 = getNodePosition(index2);

                const deltaX1 = pos2.x - pos1.x;
                const deltaY1 = pos2.y - pos1.y;
                const deltaX2 = pos1.x - pos2.x;
                const deltaY2 = pos1.y - pos2.y;


                node1.style.transform = `translate(${deltaX1}px, ${deltaY1}px)`;
                node2.style.transform = `translate(${deltaX2}px, ${deltaY2}px)`;
                
                await new Promise(resolve => setTimeout(resolve, ANIMATION_SPEED));

                const temp = currentArray[index1];
                currentArray[index1] = currentArray[index2];
                currentArray[index2] = temp;

                node1.style.transition = 'none';
                node2.style.transition = 'none';
                node1.style.transform= '';
                node2.style.transform= '';

                setArray([...currentArray]);
                
                await new Promise(resolve => setTimeout(resolve, 100));
                const newNodes = document.getElementsByClassName('heap-node');
                newNodes[index1].style.transition = `transform ${ANIMATION_SPEED}ms, background-color 0.3s ease-in-out`;
                newNodes[index2].style.transition = `transform ${ANIMATION_SPEED}ms, background-color 0.3s ease-in-out`;
            }
            if(type === "sorted"){
                await new Promise(resolve => setTimeout(()=>{
                    nodes[sortedIndex].style.backgroundColor = SORTED_COLOR;
                    resolve();
                }, ANIMATION_SPEED/2));
            }


            if(type === "reset"){
                console.log("reseting");
                const [ index1, index2] = indices;
                await new Promise(resolve => setTimeout(()=>{
                    nodes[index1].style.backgroundColor = PRIMARY_COLOR;
                    nodes[index2].style.backgroundColor = PRIMARY_COLOR;
                    resolve();
                }, ANIMATION_SPEED));
            }
        }
        setIsSorting(false);
    };

    return(
        <div className="sorting-visualizer">
            <div className="left-section heap-sort-graph">
                <div className="heap-array-container">
                    {array.map((value, index) =>{
                        const position = index * 60;
                        return(
                            <div
                                key={index}
                                className="heap-array-box"
                                style={{left: `${position}px`}}
                            >
                                {value}
                            </div>
                        )
                    })}
                </div>
                <div>
                    {array.map((value, index) => {
                        const position = getNodePosition(index);
                        return(
                            <div
                                key = {index}
                                className="heap-node"
                                style={{
                                    left: `${position.x}px`,
                                    top: `${position.y}px`,
                                }}
                            >
                                {value}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="middle-section">
                <div className="controls">
                    <button onClick={resetArray} disabled={isSorting}>New Array</button>
                    <button onClick={heapSort} disabled={isSorting}>Heap Sort</button>
                </div>    
            </div>
            <div className="right-section">
                <p className="explanation">
                    Efficient comparison-based algorithm, that uses a binary heap structure
                    to sort elements (here in ascending order).
                    <br />
                    The algorithm constantly 
                    swaps the root with the last node, while mantaining the 'heap' quality
                    between parent and child nodes. 
                </p>
            </div>
        </div>
    );

}