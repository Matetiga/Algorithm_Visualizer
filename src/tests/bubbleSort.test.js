const { bubbleSortAnimations } = require ("../algorithms/bubbleSort");


describe('Bubble Sort', ()=>{

    test('Sorting an ' , () => {
        const unsorted = [5, 3, 8, 4, 2];
        const sorted =    [{
         "indices":[0,1,],
         "type": "compare",},
        {
         "indices":  [0,1,],
         "type": "swap",},
        {
         "indices":  [0,1,],
         "type": "reset",},
        {
         "indices":  [1,2,],
         "type": "compare",},
        {
         "indices":  [1,2,],
         "type": "reset",},
        {
         "indices":  [2,3,],
         "type": "compare",},
        {
         "indices":  [2,3,],
         "type": "swap",},
        {
         "indices":  [2,3,],
         "type": "reset",},
        {
         "indices":  [3,4,],
         "type": "compare",},
        {
         "indices":  [3,4,],
         "type": "swap",},
        {
         "indices":  [3,4,],
         "type": "reset",},
        {
         "indices":  [0,1,],
         "type": "compare",},
        {
         "indices":  [0,1,],
         "type": "reset",},
        {
         "indices":  [1,2,],
         "type": "compare",},
        {
         "indices":  [1,2,],
         "type": "swap",},
        {
         "indices":  [1,2,],
         "type": "reset",},
        {
         "indices":  [2,3,],
         "type": "compare",},
        {
         "indices":  [2,3,],
         "type": "swap",},
        {
         "indices":  [2,3,],
         "type": "reset",},
        {
         "indices":  [0,1,],
         "type": "compare",},
        {
         "indices":  [0,1,],
         "type": "reset",},
        {
         "indices":  [1,2,],
         "type": "compare",},
        {
         "indices":  [1,2,],
         "type": "swap",},
        {
         "indices":  [1,2,],
         "type": "reset",},
        {
         "indices":  [0,1,],
         "type": "compare",},
        {
         "indices":  [0,1,],
         "type": "swap",},
        {
         "indices":  [0,1,],
         "type": "reset",},
 ];
        // 'expect' checks if the result matches the expected output
        let function_array = bubbleSortAnimations(unsorted); 
        expect(function_array).toEqual(sorted); 
    });

});
