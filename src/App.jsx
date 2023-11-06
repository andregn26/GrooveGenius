/* eslint-disable no-unused-vars */
import { useState } from "react";
import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Track from "./components/Track";
import Tracklist from "./components/Tracklist";
import "./App.css";

function App() {
	return (
		<>
			<div className="bg-slate-950 text-slate-200 min-h-screen">
				<nav>nav</nav>
				<main className=" mx-7">
					<SearchBar />
					<div className="flex items-center justify-center gap-10 flex-col md:flex-row  border">
						<SearchResults />
						<Playlist />
					</div>

					<Tracklist />
					<Track />
				</main>
				<footer>footer</footer>
			</div>
		</>
	);
}

export default App;
