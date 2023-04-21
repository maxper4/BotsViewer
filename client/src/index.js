import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';

import './index.css';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import PageNotFound from './views/PageNotFound';

import Contactor from './views/Contactor';
import WalletListener from './views/WalletListener';
import BotsManager from './views/BotsManager';

import config from './utils/config';

const Main = () => {
  const [apiConnection, setApiConnection] = useState(false);
  const [apiResponse, setApiResponse] = useState("");

  useEffect(() => {
    testCallAPI();
  }, []);

  const testCallAPI = () => {
    fetch(config.API_BASE_URL + "/testAPI").catch(err => { console.log(err); setApiResponse("Something went wrong while calling API."); setApiConnection(false);})
        .then(res => res.text())
        .then(res => { setApiResponse(res); setApiConnection(true); });
  }

  return (
    <>
    <Header />
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<App apiConnection={apiConnection}/>}/>.
          <Route path="/contactor" element={<Contactor apiConnection={apiConnection}/>}/>
          <Route path="/wallet-listener" element={<WalletListener apiConnection={apiConnection}/>}/>
          <Route path="/bots-manager" element={<BotsManager apiConnection={apiConnection}/>} />
          <Route path="/404" element={ <PageNotFound /> } />
          <Route path="/*" element={ <Navigate from="/" to="/404" /> } />
      </Routes>
    </BrowserRouter>
    <Footer apiResponse={apiResponse}/>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
