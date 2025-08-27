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
            newArray.push(Math.floor(Math.random() * 500-5 ) +5);
        }
        setArray(newArray);
    };

    let sort_Array = () =>{
        // this will pass a copy of the array
        // only the not nested Elements of the array
        const sortedArray= bubbleSortAnimations([...array]);
        setArray(sortedArray);
    }

    const currentArray = [...array];



    // Logic for the animations
    const[isSorting, setIsSorting] = useState(false);
    const ANIMATION_SPEED = 100;

    const bubbleSort = async ()=> {
        // to trigger the re-render
        setIsSorting(true);

        const animations = bubbleSortAnimations([...array]);
        const bars = document.getElementsByClassName('array-bar');

        for(let i = 0; i < animations.length ; i++){

            const {type, indices} = animations[i];
            const [leftBar, rightBar] = indices;
            if(type === 'compare' || type === 'reset'){
                // this will change the colors of the bar depending on the animation
                let color = type === 'compare' ? 'red' : 'turquoise';
               
                await new Promise(resolve => setTimeout(() =>{
                    bars[leftBar].style.backgroundColor = color;
                    bars[rightBar].style.backgroundColor = color;
                    resolve();

                }, ANIMATION_SPEED ));
            }

            if(type === 'swap'){
                await new Promise(resolve => setTimeout(() => {
                    // change the height between the columns
                    // let helper = bars[leftBar].style.height;
                    // bars[leftBar].style.height = bars[rightBar].style.height; 
                    // bars[rightBar].style.height = helper;
    
                    let helper = currentArray[leftBar];
                    currentArray[leftBar] = currentArray[rightBar];
                    currentArray[rightBar] = helper;
                    setArray([...currentArray]);

                    resolve();
                }, ANIMATION_SPEED));
            }
        }
        setIsSorting(false);
    }

    return (
       <div>
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
            <button onClick={resetArray}> Generate new values </button>
            <button onClick={bubbleSort}> Sort the Array </button>
        </div>
    );                                                                                                                  
}