export function mergeSortAnimations(array){

    const animations = [];
    animations.push({
        type: 'divide',
        level: 0,
        arrays: [array.slice()], 

    })

    // this passes a copy of the array
    return mergeSortHelper(array.slice(), 0, animations);
    //return animations;
}

function mergeSortHelper(array, level, animations ){

    // Divide the arrays until there is only one element on it
    if(array.length <= 1) return array;
    
    // Divide both arrays in half
    const arr_length = array.length;
    const leftArray = array.slice(0, Math.floor(arr_length/2));
    const rightArray = array.slice(Math.floor(arr_length/2),arr_length);

    animations.push({
        type: 'divide',
        level: level + 1,
        arrays : [leftArray, rightArray],
    });

    // recursive call
    const leftArrRecursive = mergeSortHelper(leftArray, level + 1, animations);
    const rightArrRecursive = mergeSortHelper(rightArray, level + 1, animations);


    return mergeArrays(leftArrRecursive, rightArrRecursive, level, animations);
}

// This merge back the arrays (sorted)
function mergeArrays(leftArray, rightArray,level, animations){
    
    const mergedArray = [];
    let i = 0, j = 0;
    while( i < leftArray.length && j < rightArray.length ){
        if(leftArray[i] < rightArray[j]){
            mergedArray.push(leftArray[i]);
            i++;
        }else{
            mergedArray.push(rightArray[j]);
            j++;
        }
    }
    // To push the rest of the elements to the array
    // one of these indices will already equal the array.length
    while(i < leftArray.length){
        mergedArray.push(leftArray[i]);
        i++
    }

    while(j < rightArray.length){
        mergedArray.push(rightArray[j]);
        j++
    }

    animations.push({
        type: 'merge',
        level: level +1,
        array: [mergedArray]
    });
    return animations;
}
//module.exports = {mergeSortAnimations};