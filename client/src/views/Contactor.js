import React, { useState, useEffect } from 'react';
import config from '../utils/config';

import "./Contactor.css";

import BotsMonitorInfos from '../components/BotsMonitorInfos';
import Loader from '../components/Loader';

function Contactor({apiConnection}) {
    const [contacts, setContacts] = useState([]);
    const [contactsLoading, setContactsLoading] = useState(true);

    const getContacts = () => {
        setContactsLoading(true);

        fetch(config.API_BASE_URL + "/contactor/contacts")
            .then(res => res.json())
            .then(res => { 
                setContacts(res.contacts);
                setContactsLoading(false);
            });
    }

    const onClickRemoveContact = (contact) => {
        fetch(config.API_BASE_URL + "/contactor/removeContact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({contact: contact})
        })
        .then(res => res.json())
        .then(res => {
            if(res.success){
                setContacts(contacts.filter(c => c !== contact));
            }
            else {
                alert("Something went wrong");
            }
        });
    }

    const onClickAddContact = () => {
        const nickname = document.getElementById("newContactNickname").value;
        const discordId = document.getElementById("newContactDiscordId").value;
        const permissions = parseInt(document.getElementById("newContactPermissions").value);

        fetch(config.API_BASE_URL + "/contactor/addContact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({nickname: nickname, discordId: discordId, permissions: permissions})
        })
        .then(res => res.json())
        .then(res => {
            if(res.success){
                document.getElementById("newContactNickname").value = "";
                document.getElementById("newContactDiscordId").value = "";
                document.getElementById("newContactPermissions").value = 1;

                getContacts();
            }
            else {
                alert("Something went wrong");
            }
        });
    }

    useEffect(() => {
        if(apiConnection){
            getContacts();
        }
        else {
            setContacts([]);
        }
    }, [apiConnection]);

    return (
        <>
        <BotsMonitorInfos botName="contactor" apiConnection={apiConnection} />

        <div className="App">
            <h2>Contactor</h2>
            
            <section>
                <h3>Contacts</h3>
                <ul>
                    {
                        contactsLoading ? <Loader /> :
                        contacts.map((contact, index) => 
                            <li key={"contact"+index}>
                                <span>{contact}</span> 
                                <button className="removeContactBtn" onClick={() => onClickRemoveContact(contact)}>X</button>
                            </li>)
                    }
                </ul>
                <div>
                    <h4>New contact</h4>
                    <input id="newContactNickname" type="text" placeholder="Nickname" /> <br />
                    <input id="newContactDiscordId" type="text" placeholder="Discord Id" /> <br />
                    <input id="newContactPermissions" type="number" defaultValue={1} min={1} max={3} placeholder="Permissions" /> <br />
                    <button onClick={() => onClickAddContact()}>Add</button>
                </div>
            </section> 
        </div>
        </>
    )
}

export default Contactor;
