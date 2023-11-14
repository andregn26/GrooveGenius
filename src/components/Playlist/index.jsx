// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Tracklist from "../Tracklist";

const Playlist = ({ trackList, removeTrack, isSearchResults }) => {
	const [playlistName, setPlaylistName] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const savedPlaylist = {
			name: playlistName,
			tracks: trackList.map((track) => track.uri),
		};
		setPlaylistName("");
		return savedPlaylist;
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					value={playlistName}
					onChange={(e) => setPlaylistName(e.target.value)}
					placeholder="Título da playlist"
					type="text"
				/>
			</form>
			<Tracklist trackList={trackList} handleTrack={removeTrack} isSearchResults={isSearchResults} />
		</div>
	);
};

export default Playlist;
