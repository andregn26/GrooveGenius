// eslint-disable-next-line no-unused-vars
import React from "react";
import Button from "./Button";

const Track = ({ track, handleTrack, isSearchResults }) => {
	const {
		trackName,
		trackArtist,
		trackId,
		trackUri,
		trackAlbum: { albumName, albumImage },
	} = track;
	// console.log("data -->", track);

	const shortTrackName = (str, len) => {
		if (str.length > len) {
			return str.slice(0, len).padEnd(len + 3, ".");
		} else {
			return str;
		}
	};
	const handleRemoveClick = () => {
		handleTrack(track);
	};

	const handleAddClick = () => {
		handleTrack(track);
	};

	return (
		<>
			<div className="flex overflow-hidden rounded-2xl bg-base-100 shadow-xl  w-full  border-solid border-primary/10 hover:bg-primary/10 border-4">
				<figure className="flex items-center">
					<img
						className="rounded-sm m-2 md:m-4 lg:m-0 w-8 h-8 md:w-16 md:h-16 lg:w-24 lg:h-24"
						src={albumImage}
						alt="Movie"
					/>
				</figure>
				<div className=" flex w-full">
					<div className="card-body p-4">
						<p className="text-xs tracking-wider">{trackArtist}</p>
						<p className="xs:hidden font-bold tracking-tight text-base">
							{shortTrackName(trackName, 20)}
						</p>
						<p className="hidden font-bold tracking-tighter xs:inline-block text-base">
							{shortTrackName(trackName, 30)}
						</p>
					</div>
					<div className="flex h-full ">
						<Button
							handleRemoveClick={handleRemoveClick}
							handleAddClick={handleAddClick}
							isSearchResults={isSearchResults}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Track;
