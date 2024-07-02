import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import Search from '../search';
import Track from '../track';
import { Track as TrackModel } from '../../models';

interface PlaylistProps {
  token: string | null;
  playlistId: string;
  onPlay: (track: TrackModel) => void;
}

const Playlist: FC<PlaylistProps> = ({ token, playlistId, onPlay }) => {
  const [allTracks, setAllTracks] = useState<TrackModel[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<TrackModel[]>([]);

  const PLAYLIST_ID =import.meta.env.PLAYLIST_ID;
  const fetchPlaylistTracks = async () => {
    if (token) {
      try {
        const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const fetchedTracks = data.items.map((item: any) => item.track);
        console.log(fetchedTracks)
        setAllTracks(fetchedTracks);
        setFilteredTracks(fetchedTracks);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    }
  };
  useEffect(() => {
    fetchPlaylistTracks();
  }, [token]);

  return (
    <>
      <Search allTracks={allTracks} setFilteredTracks={setFilteredTracks} />
      <div className='playlist'>
      {filteredTracks.map(track => <Track key={track.id} track={track} onPlay={() => onPlay(track)} />)}
      </div>
    </>
  );
};

export default Playlist;
