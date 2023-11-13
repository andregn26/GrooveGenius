// eslint-disable-next-line no-unused-vars
import React from "react";
import Track from "../Track";

const Tracklist = ({ trackList, handleTrack, isSearchResults }) => {
	return (
		<div className="border flex flex-col gap-4 px-4">
			{trackList.map((track) => {
				return <Track key={track.id} track={track} handleTrack={handleTrack} isSearchResults={isSearchResults} />;
			})}
		</div>
	);
};

export default Tracklist;
