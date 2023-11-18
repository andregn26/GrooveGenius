/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar";
import { getToken, getUserProfile, getSongs, postCreatePlaylist } from "./spotify";
import "./App.css";

function App() {
	const [spotifySongs, setSpotifySongs] = useState([]);
	const [playlistName, setPlaylistName] = useState("");
	const [chosenSongs, setChosenSongs] = useState([]);
	const [user, setUser] = useState(null);

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

	const saveToSpotify = async () => {
		const uriList = chosenSongs.map((song) => song.uri);
		postCreatePlaylist(playlistName, uriList);
	};

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

	const isSpotifyArrayEmpty = spotifySongs.length === 0;

	return (
		<div className="scrollbar min-h-screen">
			<Header loadSongs={loadSongs} isSpotifyArrayEmpty={isSpotifyArrayEmpty} userProfile={user} />

			{isSpotifyArrayEmpty ? (
				<></>
			) : (
				<main className="">
					<SearchResults trackList={spotifySongs} addTrack={addTrack} isSearchResults={true} />
					<Playlist
						trackList={chosenSongs}
						setPlaylistName={setPlaylistName}
						removeTrack={removeTrack}
						isSearchResults={false}
						saveToSpotify={saveToSpotify}
						playlistName={playlistName}
					/>
				</main>
			)}
		</div>
	);
}

export default App;
