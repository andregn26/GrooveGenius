/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar";
import Tracklist from "./components/Tracklist";
import { getSongs } from "./spotify";
import "./App.css";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

function App() {
	const [accessToken, setAccessToken] = useState("");
	const [spotifySongs, setSpotifySongs] = useState([]);
	const [chosenSongs, setChosenSongs] = useState([]);
	const [myPlaylistTitle, setMyPlaylistTitle] = useState("Teste titulo playlist");

	// API Access Token
	useEffect(() => {
		fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
		})
			.then((response) => response.json())
			.then((data) => setAccessToken(data.access_token));
	}, []);

	// Get Artist
	const getArtist = () => {
		fetch("https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb", {
			headers: {
				Authorization: `Bearer  ${accessToken}`,
			},
		})
			.then((response) => response.json())
			.then((data) => console.log(data));
	};

	const getSearch = () => {};

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

	return (
		<div className="scrollbar bg-slate-50 text-slate-900 min-h-screen">
			<header className="flex  justify-center">
				<SearchBar handleSearch={handleSearch} />
			</header>
			<main className="flex flex-col md:flex-row gap-16 border max-w-xxl justify-center">
				<SearchResults trackList={spotifySongs} addTrack={addTrack} isSearchResults={true} />
				<Playlist trackList={chosenSongs} removeTrack={removeTrack} isSearchResults={false} />
			</main>
			<button onClick={getArtist}>Artist</button>
		</div>
	);
}

export default App;
