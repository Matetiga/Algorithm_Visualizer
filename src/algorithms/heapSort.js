// root index, is the index of the current parent heapLength 
// heapLength is the current size of the current heap portion of the array
function heapify(array, heapLength, rootIndex, animations){

    let largest = rootIndex;

    // left child
    let leftIndex = 2 * rootIndex +1;
    // right child 
    let rightIndex = 2 * rootIndex + 2;

    if(leftIndex < heapLength ){
        animations.push({type: "compare", indices: [rootIndex, leftIndex]});
        animations.push({type : "reset", indices: [rootIndex, leftIndex]});
        if(array[largest] < array[leftIndex]){
            largest = leftIndex;
        }
    }
    if(rightIndex < heapLength){
        animations.push({type: "compare", indices: [rootIndex, rightIndex]});
        animations.push({type : "reset", indices: [rootIndex, rightIndex]});
        if(array[largest] < array[rightIndex]){
            largest = rightIndex;
        }
    }

    if(largest !== rootIndex){
        animations.push({type: "swap", indices: [largest, rootIndex]});
        let temp = array[rootIndex];
        array[rootIndex] = array[largest];
        array[largest] = temp;

        // recursively heapify affected sub arrays
        heapify(array, heapLength, largest, animations);
    }
}

export function heapSortAnimations(array){
    let animations = [];
    let length = array.length;

    for(let i = Math.floor(length/2) - 1; i >= 0 ; i--){
        heapify(array, length, i, animations);
    }

    for(let i = length - 1; i > 0; i--){
        animations.push({type : "compare", indices: [0, i]});
        animations.push({type : "reset", indices: [0, i]});
        animations.push({ type: "swap", indices: [0, i] }); 

        // swap the first element (root) with the last element
        let temp = array[0];
        array[0] = array[i];
        array[i] = temp;

        animations.push({type: "sorted", sortedIndex: i});
        // the last items on the heap will continously be sorted 
        // therefore call heapify on the reduced heap
        heapify(array, i, 0, animations);
    }
    animations.push({type: "sorted", sortedIndex: 0});
    
    return animations;
}
// module.exports = {heapSort};