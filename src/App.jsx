/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Tracklist from "./components/Tracklist";
import { getToken, getUserProfile, getSongs, postCreatePlaylist } from "./spotify";
import "./App.css";
import Footer from "./components/Footer";

function App() {
	const [spotifySongs, setSpotifySongs] = useState([]);
	const [playlistName, setPlaylistName] = useState("");
	const [chosenSongs, setChosenSongs] = useState([]);
	const [user, setUser] = useState(null);

	// useEffect(() => {
	// 	getToken();
	// }, []);

	useEffect(() => {
		const loadUser = async () => {
			const myUser = await getUserProfile();
			setUser(myUser);
		};
		loadUser();
	}, []);

	const saveToSpotify = async () => {
		const uriList = chosenSongs.map((song) => song.trackUri);
		if (uriList.length === 0) {
			console.log("Add some songs to your playlist");
			const notify = () => toast.error("Add some songs to your playlist");
			notify();
		} else {
			postCreatePlaylist(playlistName, uriList);
			setPlaylistName("");
			setChosenSongs(() => []);
		}
	};

	const loadSongs = async (searchTerm) => {
		const newTracks = await getSongs(searchTerm);
		setSpotifySongs(newTracks);
	};

	const addTrack = (track) => {
		const isAlreadyInMyPlaylist = chosenSongs.some((trackFromPlaylist) => trackFromPlaylist.trackId === track.trackId);
		if (!isAlreadyInMyPlaylist) {
			setChosenSongs((prev) => [...prev, track]);
			setSpotifySongs((spotifyList) =>
				spotifyList.filter((trackInSpotifyList) => trackInSpotifyList.trackId !== track.trackId)
			);
		}
	};

	const removeTrack = (trackIdToRemove) => {
		setChosenSongs((myTracks) => myTracks.filter((track) => track.trackId !== trackIdToRemove.trackId));
		setSpotifySongs((spotifyList) => [trackIdToRemove, ...spotifyList]);
	};

	const isSpotifyArrayEmpty = spotifySongs.length === 0;
	const isArrayAndNameEmpty = chosenSongs.length === 0 || playlistName.length === 0;

	return (
		<div className="scrollbar min-h-screen flex flex-col justify-center items-center">
			<Header loadSongs={loadSongs} isSpotifyArrayEmpty={isSpotifyArrayEmpty} userProfile={user} />

			{isSpotifyArrayEmpty ? (
				<></>
			) : (
				<main className="grid sm:grid-cols-2 gap-12 mx-4 md:mx-16 max-w-5xl items-start mb-24">
					<div className=" min-w-xs p-4 xs:p-6 bg-neutral/40 rounded-3xl">
						<div className="h-16">
							<p className="text text-center font-bold">Search Results</p>
						</div>
						<Tracklist trackList={spotifySongs} handleTrack={addTrack} isSearchResults={true} />
					</div>
					<div className=" min-w-xs p-4 xs:p-6 bg-neutral/40 rounded-3xl">
						<div className="h-16">
							<input
								value={playlistName}
								className="input input-ghost w-full input-xs"
								onChange={(e) => setPlaylistName(e.target.value)}
								placeholder="Give a name to your new Playlist"
								type="text"
							/>
						</div>
						<div className="mb-8">
							{chosenSongs.length === 0 && playlistName.length === 0 ? (
								<p className="text-center font-bold">
									Add some songs to your new Playlist!
								</p>
							) : (
								<Tracklist
									trackList={chosenSongs}
									handleTrack={removeTrack}
									isSearchResults={false}
								/>
							)}
						</div>

						<button
							disabled={isArrayAndNameEmpty && "disabled"}
							className="btn btn-primary btn-block"
							onClick={saveToSpotify}>
							Save to Spotify
						</button>
					</div>
					<Toaster
						position="bottom-right"
						reverseOrder={true}
						toastOptions={{
							duration: 5000,
							className: "font-bold ",
							success: {
								duration: 5000,
								className: "bg-success font-bold",
							},
							error: {
								duration: 5000,
								className: "bg-error font-bold",
							},
						}}
					/>
				</main>
			)}
			<Footer />
		</div>
	);
}

export default App;
