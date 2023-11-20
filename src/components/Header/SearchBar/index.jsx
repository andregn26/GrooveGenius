import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SearchBar = ({ loadSongs, isSpotifyArrayEmpty }) => {
	const [searchInput, setSearchInput] = useState("");

	const handleSearch = (e) => {
		setSearchInput(e.target.value);
	};
	const handleSubmit = () => {
		loadSongs(searchInput);
		setSearchInput("");
	};
	const handlePressEnter = (e) => {
		if (e.code === "Enter") {
			handleSubmit();
		}
	};

	return (
		<>
			<div className={` w-full flex justify-center items-center`}>
				<div className="join">
					<input
						className={`input input-bordered input-primary join-item focus:outline-none w-full ${
							isSpotifyArrayEmpty ? "input-lg max-w-lg" : "max-w-xs"
						}`}
						placeholder="Search"
						required
						value={searchInput}
						onKeyDown={handlePressEnter}
						onChange={handleSearch}
					/>
					<button
						onClick={handleSubmit}
						className={`btn join-item border border-primary btn-primary rounded-r-full ${
							isSpotifyArrayEmpty ? "btn-lg " : ""
						}`}>
						<MagnifyingGlassIcon className={`${isSpotifyArrayEmpty ? "w-8" : "w-6"}`} />
					</button>
				</div>
			</div>
		</>
	);
};

export default SearchBar;
