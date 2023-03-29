import { getWeather } from "./weather.js";
import { getPicture } from "./picture.js";

const spotifyClientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const spotifySecretKey = import.meta.env.VITE_SPOTIFY_BASE_URL;

const spotifyBaseUrl = "https://api.spotify.com/v1/search?q=";

const getSpotifyAccessToken = async () => {
  let accessToken = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${spotifyClientId}&client_secret=${spotifySecretKey}`,
  };

  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    accessToken
  );

  const data = await response.json();
  let spotifyToken = data.access_token;
  return spotifyToken;
};

export const getMusic = async (query) => {
  const token = await getSpotifyAccessToken();

  const response = await fetch(
    `${spotifyBaseUrl}${query}&type=track&locale=fr&offset=0&limit=5`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  //   let music = data.tracks.items[0].external_urls.spotify
  let trackId = data.tracks.items[0].id;
  //console.log(trackId);
  return trackId;
};
