/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar";
import { getToken, getUserProfile, getSongs } from "./spotify";
import "./App.css";
import { stringify } from "postcss";

function App() {
	const [spotifySongs, setSpotifySongs] = useState([]);
	const [chosenSongs, setChosenSongs] = useState([]);
	const [myPlaylistTitle, setMyPlaylistTitle] = useState("Teste titulo playlist");
	const [user, setUser] = useState({});

	useEffect(() => {
		getToken();
	}, []);

	useEffect(() => {
		const loadUser = async () => {
			const myUser = await getUserProfile();
			setUser(myUser);
		};
		loadUser();
	}, []);

	const loadSongs = async (searchTerm) => {
		const newTracks = await getSongs(searchTerm);
		setSpotifySongs(newTracks);
	};

	const addTrack = (track) => {
		const isAlreadyInMyPlaylist = chosenSongs.some((trackFromPlaylist) => trackFromPlaylist.id === track.id);
		if (!isAlreadyInMyPlaylist) {
			setChosenSongs((prev) => [...prev, track]);
			setSpotifySongs((spotifyList) => spotifyList.filter((trackInSpotifyList) => trackInSpotifyList.id !== track.id));
		}
	};

	const removeTrack = (trackIdToRemove) => {
		setChosenSongs((myTracks) => myTracks.filter((track) => track.id !== trackIdToRemove.id));
		setSpotifySongs((spotifyList) => [trackIdToRemove, ...spotifyList]);
	};

	return (
		<div className="scrollbar bg-slate-50 text-slate-900 min-h-screen">
			<header className="flex  justify-center">
				<SearchBar loadSongs={loadSongs} />
			</header>
			<main className="flex flex-col md:flex-row gap-16 border max-w-xxl justify-center">
				<SearchResults trackList={spotifySongs} addTrack={addTrack} isSearchResults={true} />
				<Playlist trackList={chosenSongs} removeTrack={removeTrack} isSearchResults={false} />
			</main>
			{/* <button onClick={loadUser}>user</button> */}
		</div>
	);
}

export default App;
