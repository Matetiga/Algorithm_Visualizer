const {heapSort} = require ("../algorithms/heapSort.js");

describe('heapSort', () =>{
    test('sorting with heapSort',  () =>{
        const unsorted = [10, 8, 2, 7, 9, 1, 5]; 
        const sorted = [1, 2, 5, 7, 8, 9, 10];
        
        let heapSortedArray = heapSort(unsorted);
        expect(heapSortedArray).toEqual(sorted);
    });

    test('Merge Sort Array 2', () =>{
        const unsortedArray = [10,9,8,7,6,5,4,3,2,1];
        const sorted = [1,2,3,4,5,6,7,8,9,10];

        let heapSortedArray = heapSort(unsortedArray);
        expect(heapSortedArray).toEqual(sorted);
    });
});