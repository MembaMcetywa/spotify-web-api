import React, { FC } from 'react';
import Playlist from '../playlist';

interface SidebarProps {
  token: string | null;
  playlistId: string;
}

const Sidebar: FC<SidebarProps> = ({ token, playlistId }) => {

  return (
    <div className="sidebar">
      <Playlist token={token} playlistId={playlistId} />
    </div>
  );
};

export default Sidebar;
