const Instructions = ({ isSpotifyArrayEmpty }) => {
	return (
		<>
			{isSpotifyArrayEmpty ? (
				<div className={`flex  justify-center w-full pt-8`}>
					<p className="max-w-2xl text-center font-bold">
						GeniusGroove is a revolutionary music app that empowers you to discover, curate, and share
						your favorite tunes. Seamlessly search for music, create personalized playlists in Spotify,
						and effortlessly add songs to your collection. With GeniusGroove, you're the maestro of your
						musical journey.
					</p>
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default Instructions;
