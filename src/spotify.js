/* eslint-disable no-mixed-spaces-and-tabs */
import toast from "react-hot-toast";
const BASE_URL = "https://api.spotify.com/v1";
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = `http://localhost:5173/`;
const SCOPE = "playlist-modify-public playlist-modify-private user-read-private user-read-email";
let TOKEN = null;
let USER_ID = "";
let PLAYLIST_ID = "";

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

const getUserID = async () => {
	if (!TOKEN) {
		TOKEN = await getToken();
	}
	const response = await fetch(`${BASE_URL}/me`, { method: "GET", headers: { Authorization: `Bearer ${TOKEN}` } });
	const jsonResponse = await response.json();
	USER_ID = jsonResponse.id;
	return USER_ID;
};

const postCreatePlaylist = async (playlistName, list) => {
	USER_ID = await getUserID();
	const tracksURIs = list.map((trackURI) => {
		return `${trackURI}`;
	});
	if (!TOKEN) {
		TOKEN = await getToken();
	}
	try {
		const response = await fetch(`${BASE_URL}/users/${USER_ID}/playlists`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${TOKEN}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: playlistName }),
		});
		if (response.ok) {
			console.log("response -->", response);
			console.log("Playlist has been created");
			const jsonResponse = await response.json();
			PLAYLIST_ID = jsonResponse.id;
			await postItemsToPlaylist(tracksURIs);
			const notify = () => toast.success("Playlist created!");
			notify();
		} else {
			const notify = () => toast.error("Something went wrong while creating the Playlist");
			notify();
		}
	} catch (error) {
		console.log("Error creating playlist:", error);

		if (error.response) {
			console.log("Response status:", error.response.status);
			console.log("Response data:", error.response.data);
		}
	}
};

const postItemsToPlaylist = async (tracks) => {
	try {
		const response = await fetch(`${BASE_URL}/playlists/${PLAYLIST_ID}/tracks`, {
			method: "POST",
			headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
			body: JSON.stringify({ uris: tracks }),
		});
		if (response.ok) {
			const notify = () => toast.success("Songs added to playlist!");
			notify();
			console.log("Songs added");
		} else {
			const notify = () => toast.error("Something went wrong while adding the songs");
			notify();
		}
	} catch (error) {
		console.log("Songs not added" + error);
	}
};

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
		: data.tracks.items.map(({ name, id, album, artists, uri, preview_url }) => ({
				trackName: name,
				trackId: id,
				trackUri: uri,
				trackArtist: artists[0].name,
				trackAlbum: { albumName: name, albumImage: album.images[1].url },
				preview_url,
		  }));
};

export { getToken, getUserProfile, getSongs, postCreatePlaylist };
