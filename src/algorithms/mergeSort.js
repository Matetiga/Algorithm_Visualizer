const animations = [];
let nextId = 0;
export function mergeSortAnimations(array){
    nextId = 0; // this will reset the counter each sort 

    const initialArrayObject = {
        id: `0-${nextId++}`,
        values : array.slice(),
    };

    // this passes a copy of the array
    mergeSortHelper(initialArrayObject, 0, animations);
    return animations;

}

function mergeSortHelper(arrayObject, level,  animations ){
    const {id: parentId, values} = arrayObject;
    

    // Divide the arrays until there is only one element on it
    if(values.length <= 1) {
        return arrayObject;
    }    
    // Divide both arrays in half
    const mid = Math.floor(values.length/2);
    const leftArray = values.slice(0, mid); // mid not included
    const rightArray = values.slice(mid); // from mid to end

    // objects will have the next nextId and then increase it by 1
    const leftArrayObject = {id: `${level + 1}-${nextId++}`, values: leftArray};
    const rightArrayObject = {id: `${level + 1}-${nextId++}`, values: rightArray};

    animations.push({
        type: 'divide',
        level: level + 1,
        arrays : [leftArrayObject, rightArrayObject],
        parentId : parentId, // children will be linked to parent 
    });

    // recursive call
    const leftArrRecursive = mergeSortHelper(leftArrayObject, level + 1, animations);
    const rightArrRecursive = mergeSortHelper(rightArrayObject, level + 1, animations);

    return mergeArrays(leftArrRecursive, rightArrRecursive, level, animations, leftArrayObject.id, rightArrayObject.id);
}

// This merge back the arrays (sorted)
function mergeArrays(leftArrayObject, rightArrayObject,level, animations, ogLeftId, ogRightId){
    
    const mergedArray = [];
    const leftArray = leftArrayObject.values;
    const rightArray = rightArrayObject.values;

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

    // IMPORTANTE revisar el +1 de los level
    const mergedArrayObject = {
            id: `m-${level + 1}-${nextId++}`,
            values: mergedArray,
        };

    animations.push({
        type: 'merge',
        level: level +1,
        array: mergedArrayObject,
        childIds: [ogLeftId, ogRightId],
    });
    return mergedArrayObject;
}
//module.exports = {mergeSortAnimations};