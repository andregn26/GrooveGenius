// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const SearchBar = ({ loadSongs }) => {
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
		<div className="max-w-lg p-4 flex">
			<div className="relative w-full">
				<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
				<input
					placeholder="Search Music"
					required
					onKeyDown={handlePressEnter}
					onChange={handleSearch}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full ps-10 p-2.5 "
				/>
			</div>
			<button
				onClick={handleSubmit}
				type="submit"
				className="p-2.5 ms-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 shadow-sm shadow-teal-500/50">
				<svg
					className="w-4 h-4"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 20">
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
					/>
				</svg>
				<span className="sr-only">Search</span>
			</button>
		</div>
	);
};

export default SearchBar;
