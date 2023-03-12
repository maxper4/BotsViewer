import React, { useState, useEffect } from 'react';
import config from '../utils/config';

import "./BotsMonitorInfos.css";

function BotsMonitorInfos({botName, apiConnection}) {
    const [running, setRunning] = useState(false);
    const [ping, setPing] = useState(9999);
    let updater;
    
    const getBotInfos = () => {
        fetch(config.API_BASE_URL + "/botsInfos/" + botName)
            .then(res => res.json())
            .then(res => {
                setRunning(res.running);
                setPing(res.ping);
            });
    }

    useEffect(() => {
        if (apiConnection) {
            updater = setInterval(() => {
                getBotInfos();
            }, config.UPDATE_TICK);
        }
        else {
            clearInterval(updater);
            setRunning(false);
            setPing(9999);
        }
    }, [apiConnection]);

    return (
        <div className="bots-monitor-infos">
            <ul>
                <li> Running: {running ? <span className="green-circle">●</span> : <span className="red-circle">●</span>}</li>
                <li> Ping : {ping} ms</li>
            </ul>
        </div>
    )
}

export default BotsMonitorInfos;