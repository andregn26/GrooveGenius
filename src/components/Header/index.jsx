import SearchBar from "./SearchBar";
import Instructions from "./Instructions";
import Profile from "./Profile";

const Header = ({ loadSongs, isSpotifyArrayEmpty, userProfile }) => {
	console.log("userProfile", userProfile);
	const isUserprofileEmpty = userProfile === null;
	return (
		<header className={`w-full`}>
			<nav className={` absolute top-0 w-full `}>
				<div
					className={`navbar bg-neutral text-neutral-content w-full p-6 flex ${
						isUserprofileEmpty ? "justify-center" : "justify-between"
					}`}>
					<h1 className=" text-xl font-bold hidden xs:inline-block">
						GENIUS<span className="text-primary">GROOVE</span>
					</h1>
					<h1 className=" text-xl font-bold inline-block xs:hidden">
						G<span className="text-primary">G</span>
					</h1>
					{!isUserprofileEmpty && <Profile userProfile={userProfile} />}
				</div>
			</nav>
			<div
				className={`py-10 px-6 flex flex-col items-center justify-center ${
					isSpotifyArrayEmpty ? "h-screen" : "mt-24"
				}`}>
				<SearchBar loadSongs={loadSongs} isSpotifyArrayEmpty={isSpotifyArrayEmpty} />
				<Instructions isSpotifyArrayEmpty={isSpotifyArrayEmpty} />
			</div>
		</header>
	);
};

export default Header;
