// eslint-disable-next-line no-unused-vars
import React from "react";
import Track from "../Track";

const Tracklist = ({ trackList, handleTrack, isSearchResults }) => {
	return (
		<div className="grid grid-cols-1 gap-4">
			{trackList.map((track) => {
				// console.log("track", track);
				return (
					<Track
						key={track.trackId}
						track={track}
						handleTrack={handleTrack}
						isSearchResults={isSearchResults}
					/>
				);
			})}
		</div>
	);
};

export default Tracklist;
