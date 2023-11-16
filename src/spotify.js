/* eslint-disable no-mixed-spaces-and-tabs */
const BASE_URL = "https://api.spotify.com/v1";
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = `http://localhost:5173/`;
const SCOPE = "playlist-modify-public user-read-private user-read-email";
let TOKEN = null;
let USER_ID = {};

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
		const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=${encodeURIComponent(
			SCOPE
		)}&redirect_uri=${REDIRECT_URI}`;
		window.location = accessUrl;
	}
};

const getUserProfile = async () => {
	if (!TOKEN) {
		TOKEN = await getToken();
	}
	const response = await fetch(`${BASE_URL}/me`, { method: "GET", headers: { Authorization: `Bearer ${TOKEN}` } });
	const data = response.json();
	return data;
};

// const getUserId = async () => {
// 	const endpoint = `${BASE_URL}/me`;
// 	if (!TOKEN) {
// 		TOKEN = await getToken();
// 	}
// 	const requestParams = { headers: { Authorization: `Bearer ${TOKEN}` } };
// 	try {
// 		const response = await fetch(endpoint, requestParams);
// 		if (response.ok) {
// 			const jsonResponse = await response.json();
// 			USER_ID = jsonResponse.id;
// 			console.log(USER_ID);
// 			return USER_ID;
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

const getSongs = async (query) => {
	const token = await getToken();
	if (!token) return [];
	const url = `${BASE_URL}/search?q=${encodeURIComponent(query)}&type=track`;
	const params = { headers: { Authorization: "Bearer " + token } };
	const response = await fetch(url, params);
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

export { getToken, getUserProfile, getSongs };
