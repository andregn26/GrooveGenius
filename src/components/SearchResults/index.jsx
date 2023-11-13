import React from "react";
import Tracklist from "../Tracklist";

const SearchResults = ({ trackList, addTrack, isSearchResults }) => {
	return (
		<div className="flex flex-col">
			<p>Results Output</p>
			<Tracklist trackList={trackList} handleTrack={addTrack} isSearchResults={isSearchResults} />
		</div>
	);
};

export default SearchResults;
