import React from 'react';
import { LoginProps } from '../../models';

const Login: React.FC<LoginProps> = ({ authEndpoint, clientId, redirectUri, responseType }) => {
  return (
    <header className='login'>
      <h2>The Experimental <span className='highlight'>LOOP</span>.</h2>
      <a className='login-button' href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`}>
        Login via Spotify
      </a>
    </header>
  );
}

export default Login;
