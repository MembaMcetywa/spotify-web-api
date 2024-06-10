import React, {FC,  useState, useEffect } from 'react';
import axios from 'axios';
import { Artist } from '../../models';

interface SearchProps {
  token: string | null;
  setArtists: (artists: Artist[]) => void;
}

const Search: FC<SearchProps> = ({ token, setArtists }) => {
  const [searchKey, setSearchKey] = useState<string>('');

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

  useEffect(() => {
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
