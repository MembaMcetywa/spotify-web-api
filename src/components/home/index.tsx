import React, { FC } from 'react';
import Sidebar from '../sidebar';

interface HomeProps {
  token: string | null;
  playlistId: string;
  setToken: (token: string | null) => void;  
}

const Home: FC<HomeProps> = ({ token, setToken, playlistId }) => {
  return (
    <div className="home-layout">
      <Sidebar token={token} playlistId={playlistId} />
    </div>
  );
}

export default Home;
