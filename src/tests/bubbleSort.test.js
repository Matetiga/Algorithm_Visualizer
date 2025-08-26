const { bubbleSortAnimations } = require ("../algorithms/bubbleSort");


describe('Bubble Sort', ()=>{

    test('Sorting an Array' , () => {
        const unsortedArray = [5, 3, 8, 4, 2];
        const sortedArray = [2, 3, 4, 5, 8];
        // 'expect' checks if the result matches the expected output
        let function_array = bubbleSortAnimations(unsortedArray); 
        expect(function_array).toEqual(sortedArray); 
    });

    test('Already Sorted Array', ()=> {
        const sortedArray = [2, 3, 4, 5, 8];
        expect(bubbleSortAnimations(sortedArray)).toEqual(sortedArray);
    }); 
});