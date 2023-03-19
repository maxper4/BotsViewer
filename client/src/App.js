import './App.css';
import React, { useState, useEffect } from 'react';
import config from './utils/config';

function App({apiConnection}) {
  const [availableBots, setAvailableBots] = useState([]);
  const [runningBots, setRunningBots] = useState([]);

  let updater;

  const getAvailableBots = () => {
    fetch(config.API_BASE_URL + "/availablesBots")
        .then(res => res.json())
        .then(res => setAvailableBots(res.availableBots));
  }

  const getRunningBots = () => {
    fetch(config.API_BASE_URL + "/runningBots")
    .then(res => res.json())
    .then(res => setRunningBots(res.runningBots));
}

  useEffect(() => {
    if (apiConnection) {
      updater = setInterval(() => {
        getRunningBots();
      }, config.UPDATE_TICK);

      getAvailableBots();
    }
    else {
      setAvailableBots([]);
      setRunningBots([]);

      clearInterval(updater);
    }
  }, [apiConnection]);

  return (
    <div className="App">
      <div className="separator-horizontal">
        <section>
          <h2>Running Bots</h2>
          <ul id="runningBotsList">
            {runningBots.map((bot, index) => (
              <li key={"running-bot" + index}><a href={config.BOTS[bot].page}>{config.BOTS[bot].name}</a></li>
            ))}
          </ul>
        </section>
        <div className="vertical-line"></div>
        <section>
          <h2>Available Bots</h2>
          <ul>
            {availableBots.map((bot, index) => (
              <li key={"avalaible-bot" + index}><a href={config.BOTS[bot].page}>{config.BOTS[bot].name}</a></li>
            ))}
          </ul>
        </section>
      </div>
      
    </div>
  );
}

export default App;
