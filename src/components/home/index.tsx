import React, { type FC, useState } from 'react';
import Sidebar from '../sidebar';
import HeaderComponent from '../header';
import PlayerComponent from '../player';
import type { Track } from '../../models';

interface HomeProps {
  token: string | null;
  playlistId: string;
  setToken: (token: string | null) => void;  
}

const Home: FC<HomeProps> = ({ token, setToken, playlistId }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  return (
    <>
      <HeaderComponent />
      <div className='home-layout'>
      <Sidebar token={token} playlistId={playlistId} onPlay={setCurrentTrack} />
      <PlayerComponent token={token} track={currentTrack} />
      </div>
    </>
  );
}

export default Home;
