import React, { useState, useEffect} from "react";
import { mergeSortAnimations } from "./algorithms/mergeSort";
import './css/MergeSortVisualizer.css'

const BOX_WIDTH = 50;
const BOX_MARGIN = 3;
const CONTAINER_PADDING = 10;
const CONTAINER_MARGIN = 20;
const SIZE_RANDOM_NUMBERS = 8;
const POSITION_OFFSET = 30;

const getArrayWidth = (arr) =>{
  return arr.length * (BOX_WIDTH + 2 * BOX_MARGIN) + 2 * CONTAINER_PADDING;
};

export default function MergeSortVisualizer(){

    const[initialArray, setInitialArray] = useState([]);
    const[displayLevels, setDisplayLevels] = useState({});
    const[isSorting, setIsSorting] = useState(false);
    


    const resetArray = () =>{

        const newArray = [];
        for(let i = 0; i < SIZE_RANDOM_NUMBERS; i++){
            newArray.push(Math.floor(Math.random() * 200));
        }

        setInitialArray(newArray);

        // to show the array of Level 0
        const width  = getArrayWidth(newArray);
        const initialLeft = (document.querySelector('.levels-container').offsetWidth - width)/2;
        let initialDisplayArrayObj = {id: "0-0", values: newArray, offset: initialLeft};
        let level0 = {};
        level0[0] = [{...initialDisplayArrayObj, width}]
        setDisplayLevels(level0);
    }

    useEffect(() => {
        resetArray();
    }, []);

    const mergeSort = async () =>{
        setIsSorting(true);
        let width = getArrayWidth(initialArray);
        const animation = mergeSortAnimations([...initialArray], (document.querySelector('.levels-container').offsetWidth - width)/2);
        console.log("Whole animation", animation);

            for(let i = 0; i < animation.length; i++){
              await new Promise(resolve => setTimeout(() =>{
                  let step = animation[i];  
                  
                  setDisplayLevels(prevLevels => {
                    let newLevels = JSON.parse(JSON.stringify(prevLevels));
                    let {type, level, arrays, array, parentId, childIds} = step;

                    if(type === "divide"){
                        const parentLevel = newLevels[level - 1];
                        const parent = parentLevel.find(p => p.id === parentId);

                        if(parent){
                          const [leftChild, rightChild] = arrays;
                          const leftWidth = getArrayWidth(leftChild.values);

                          const leftChildObject = {...leftChild, width: leftWidth};
                          const rightChildObject = {...rightChild, width: getArrayWidth(rightChild.values)};

                          newLevels[level] = [...(newLevels[level] || []), leftChildObject, rightChildObject];
                        }

                    }else if(type === "merge"){
                      // find the children that are going to be merged
                      const childrenLevel = newLevels[level];
                      const firstChild = childrenLevel.find(p => p.id === childIds[0]);

                      if(firstChild){
                        // const newLeft = firstChild.left + POSITION_OFFSET
                        const newWidth = getArrayWidth(array.values);
                        const mergedArrayObject = {...array, width: newWidth};

                        // take the children Ids away
                        const filteredLevel = childrenLevel.filter(
                          arr => !childIds.includes(arr.id)
                        );
                        newLevels[level] = [...filteredLevel, mergedArrayObject];
                      }
                    }
                      return newLevels;
                  });
                    resolve();
                }, 1000));
              
                if(i === animation.length -1){
                  setIsSorting(false);
                }
            }
    };

  return (
    <div className="sorting-visualizer">
      <div className="left-section">
        <p className="explanation">
          <ul>
            <li>This algorithm recursively halves an array into smaller subarrays, sorts them 
            and then merges them back together. The formed structure resemlbes a binary tree.</li>
            <li>Fist it splits the array into two halves until 
            each subarray contains a single element (which is inherently sorted)</li>
            <li>Each subarray pair is merged back together by comparing and sorting their values</li>
            <li>This happens recursively until everything is united into one whole array</li>
            <li>Time complexity of O(n log n), making it reliable for large datasets, 
            though it requires additional space for merging</li>
          </ul>
        </p>
      </div>
      <div className="middle-section">
        <div className="controls">
          <button onClick={resetArray} disabled={isSorting}>New Array</button>
          <button onClick={mergeSort} disabled={isSorting}>Merge Sort</button>
        </div>
      </div>
      <div className="right-section">
        <div className="levels-container">
          {Object.keys(displayLevels).sort((a, b) => a-b).map(level => (
            <div key={level} className="level">
              {displayLevels[level].map((arr) => (
                <div 
                  key={arr.id} 
                  className="merge-array-container"
                  style = {{left: `${arr.offset}px`, width: `${arr.width}px`}}
                >
                  {arr.values.map((value, valIdx) => (
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
    </div>
  );

}

