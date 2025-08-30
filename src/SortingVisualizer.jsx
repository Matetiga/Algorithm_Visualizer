import React, {useState, useEffect} from "react";
import './css/SortingVisualizer.css';
import { bubbleSortAnimations } from "./algorithms/bubbleSort";

export default function SortingVisualizer(){
    // React hook that returns an array with two elements: the state variable and the setter function
    // when the (state variable) value changes, the page will trigger a re-render
    const [array, setArray] = useState([]);


    useEffect(()=> {
        resetArray();
    }, []);
    
    // Generate an array with random numbers between 5 and 500
    const resetArray = () =>{
        const newArray = [];

        for(let i = 0; i < 10; i++){
            newArray.push(Math.floor(Math.random() * 500 ));
        }
        setArray(newArray);
    };

    // this will pass a copy of the array
    // only the not nested Elements of the array
    const currentArray = [...array];



    // Logic for the animations
    const[isSorting, setIsSorting] = useState(false);
    const ANIMATION_SPEED = 300;

    const bubbleSort = async ()=> {
        // to trigger the re-render
        setIsSorting(true);

        const animations = bubbleSortAnimations([...array]);
        const bars = document.getElementsByClassName('array-bar');

        for(let i = 0; i < animations.length ; i++){

            const {type, indices} = animations[i];
            const [leftBarIndex, rightBarIndex] = indices;
            const leftBar = bars[leftBarIndex];
            const rightBar = bars[rightBarIndex];
            if(type === 'compare' || type === 'reset'){
                // this will change the colors of the bar depending on the animation
                let color = type === 'compare' ? 'red' : 'turquoise';
               
                await new Promise(resolve => setTimeout(() =>{
                    leftBar.style.backgroundColor = color;
                    rightBar.style.backgroundColor = color;
                    // resolve() must be called here, to let the Promise be fullfilled after the colors have changed
                    resolve();

                }, ANIMATION_SPEED ));
            }

            if(type === 'swap'){
                const leftBarHeight = leftBar.style.height;
                const rightBarHeight = rightBar.style.height;

                let barWidth = rightBar.parentElement.offsetLeft - leftBar.parentElement.offsetLeft -1 ;
                
                leftBar.style.transform = `translateX(${barWidth}px)`;
                rightBar.style.transform = `translateX(-${barWidth}px)`;
                
                // this will tell the async function (bubbleSort) to wait for the css animation
                await new Promise(resolve => setTimeout(resolve, ANIMATION_SPEED));
                

                // The following six lines will prevent the bars from glitching back
                // to their original positions
                leftBar.style.transition= 'none';
                rightBar.style.transition = 'none';
                
                // manually changing the height of both bars so the DOM is kept consistent
                leftBar.style.height = rightBarHeight;
                rightBar.style.height = leftBarHeight; 

                // with the transform undone, the bars are in their original position (but with swapped heights)
                leftBar.style.transform = '';
                rightBar.style.transform = '';
            
                // change the index between the columns
                let helper = currentArray[leftBarIndex];
                currentArray[leftBarIndex] = currentArray[rightBarIndex];
                currentArray[rightBarIndex] = helper;
                // this will redo the DOM with the swapped heights of the bars
                setArray([...currentArray]);

                // wait a frame for React re render
                await new Promise(resolve => setTimeout(resolve, 0));

                // Re-enable transitions on the *newly rendered* bars so they are ready
                // for the next animation in the loop.
                const newBars = document.getElementsByClassName('array-bar');
                newBars[leftBarIndex].style.transition = `transform ${ANIMATION_SPEED}ms,
                    background-color 0.2s ease-in-out`;
                newBars[rightBarIndex].style.transition = `transform ${ANIMATION_SPEED}ms,
                     background-color 0.2s ease-in-out`;
            }
            
        }
        setIsSorting(false);
    }

    return (
       <div className="bubbleSort">
            <div className="array-container">
                {array.map((value, key) =>(
                    <div className="bar-container">
                    <div
                        className="array-bar"
                        key={key}
                        style={{height:`${value}px`}}>
                    
                    </div>
                    <p>{value}</p>
                </div>
                ))}
            </div>
            <div>
                <button onClick={resetArray}> Generate new values </button>
                <button onClick={bubbleSort}> Sort the Array </button>
                <p>How it works</p>
            </div>
        </div>
    );                                                                                                                  
}