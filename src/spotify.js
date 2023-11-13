const BASE_URL = "https://accounts.spotify.com/authorize";
const CLIENT_ID = `&client_id=${import.meta.env.VITE_CLIENT_ID}`;
const RESPONSE_TYPE = "?response_type=token";
const REDIRECT_URI = `&redirect_uri=http://localhost:5173/`;
const SCOPE = "&scope=playlist-modify-private user-read-private";
let TOKEN = null;

const getToken = () => {
	if (TOKEN) {
		return TOKEN;
	} else if (window.location.hash.length > 1) {
		const hashParameters = {};
		// window.location.hash.split('&').forEach(i => hashParameters[i] = i);
		window.location.hash
			.slice(1) // to remove # sign
			.split("&") // to split to paramater/value groups))
			.forEach((item) => {
				const parameter = item.split("=");
				hashParameters[parameter[0]] = parameter[1];
			});

		TOKEN = hashParameters.access_token;
		window.history.pushState("Access Token", "", "/");
		return TOKEN;
	} else if (!TOKEN) {
		const URL = BASE_URL + RESPONSE_TYPE + CLIENT_ID + SCOPE + REDIRECT_URI;
		window.location = URL;
	}
};

const getSongs = async (query) => {
	const token = getToken();
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

export { getSongs };
