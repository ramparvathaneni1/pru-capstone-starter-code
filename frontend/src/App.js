import './App.css';
import {useState, useEffect} from 'react';

function App() {

  async function fetchData() {
    let response = await fetch('http://localhost:3001/api/capstone')
    response = await response.json()
    console.log(response) 
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Pru Capstone Starter App
          (Check the Console)
        </p>
      </header>
    </div>
  );
}

export default App;
