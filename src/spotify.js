const BASE_URL = "https://accounts.spotify.com/authorize";
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = `http://localhost:5173/`;
let TOKEN = null;

// Function to request access token from Spotify API
const getToken = async () => {
	// Check if access token exists
	if (TOKEN) {
		return TOKEN;
	}
	// Get access token from URL
	const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
	const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
	if (accessTokenMatch && expiresInMatch) {
		TOKEN = accessTokenMatch[1];
		const expiresIn = Number(expiresInMatch[1]);
		window.setTimeout(() => (TOKEN = ""), expiresIn * 1000);
		window.history.pushState("Access Token", null, "/");
		return TOKEN;
	} else {
		const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
		window.location = accessUrl;
	}
};

const getSongs = async (query) => {
	const token = await getToken();
	if (!token) return [];

	const urlEncodedQuery = encodeURIComponent(query);
	const url = "https://api.spotify.com/v1/search?q=" + urlEncodedQuery + "&type=track";

	const response = await fetch(url, {
		headers: { Authorization: "Bearer " + token },
	});
	const data = await response.json();
	sessionStorage.removeItem("searchTerm");
	return !data.tracks
		? []
		: data.tracks.items.map(({ name, id, album, artists, uri }) => ({
				name,
				id,
				uri,
				artist: artists[0].name,
				album: album.name,
				image: album.images[2].url,
		  }));
};

export { getToken, getSongs };
