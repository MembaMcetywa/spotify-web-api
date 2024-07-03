import type React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Callback from './components/callback';
import useToken from './hooks/useToken';
import './App.css'


const App: React.FC = () => {
  const { token, clearToken } = useToken();
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  const AUTH_ENDPOINT = import.meta.env.VITE_AUTH_ENDPOINT;
  const RESPONSE_TYPE = import.meta.env.VITE_RESPONSE_TYPE;
  const PLAYLIST_ID =import.meta.env.VITE_PLAYLIST_ID;


  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Home token={token} setToken={clearToken} playlistId={PLAYLIST_ID} /> : <Login 
          authEndpoint={AUTH_ENDPOINT}
          clientId={CLIENT_ID}
          redirectUri={REDIRECT_URI}
          responseType={RESPONSE_TYPE}
        />} />
       <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  );
};

export default App;
