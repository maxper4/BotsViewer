import React, { useState, useEffect } from 'react';
import config from '../utils/config';

import Loader from './Loader';

import "./BotsMonitorInfos.css";

function BotsMonitorInfos({botName, apiConnection}) {
    const [running, setRunning] = useState(false);
    const [ping, setPing] = useState(9999);
    const [loading, setLoading] = useState(true);
    let updater;
    
    const getBotInfos = () => {
        fetch(config.API_BASE_URL + "/botsInfos/" + botName)
            .then(res => res.json())
            .then(res => {
                setRunning(res.running);
                setPing(res.ping);
                setLoading(false);
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
            {   loading 
            && <Loader /> 
            ||
                <ul>
                    <li> Running: {running ? <span className="green-circle">●</span> : <span className="red-circle">●</span>}</li>
                    <li> Ping : {ping} ms</li>
                </ul>
            }
            
        </div>
    )
}

export default BotsMonitorInfos;