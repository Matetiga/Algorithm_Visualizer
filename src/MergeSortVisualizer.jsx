import React, { useState, useEffect, captureOwnerStack } from "react";
import { mergeSortAnimations } from "./algorithms/mergeSort";
import './css/MergeSortVisualizer.css'


export default function MergeSortVisualizer(){

    const[initialArray, setInitialArray] = useState([]);
    const[displayLevels, setDisplayLevels] = useState({});
    const[isSorting, setIsSorting] = useState(false);


    const resetArray = () =>{

        const newArray = [];
        for(let i = 0; i <16; i++){
            newArray.push(Math.floor(Math.random() * 200));
        }

        setInitialArray(newArray);
        setDisplayLevels({})
    }

    useEffect(() => {
        resetArray();
    }, []);

    const mergeSort = async () =>{
        setIsSorting(true);
        const animation = mergeSortAnimations([...initialArray]);

            for(let i = 0; i < animation.length; i++){

              await new Promise(resolve => setTimeout(() =>{
                  let step = animation[i];  

                  console.log("current step ", step);
                  setDisplayLevels(prevLevels => {
                    let newLevels = {...prevLevels};
                    let {type, level, arrays, array} = step;

                    if(type === "divide"){
                      newLevels[level] = [...(newLevels[level] || []), ...arrays];
                      console.log("Array by divide, ", newLevels[level]);

                    }else if(type === "merge"){
                      console.log("working at level : ", level);
                      let toRemoveElements = []; 
                      for(let n = 0; n < newLevels[level].length; n++){
                        const containerArray = newLevels[level][n];
                        console.log("container array ", containerArray);
                        console.log("the array ", array);

                        // we only have to check the arrays that are smaller than 'array'
                        if(array.length <= containerArray.length) continue;

                        // this will check each individual array inside the level
                        // that is smaller than 'array'
                        console.log("testing the array", array);
                        for(let j = 0; j < containerArray.length ; j++){
                          console.log("testing element in container ", containerArray[j]);
                          if(array.includes(containerArray[j])){
                            // this will append the index of the array that is a child of 'array'
                            toRemoveElements.push(n);
                            break;
                          }
                        }
                        // this two elements will be the children arrays 
                        // that created the merged 'array'
                        if(toRemoveElements.length === 2){
                          // this will exclude the child (indices) that made the 'array'
                          const filteredLevel = newLevels[level].filter((_, index) => 
                            !toRemoveElements.includes(index)
                          );
                          const updatedLevel = [...filteredLevel, array];
                          newLevels[level] = updatedLevel;
                          break;
                        }

                      }

                    }
        
                      
                      return newLevels;
                  });
                    resolve();
                }, 1000));
              
              setIsSorting(false);
            }
    
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
            {displayLevels[level].map((arr, arrIdx) => (
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

