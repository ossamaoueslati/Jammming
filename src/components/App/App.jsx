import { useState, useCallback } from 'react'
import './App.css'

import Playlist from "../Playlist/Playlist";
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from "../SearchResults/SearchResults";
import Spotify from "../../spotify_api/Spotify";


function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  /* searches for the typed input using the spotify api */
  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults);
  }, []);
  /* checks if the item exists otherwise it adds it */
  const addTrack = useCallback(
    (track) => {
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
        return;

      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    },
    [playlistTracks]
  );
  /* when the remove button is clicked this piece of code executes the removal process */
  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);
  /* the updatePlaylistName function updates the name of the playlist */
  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);
  /* saves the playlist to ur spotify account */
  const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks]);

  return (
    <>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist" >
          <SearchResults searchResults={searchResults} onAdd={addTrack} />  
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemove={removeTrack}
            onSave={savePlaylist}
          />
        </div>
      </div>  
    </>
  )
}

export default App
