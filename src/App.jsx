import { useState } from 'react'
import './css/App.css'
import SortingVisualizer from './SortingVisualizer'
import MergeSortVisualizer from './MergeSortVisualizer'

function App() {

  return (
    <>
      <div className="gradient-title"> Bubble Sort </div>
      <div className='display'>
        <SortingVisualizer />
      </div> 
      <MergeSortVisualizer />
    </>
  )
}

export default App
