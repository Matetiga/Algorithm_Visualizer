const {mergeSortAnimations} = require ("../algorithms/mergeSort.js");

describe('Merge Sort', () =>{
    test('Merge Sort Array' , () =>{
        const unsortedArray = [5, 3, 8, 4, 2];
        const sortedArray = [2, 3, 4, 5, 8];
        // 'expect' checks if the result matches the expected output
        let function_array = mergeSortAnimations(unsortedArray); 
        expect(function_array).toEqual(sortedArray); 
    });
});