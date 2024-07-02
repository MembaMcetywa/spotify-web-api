import React, { FC } from 'react';
import Playlist from '../playlist';
import { Track } from '../../models';

interface SidebarProps {
  token: string | null;
  playlistId: string;
  onPlay: (track: Track) => void;
}

const Sidebar: FC<SidebarProps> = ({ token, playlistId, onPlay }) => {

  return (
    <div className="sidebar">
      <Playlist token={token} playlistId={playlistId} onPlay={onPlay} />
    </div>
  );
};

export default Sidebar;
