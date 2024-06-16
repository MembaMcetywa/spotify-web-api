import React, { FC } from 'react';
import Playlist from '../playlist';

interface SidebarProps {
  token: string | null;
  playlistId: string;
}

const Sidebar: FC<SidebarProps> = ({ token, playlistId }) => {

  return (
    <div className="sidebar" style={{ width: '300px', backgroundColor: '#f8f9fa', padding: '20px', height: '100vh', boxSizing: 'border-box', overflowY: 'auto' }}>
      <Playlist token={token} playlistId={playlistId} />
    </div>
  );
};

export default Sidebar;
