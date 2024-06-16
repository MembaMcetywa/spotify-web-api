import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import Search from '../search';
import { Track } from '../../models';

interface PlaylistProps {
  token: string | null;
  playlistId: string;
}

const Playlist: FC<PlaylistProps> = ({ token, playlistId }) => {
  const [allTracks, setAllTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);

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
    console.log('i ran up to here')
  }, [token]);

  return (
    <div>
      <Search allTracks={allTracks} setFilteredTracks={setFilteredTracks} />
      <div className="playlist">
        {filteredTracks.map(track => (
          <div key={track.id} className="track">
            <img src={track.album.images[0].url} alt={track.name} style={{ width: 50, height: 50 }} />
            <div>
              <div>{track.name}</div>
              <div>{track.artists.map(artist => artist.name).join(', ')}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
