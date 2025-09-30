import { useState, useEffect, useRef } from 'react'
import './css/App.css'
import SortingVisualizer from './SortingVisualizer'
import MergeSortVisualizer from './MergeSortVisualizer'
import HeapSortVisualizer from './HeapSortVisualizer';

function App() {
  const [isMergeSortVisible, setIsMergeSortVisible] = useState(false);
  const [isBubbleExplanationVisible, setIsBubbleExplanationVisible] = useState(false);
  const [isMergeExplanationVisible, setIsMergeExplanationVisible] = useState(false);
  const [isHeapSortVisible, setIsHeapSortVisible] = useState(false);
  const [isHeapExplanationVisible, setIsHeapExplanationVisible] = useState(false);
  
  const mergeSortRef = useRef(null);
  const bubbleExplanationRef = useRef(null);
  const mergeExplanationRef = useRef(null);
  const heapSortRef = useRef(null);
  const heapExplanationRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMergeSortVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '-100px 0px'
      }
    );

    const bubbleExplanationObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsBubbleExplanationVisible(true);
        }
      },
      {
        threshold: 0.5,
        rootMargin: '-50px 0px'
      }
    );

    const mergeExplanationObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMergeExplanationVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '-50px 0px'
      }
    );

    const heapSortObserver = new IntersectionObserver(
      ([entry]) =>{
        if(entry.isIntersecting){
          setIsHeapSortVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '-200px 0px'
      }
    );
    
    const heapExplanationObserver = new IntersectionObserver(
      ([entry]) => {
        if(entry.isIntersecting){
          setIsHeapExplanationVisible(true);
        }
      },
      {
        threshold : 0.3,
        rootMargin : '-50px 0px'
      }
    );

    if (mergeSortRef.current) {
      observer.observe(mergeSortRef.current);
    }

    if (bubbleExplanationRef.current) {
      bubbleExplanationObserver.observe(bubbleExplanationRef.current);
    }

    if (mergeExplanationRef.current) {
      mergeExplanationObserver.observe(mergeExplanationRef.current);
    }

    if(heapSortRef.current){
      heapSortObserver.observe(heapSortRef.current);
    }
    
    if (heapExplanationRef.current){
      heapExplanationObserver.observe(heapExplanationRef.current);
    }

    return () => {
      if (mergeSortRef.current) {
        observer.unobserve(mergeSortRef.current);
      }
      if (bubbleExplanationRef.current) {
        bubbleExplanationObserver.unobserve(bubbleExplanationRef.current);
      }
      if (mergeExplanationRef.current) {
        mergeExplanationObserver.unobserve(mergeExplanationRef.current);
      }

      if(heapSortRef.current){
        heapSortObserver.unobserve(heapSortRef.current);
      }

      if(heapExplanationRef.current){
        heapExplanationObserver.unobserve(heapExplanationRef.current);
      }
    };
  }, []);

  return (
    <>
      <section className='algorithm-container'>
        <h2 className="gradient-title bubble-sort"> Bubble Sort </h2>
        <SortingVisualizer />
        <p 
          ref={bubbleExplanationRef}
          className={`additional-explanation ${isBubbleExplanationVisible ? 'animate-in' : ''}`}
        >
          The bars that turn to a darker blue, are the bars that are currently being compared.
          If the right bar is bigger than the left one, both swap places.
          This occurrs with all bars adjacent to one another until everything is sorted, 
          from the smallest to the biggest number.
          <br/>
          In terms of <strong>time complexity</strong>, its best time is of O(n), when the array is already sorted,
          and has an <strong>average of O(n^2)</strong>, meaning is not the best, when having a large data set.
        </p>
      </section> 

      <section 
        ref={mergeSortRef}
        className={`algorithm-container ${isMergeSortVisible ? 'visible' : ''}`}
      >
        <h2 className={`gradient-title right-aligned ${isMergeSortVisible ? 'animate-in' : ''}`}>
          Merge Sort
        </h2>
        <div className={`merge-content ${isMergeSortVisible ? 'animate-in' : ''}`}>
          <MergeSortVisualizer />
        </div>
          <p 
            ref={mergeExplanationRef}
            className={`additional-explanation merge-Sort ${isMergeExplanationVisible ? 'animate-in' : ''}`}
          >
            Fist it splits the array into two halves until 
            each subarray contains a single element (which is inherently sorted).
            Each subarray pair is merged back together by comparing and sorting their values.
            This happens recursively until everything is united into one whole array.
            <br/>
            <strong>Time complexity</strong> in best, worst and average case is of  
            <strong> O(n log n)</strong>, making it reliable for large datasets, 
            though it requires additional space for merging, taking O(n) space.
          </p>
      </section>
      <section 
        ref={heapSortRef}
        className={`algorithm-container ${isHeapSortVisible ? 'visible' : ''}` }
      >
        <h2 className={`gradient-title left-aligned ${isHeapSortVisible ? 'animate-in' : ''}`}>
          Heap Sort
        </h2>
        <div className={`merge-content ${isHeapSortVisible ? 'animate-in' : ''}`}>
          <HeapSortVisualizer />
        </div>
        <p
          ref={heapExplanationRef}
          className={`additional-explanation ${isHeapExplanationVisible? 'animate-in' : ''}`}
        >
          It is a comparison based algorithm, that converts the array into a max heap (value on root is the largest).
          Therefore the array is represented as a binary tree.
          Each parent node is compared with its children (both turn sky blue) and must be bigger, if not, the parent node is swapped 
          with the largest child (heap quality).
          <br />
          This 'heapify' process is repeated until every node satisfies the heap quality. 
          After that, the first and last element of the current heap are swapped. In this way, the largest number
          will be sorted to the end of the array. Then is marked as 'sorted' (grey color), and the current heap
          lenght is reduced by one to avoid comparing with already sorted values. 
          <br />
          In all posible scenarios, the array is sorted with a <strong>time complexity</strong> of <strong>O(n log n) </strong>
          making it reliable for bigger datasets. 
        </p>
      </section>
    </>
  )
}

export default App
