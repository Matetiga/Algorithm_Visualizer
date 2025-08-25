import React, {useState, useEffect} from "react";
import './SortingVisualizer.css';

export default function SortingVisualizer(){
    const [array, setArray] = useState([]);


    useEffect(()=> {
        resetArray();
    }, []);

    const resetArray = () =>{
        const newArray = [];

        for(let i = 0; i < 10; i++){
            newArray.push(Math.floor(Math.random() * 500-5 ) +5);
        }
        setArray(newArray);
    };
    
    return (
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
    );                                                                                                                  
}