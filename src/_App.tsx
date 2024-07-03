import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';


type Artist = {
  id: string;
  images: { url: string }[];
  name: string;
};

function TestApp() {
  const CLIENT_ID = "d85c65cf3b4343998d57519ca409c40c";
  const REDIRECT_URI = "http://localhost:5173/callback";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const PLAYLIST_ID = "0CE4npGyTskQQ11nRdlogc";

  const [token, setToken] = useState<string | null>("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const tokenParam = hash.substring(1)?.split("&").find(elem => elem.startsWith("access_token"));
      const token = tokenParam ? tokenParam.split("=")[1] : null;
      if (token) {
        window.localStorage.setItem("token", token);
        setToken(token);
        window.location.hash = "";
      }
    }
  }, []);

  const setAccessToken = () => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      const tokenParam = hash.substring(1)?.split("&").find(elem => elem.startsWith("access_token"));
      token = tokenParam ? tokenParam.split("=")[1] : null;
      window.location.hash = "";
      if (token) {
        window.localStorage.setItem("token", token);
      }
    }
    setToken(token || '');
  };

  const searchArtists = async () => {
    if (!token) {
      setAccessToken();
    }
    if (token) {
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
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized. Please log in again.");
          window.localStorage.removeItem("token");
        } else {
          console.error("Error occurred:", error.message);
        }
      }
    }
  };

const searchPlaylist = async () => {
  if (!token) {
    setAccessToken();
  }

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

// ...

// Call this function when the user triggers the search
const handlePlaylistSearch = (e: any) => {
  e.preventDefault()
  searchPlaylist();
};


  // New function to handle search button click
  const handleSearch = (e: any) => {
    e.preventDefault()
    searchArtists();
  };

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  // New function to render artists
  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id}>
        {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt="" /> : <div>No Image</div>}
        {artist.name}
      </div>
    ));
  };

  return (
    <>
      {!token ? (
        <header className='app-header'>
          <h2>This is an experiment!</h2>
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
            Login to Spotify
          </a>
        </header>
      ) : (
        <>
          <section className='body'>
            <form onSubmit={handleSearch} className='form'>
              <input type="text" onChange={e => setSearchKey(e.target.value)} />
              <button type="submit">Search</button>
            </form>
            <button onClick={logout}>Logout</button>
          </section>
          <button type="submit" onClick={handlePlaylistSearch}>Search Playlist</button>
          {renderArtists()}
        </>
      )}
    </>
  );
}

export default TestApp;
