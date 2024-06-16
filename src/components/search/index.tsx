import React, {FC,  useState, useEffect } from 'react';
import axios from 'axios';
import { Artist } from '../../models';

interface SearchProps {
  token: string | null;
  setArtists: (artists: Artist[]) => void;
  playlistId: string;
  setTracks: (tracks: any[]) => void;
}

const Search: FC<SearchProps> = ({ token, setArtists }) => {
  const [searchKey, setSearchKey] = useState<string>('');
  const [allTracks, setAllTracks] = useState<any[]>([]);
  const PLAYLIST_ID =import.meta.env.VITE_PLAYLIST_ID;

  const searchArtists = async () => {
    if (token && searchKey) {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            q: searchKey,
            type: "artist"
          }
        });
        setArtists(data.artists.items);
      } catch (error: any) {
        console.error("Error occurred:", error.message);
      }
    }
  };

  const searchPlaylist = async () => {
    if (token) {
      try {
  
        const { data: playlist } = await axios.get(`https://api.spotify.com/v1/playlists/${PLAYLIST_ID}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        // Fetch tracks in the playlist
        const { data: { items: tracks } } = await axios.get(`https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        console.log("Playlist:", playlist);
        console.log("Tracks:", tracks);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized. Please log in again.");
          window.localStorage.removeItem("token");
        } else {
          console.error("Error occurred:", error.message);
        }
      }
    }
  };

  useEffect(() => {
    searchPlaylist();
    // If there's a need to auto-search or debounce, handle that here
  }, [token, searchKey]); // Dependent on token and searchKey to re-run

  return (
    <form onSubmit={e => e.preventDefault()} className='form'>
      <input type="text" value={searchKey} onChange={e => setSearchKey(e.target.value)} />
      <button type="submit" onClick={searchArtists}>Search</button>
    </form>
  );
}

export default Search;
