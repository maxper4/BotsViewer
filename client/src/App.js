import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [apiResponse, setApiResponse] = useState("");

  const callAPI = () => {
    fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => setApiResponse(res));
  }

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {apiResponse}
        </a>
      </header>
    </div>
  );
}

export default App;
