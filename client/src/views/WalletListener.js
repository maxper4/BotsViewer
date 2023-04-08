import React, { useState, useEffect } from 'react';
import config from '../utils/config';

import "./WalletListener.css";

import BotsMonitorInfos from '../components/BotsMonitorInfos';
import Loader from '../components/Loader';

function WalletListener({apiConnection}) {
    const [targets, setTargets] = useState([]);
    const [targetsLoading, setTargetsLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const [transactionsLoading, setTransactionsLoading] = useState(true);
    let updater;
    
    const getTargets = () => {
        fetch(config.API_BASE_URL + "/wallet-listener/targets")
            .then(res => res.json())
            .then(res => {
                setTargets(res.targets);
                setTargetsLoading(false);
            });
    }

    const getTransactions = () => {
        fetch(config.API_BASE_URL + "/wallet-listener/transactions")
            .then(res => res.json())
            .then(res => {
                setTransactions(res.transactions.sort((x, y) => x.blockNumber > y.blockNumber ? -1 : 1));
                setTransactionsLoading(false);
            });
    }

    const onClickRemoveAddress = (address) => {
        setTargetsLoading(true);

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
            setTargetsLoading(false);
        });
    }

    const onClickAddTarget = () => {
        const address = document.getElementById("newTargetAddress").value;
        setTargetsLoading(true);

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
                setTargetsLoading(false);
            }
        });
    }

    const onClickRemoveTx = (hashes) => {
        fetch(config.API_BASE_URL + "/wallet-listener/removeTransactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({hashes: hashes})
        })
        .then(res => res.json())
        .then(res => {
            if(res.success){
                setTransactions(transactions.filter(t => !hashes.includes(t.hash)));
            }
            else {
                alert("Something went wrong");
            }
        });
    }

    useEffect(() => {
        if(apiConnection){
            getTargets();

            updater = setInterval(() => {
                getTransactions();
            }, config.UPDATE_TICK);
        }
        else {
            setTargets([]);
            if(updater){
                clearInterval(updater);
            }
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
                {targetsLoading && <Loader />}
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
            <section>
                <h3>Transactions</h3>
                {transactionsLoading && <Loader />}
                {
                    transactions.length === 0 && !transactionsLoading && <p>No transactions</p>
                }
                {
                    transactions.length > 0 && !transactionsLoading && <button onClick={() => onClickRemoveTx(transactions.map(t => t.hash))}>Remove all</button>
                }
                <ul>
                    {transactions.map((tx, index) => (
                        <li key={"transaction" + index}>
                            <span>
                                <a href={tx.url} target="_blank" rel="noreferrer">{"[" + tx.blockNumber + "] " + tx.hash}</a>
                                <button className="removeAddressBtn" onClick={() => onClickRemoveTx([tx.hash])}>X</button>
                            </span>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
        </>
    )
}

export default WalletListener;
