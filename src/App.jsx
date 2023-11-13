/* eslint-disable no-unused-vars */
import { useState } from "react";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar";
import Tracklist from "./components/Tracklist";
import { getSongs } from "./spotify";
import "./App.css";

function App() {
	const [spotifySongs, setSpotifySongs] = useState([]);
	const [chosenSongs, setChosenSongs] = useState([]);
	const [myPlaylistTitle, setMyPlaylistTitle] = useState("Teste titulo playlist");

	const handleSearch = async (query) => {
		const searchResult = await getSongs(query);
		setSpotifySongs(searchResult);
	};

	const addTrack = (track) => {
		const isAlreadyInMyPlaylist = chosenSongs.some((trackFromPlaylist) => trackFromPlaylist.id === track.id);
		if (!isAlreadyInMyPlaylist) {
			setChosenSongs((prev) => [...prev, track]);
		}
	};

	const removeTrack = (trackIdToRemove) => {
		setChosenSongs((myTracks) => myTracks.filter((track) => track.id !== trackIdToRemove));
	};

	const savePlaylist = () => {
		let songsURI = [];
		chosenSongs.forEach((track) => {
			songsURI.push(track.uri);
		});
		return songsURI;
	};

	return (
		<div className="scrollbar bg-slate-50 text-slate-900 min-h-screen">
			<header className="flex  justify-center">
				<SearchBar handleSearch={handleSearch} />
			</header>
			<main className="flex flex-col md:flex-row gap-16 border max-w-xxl justify-center">
				<SearchResults trackList={spotifySongs} addTrack={addTrack} isSearchResults={true} />
				<Playlist trackList={chosenSongs} removeTrack={removeTrack} isSearchResults={false} />
			</main>
		</div>
	);
}

export default App;
