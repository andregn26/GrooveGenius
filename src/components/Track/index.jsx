// eslint-disable-next-line no-unused-vars
import React from "react";

const Track = ({ track, handleTrack, isSearchResults }) => {
	console.log("data -->", track);
	const handleRemoveClick = () => {
		handleTrack(track);
	};

	const handleAddClick = () => {
		handleTrack(track);
	};

	return (
		<div className=" rounded-md px-4 py-4  bg-slate-50 shadow-lg flex justify-between items-center align-middle">
			<div className="flex items-center">
				<img
					className="hidden lg:inline-block  w-20 h-20 rounded-lg border-white/30 border-2 mr-4"
					src={track.image}
				/>
				<div className="flex flex-col justify-center">
					<p className="font-bold">{track.name}</p>
					<p className="text-sm">
						{track.artist} <span className="hidden lg:inline-block ">- {track.album} </span>
					</p>
				</div>
			</div>

			<div className="">
				{isSearchResults ? (
					<button
						className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 shadow-sm shadow-teal-500/50 rounded-full"
						onClick={handleAddClick}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							/>
						</svg>
					</button>
				) : (
					<button onClick={handleRemoveClick}>-</button>
				)}
			</div>
		</div>
	);
};

export default Track;
