import './App.css';
import React, { useState, useEffect } from 'react';
import config from './utils/config';

function App() {
  const [apiResponse, setApiResponse] = useState("");
  const [runningBots, setRunningBots] = useState([]);

  const testCallAPI = () => {
    fetch(config.API_BASE_URL + "/testAPI").catch(err => { console.log(err); setApiResponse("Something went wrong while calling API.")})
        .then(res => res.text())
        .then(res => setApiResponse(res));
  }

  const getAvailableBots = () => {
    fetch(config.API_BASE_URL + "/availablesBots")
        .then(res => res.json())
        .then(res => setRunningBots(res.availableBots));
  }

  useEffect(() => {
    testCallAPI();
    getAvailableBots();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Maxper's Bots Army</h1>
      </header>
      <div className="separator-horizontal">
        <section>
          <h2>Running Bots</h2>
          <p>Not yet.</p>
        </section>
        <div className="vertical-line"></div>
        <section>
          <h2>Available Bots</h2>
          <ul>
            {runningBots.map((bot, index) => (
              <li key={"running-bot" + index}>{bot}</li>
            ))}
          </ul>
        </section>
      </div>
      <footer>
        <p>
        {apiResponse}
        </p>
      </footer>
    </div>
  );
}

export default App;
