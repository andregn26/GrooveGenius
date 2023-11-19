import React from "react";
import Tracklist from "../Tracklist";

const SearchResults = ({ trackList, addTrack, isSearchResults }) => {
	return (
		<>
			{/* <p>Results Output</p> */}
			<Tracklist trackList={trackList} handleTrack={addTrack} isSearchResults={isSearchResults} />
		</>
	);
};

export default SearchResults;
