import React, {useState, useEffect} from "react";
import './css/SortingVisualizer.css';
import { bubbleSortAnimations } from "./algorithms/bubbleSort";

export default function SortingVisualizer(){
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
            <button onClick={sort_Array}> Sort the Array </button>
        </div>
    );                                                                                                                  
}