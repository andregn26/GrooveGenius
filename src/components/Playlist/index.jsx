// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Tracklist from "../Tracklist";

const Playlist = ({ trackList, removeTrack, isSearchResults, saveToSpotify, setPlaylistName, playlistName }) => {
	const handleClick = () => {
		saveToSpotify();
	};

	return (
		<div>
			<input
				value={playlistName}
				onChange={(e) => setPlaylistName(e.target.value)}
				placeholder="Título da playlist"
				type="text"
			/>

			<Tracklist trackList={trackList} handleTrack={removeTrack} isSearchResults={isSearchResults} />
			<button onClick={handleClick}>save playlist</button>
		</div>
	);
};

export default Playlist;
