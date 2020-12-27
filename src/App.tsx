import React from 'react';
import './App.css';
import Idea from './Idea';
import Lines from './Lines';


function App() {
  return (
    <div className="App">
      <Lines />
      <Idea x={100} y={100} />
    </div>
  );
}

export default App;
