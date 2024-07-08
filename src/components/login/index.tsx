import type React from 'react';
import type { LoginProps } from '../../models';

const Login: React.FC<LoginProps> = ({ authEndpoint, clientId, redirectUri, responseType }) => {

  const scopes = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-modify-playback-state',
    'user-read-playback-state',
    'user-read-currently-playing'
  ].join(' ');

  return (
    <header className='login'>
      <h2>The Experimental <span className='highlight'>LOOP</span>.</h2>
      <a className='login-button' href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${encodeURIComponent(scopes)}`}>
        Login via Spotify
      </a>
    </header>
  );
}

export default Login;
