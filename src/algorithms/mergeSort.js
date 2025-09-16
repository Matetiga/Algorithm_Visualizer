const animations = [];
let nextId = 0;

const BOX_WIDTH = 50;
const BOX_MARGIN = 3;
const CONTAINER_PADDING = 10;
const CONTAINER_MARGIN = 20;
const POSITION_OFFSET = 30;
let size_random_numbers = 0;
let initialOffset = 0;

const getArrayWidth = (arr) =>{

  return arr.length * (BOX_WIDTH + 2 * BOX_MARGIN) + 2 * CONTAINER_PADDING;
};

// This function determines if the current element (index) is on the left side of the level 1 Array 
// Used to determine the respective offset 
function isOnLeftSide(index){
    // max_Index is the last index that is generated
    let max_Index = 3 * (size_random_numbers-1);

    if(max_Index % 2 === 0){
        return (index < Math.ceil(max_Index / 2));
    }else {
        return (index <= Math.ceil(max_Index / 2));
    }
}


export function mergeSortAnimations(array, offset){
    nextId = 0; // this will reset the counter each sort 
    size_random_numbers = array.length;
    initialOffset = offset;

    const initialArrayObject = {
        id: `0-${nextId++}`,
        values : array.slice(),
        offset : initialOffset,
    };

    mergeSortHelper(initialArrayObject, 0, animations);
    return animations;
}

function mergeSortHelper(arrayObject, level,  animations ){
    const {id: parentId, values, offset: parentOffset} = arrayObject;

    // Divide the arrays until there is only one element on it
    if(values.length <= 1) {
        return arrayObject;
    }    
    // Divide both arrays in half
    const mid = Math.floor(values.length/2);
    const leftArray = values.slice(0, mid); // mid not included
    const rightArray = values.slice(mid); // from mid to end
    let leftArrayObject = {};
    let rightArrayObject = {};
     

    if(level + 1 === 1){
        // offset only for the first level
        leftArrayObject = {id: `${level + 1}-${nextId++}`, values: leftArray, offset: parentOffset - POSITION_OFFSET - 5};
        rightArrayObject = {id: `${level + 1}-${nextId++}`, values: rightArray, offset: parentOffset + getArrayWidth(leftArray) + 5 }; 

    }else if(level + 1 > 1 && isOnLeftSide(nextId)){ // -1 will grab the last element of the array
        // this division will make the arrays (on the left side) to spread to the left
        // objects will have the next nextId and then increase it by 1
        leftArrayObject = {id: `${level + 1}-${nextId++}`, values: leftArray, offset: (parentOffset  - 2* POSITION_OFFSET)};
        rightArrayObject = {id: `${level + 1}-${nextId++}`, values: rightArray, offset: parentOffset  + (getArrayWidth(values) - getArrayWidth(rightArray))}; 

    }else{
        // this division will make the arrays (on the right side) to spread to the right
        leftArrayObject = {id: `${level + 1}-${nextId++}`, values: leftArray, offset: parentOffset};
        rightArrayObject = {id: `${level + 1}-${nextId++}`, values: rightArray, offset: parentOffset + (getArrayWidth(values) - getArrayWidth(leftArray) + 2 * POSITION_OFFSET)}; 
    }

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
    let mergedArrayObject = {};

    // same logic as for divide process
    if(level + 1 === 1){
        mergedArrayObject = {
                id: `m-${level + 1}-${nextId++}`,
                values: mergedArray,
                offset: initialOffset, // this will center the merged array
            };

    }else if(level + 1 > 1 && isOnLeftSide(nextId)) {
        mergedArrayObject = {
                id: `m-${level + 1}-${nextId++}`,
                values: mergedArray,
                offset: leftArrayObject.offset + ((Math.floor(Math.log(size_random_numbers)) - level)* 2 * POSITION_OFFSET),
                identifier : ogLeftId,
            };

    }else {
        mergedArrayObject = {
                id: `m-${level + 1}-${nextId++}`,
                values: mergedArray,
                offset: leftArrayObject.offset + (level-1)*(2 * POSITION_OFFSET),
            };
    }

    animations.push({
        type: 'merge',
        level: level +1,
        array: mergedArrayObject,
        childIds: [ogLeftId, ogRightId],
    });
    return mergedArrayObject;
}
//module.exports = {mergeSortAnimations};