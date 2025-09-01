import React, { useState, useEffect } from "react";
import { mergeSortAnimations } from "./algorithms/mergeSort";
import './css/MergeSortVisualizer.css'


export default function MergeSortVisualizer(){

    const[initialArray, setInitialArray] = useState([]);
    const[displayLevels, setDisplayLevels] = useState({});
    const[isSorting, setIsSorting] = useState(false);


    const resetArray = () =>{

        const newArray = [];
        for(let i = 0; i < 12; i++){
            newArray.push(Math.floor(Math.random() * 100));
        }

        setInitialArray(newArray);
        console.log(newArray);
        setDisplayLevels({})
    }

    useEffect(() => {
        resetArray();
    }, []);

    const mergeSort = () =>{
        setIsSorting(true);
        const animation = mergeSortAnimations([...initialArray]);

    

            for(let i = 0; i < animation.length; i++){
                setTimeout(() =>{
                    let step = animation[i];

                    setDisplayLevels(prevLevels => {
                        let newLevels = {...prevLevels};
                        let {type, level, arrays, array} = step;
                        // if(type === "divide"){
                        //     newLevels[level] = [...(newLevels[level] || []), ...array];
                        //     console.log(newLevels[level]);
                        // }
                        console.log(step);
                        // all the levels that are to be displayed (added one by one)
                        // let newLevels = {...prevLevels};
                        // console.log(newLevels);


                        // if(type === 'divide'){
                        //     newLevels[level] = [...(newLevels[level] || []), ...arrays];

                        // }else if (type === 'merge'){

                        // }
                        return newLevels;
                    });
                }, 10);
            }
        setIsSorting(false);
    
    };

  return (
    <div className="visualizer-container">
      <div className="controls">
        <button onClick={resetArray} disabled={isSorting}>New Array</button>
        <button onClick={mergeSort} disabled={isSorting}>Merge Sort</button>
      </div>
      <div className="levels-container">
        {Object.keys(displayLevels).sort().map(level => (
          <div key={level} className="level">
            {displayedLevels[level].map((arr, arrIdx) => (
              <div key={arrIdx} className="merge-array-container">
                {arr.map((value, valIdx) => (
                  <div key={valIdx} className="merge-array-box">
                    {value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

}

