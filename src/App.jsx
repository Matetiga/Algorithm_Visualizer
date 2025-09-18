import { useState, useEffect, useRef } from 'react'
import './css/App.css'
import SortingVisualizer from './SortingVisualizer'
import MergeSortVisualizer from './MergeSortVisualizer'

function App() {
  const [isMergeSortVisible, setIsMergeSortVisible] = useState(false);
  const mergeSortRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMergeSortVisible(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '-100px 0px' // Trigger 100px before the section enters viewport
      }
    );

    if (mergeSortRef.current) {
      observer.observe(mergeSortRef.current);
    }

    return () => {
      if (mergeSortRef.current) {
        observer.unobserve(mergeSortRef.current);
      }
    };
  }, []);

  return (
    <>
      <section className='algorithm-container'>
        <h2 className="gradient-title left-aligned"> Bubble Sort </h2>
        <SortingVisualizer />
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
      </section>
    </>
  )
}

export default App
