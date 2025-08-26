export function bubbleSortAnimations(array){
    let animations = [];
    
    // bubble sort logic    
    let swap = true;
    let max_index = array.length -1;

    for(let i = 0; i < max_index ; i++){
        swap = false;

        // i is substracted from max_index because with each iteration (of the first loop) 
        // the biggest element will be on the right side (no need to re-check it)
        for(let n = 0; n < max_index - i; n++){
            animations.push({type : 'compare', indices: [n, n+1]});

            if(array[n] > array[n+1]){
                let helper = array[n+1];
                array[n+1] = array[n];
                array[n] = helper;
                swap = true;
                
                // maybe add a NewHight property so the hights of the columns can be updated
                animations.push({type: 'swap', indices: [n, n+1]})
            }
        }

        if(!swap){
            break;
        }
    }

    return array;
}
//module.exports = {bubbleSortAnimations};