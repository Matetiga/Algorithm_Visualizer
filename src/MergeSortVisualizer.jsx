import React, { useState, useEffect } from "react";
import { mergeSortAnimations } from "./algorithms/mergeSort";
import './css/MergeSortVisualizer.css'


export default function MergeSortVisualizer(){

    const[initialArray, setInitialArray] = useState([]);
    const[displayLevels, setDisplayLevels] = useState({});
    const[isSorting, setIsSorting] = useState(false);

    useEffect(() => {
        resetArray();
    })

    const resetArray = () =>{

        const newArray = [];
        for(let i = 0; i < 12; i++){
            newArray.push(Math.floor(Math.random() * 100));
        }

        setInitialArray(newArray);
        setDisplayLevels({})
    }


    const mergeSort = () =>{
        const animation = mergeSortAnimations([...initialArray]);
    }

}

