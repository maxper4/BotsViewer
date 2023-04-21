import React, { useState, useEffect } from 'react';
import config from '../utils/config';

import BotsMonitorInfos from '../components/BotsMonitorInfos';
import Loader from '../components/Loader';

function BotsManager({apiConnection}) {
    const [availableBots, setAvailablesBots] = useState([]);
    const [loading, setLoading] = useState(true)

    const getList = () => {
        fetch(config.API_BASE_URL + "/bots-manager/list")
        .then(res => res.json())
        .then(res => {
            setAvailablesBots(res.list);
            setLoading(false);
        });
    }

    useEffect(() => {
        if(apiConnection){
            getList();
        }
        else {
            setAvailablesBots([]);
            setLoading(true);
        }
    }, [apiConnection]);

    const onClickStartBot = (botName, args) => {
        fetch(config.API_BASE_URL + "/bots-manager/start", {
            method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({botName: botName, args: args})
            })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if(!res.success) {
                alert("Something went wrong.")
            }
            else {
                setAvailablesBots(res.newList)
            }
        });
    }

    return (
        <>
        <BotsMonitorInfos botName="bots-manager" apiConnection={apiConnection} />
        <div className="App">
            <h2>Bots Manager</h2>
            <p>Bots Manager is a bot that will manage other bots: starting, managing live instances and stopping them when asked.</p>
            <section>
                <h3>Launchable</h3>
                {loading && <Loader />}
                <ul>
                    {
                        availableBots.map((bot, index) => 
                            <li key={"available" + index}>{bot} <button onClick={(e) => onClickStartBot(bot, [])}>Start</button></li>
                        )
                    }
                </ul>
                { !loading && availableBots.length == 0 && <p>None.</p>}
            </section>
        </div>
        </>
    )
}

export default BotsManager;
