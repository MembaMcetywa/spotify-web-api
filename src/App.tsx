import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Callback from './components/callback';

const App: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  const AUTH_ENDPOINT = import.meta.env.VITE_AUTH_ENDPOINT;
  const RESPONSE_TYPE = import.meta.env.VITE_RESPONSE_TYPE;
  const PLAYLIST_ID =import.meta.env.RESPONSE_TYPE;

  useEffect(() => {
    const hash = window.location.hash;
    let newToken = window.localStorage.getItem('token');
    if (!newToken && hash) {
      const tokenParam = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"));
      newToken = tokenParam ? tokenParam.split("=")[1] : null;
      window.location.hash = "";
      if (newToken) {
        window.localStorage.setItem("token", newToken);
      }
    }
    setToken(newToken || '');
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Home token={token} setToken={setToken} /> : <Login 
          authEndpoint={AUTH_ENDPOINT}
          clientId={CLIENT_ID}
          redirectUri={REDIRECT_URI}
          responseType={RESPONSE_TYPE}
        />} />
       <Route path="/callback" element={<Callback setToken={setToken} />} />
      </Routes>
    </Router>
  );
};

export default App;
