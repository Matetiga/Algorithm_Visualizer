import { useState } from 'react'
import './css/App.css'
import SortingVisualizer from './SortingVisualizer'

function App() {

  return (
    <>
      <div className="gradient-title"> Bubble Sort </div>
      <div className='display'>
        <SortingVisualizer />
      </div> 
    </>
  )
}

export default App
