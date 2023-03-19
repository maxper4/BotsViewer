import React, { useState, useEffect } from 'react';
import config from '../utils/config';

import "./WalletListener.css";

import BotsMonitorInfos from '../components/BotsMonitorInfos';

function WalletListener({apiConnection}) {
    const [targets, setTargets] = useState([]);
    
    const getTargets = () => {
        fetch(config.API_BASE_URL + "/wallet-listener/targets")
            .then(res => res.json())
            .then(res => setTargets(res.targets));
    }

    const onClickRemoveAddress = (address) => {
        fetch(config.API_BASE_URL + "/wallet-listener/removeTarget", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({address: address})
        })
        .then(res => res.json())
        .then(res => {
            if(res.success){
                setTargets(targets.filter(t => t !== address));
            }
            else {
                alert("Something went wrong");
            }
        });
    }

    const onClickAddTarget = () => {
        const address = document.getElementById("newTargetAddress").value;

        fetch(config.API_BASE_URL + "/wallet-listener/addTarget", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({address: address})
        })
        .then(res => res.json())
        .then(res => {
            if(res.success){
                document.getElementById("newTargetAddress").value = "";
                getTargets();
            }
            else {
                alert("Something went wrong");
            }
        });
    }

    useEffect(() => {
        if(apiConnection){
            getTargets();
        }
        else {
            setTargets([]);
        }
    }, [apiConnection]);

    return (
        <>
        <BotsMonitorInfos botName="wallet-listener" apiConnection={apiConnection} />
        <div className="App">
            <h2>Wallet Listener</h2>
            <p>Wallet listener is a bot that will listen for given wallets and will send a notification when a transaction is received.</p>
            <section>
                <h3>Targets</h3>
                <ul>
                    {targets.map((target, index) => (
                        <li key={"target" + index}>
                            <span>{target}</span> 
                            <button className="removeAddressBtn" onClick={() => onClickRemoveAddress(target)}>X</button>
                        </li>
                    ))}
                </ul>
                <div>
                    <h4>New target</h4>
                    <input id="newTargetAddress" type="text" placeholder="Address" /> <br />
                    <button onClick={() => onClickAddTarget()}>Watch</button>
                </div>
            </section> 
        </div>
        </>
    )
}

export default WalletListener;
