// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const SearchBar = ({ loadSongs, isSpotifyArrayEmpty }) => {
	let searchInput = "";
	const handleSearch = (e) => {
		searchInput = e.target.value;
	};
	const handleSubmit = () => {
		loadSongs(searchInput);
	};
	const handlePressEnter = (e) => {
		if (e.code === "Enter") {
			handleSubmit();
		}
	};

	return (
		<div className={` w-full flex justify-center items-center`}>
			<input
				placeholder="Search Music"
				required
				onKeyDown={handlePressEnter}
				onChange={handleSearch}
				className={`input input-bordered input-secondary w-full ${
					isSpotifyArrayEmpty ? "input-lg max-w-lg" : "max-w-xs"
				} `}
			/>
		</div>
	);
};

export default SearchBar;
