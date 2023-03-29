const spotifyClientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const spotifySecretKey = import.meta.env.VITE_SPOTIFY_SECRET_KEY
const spotifyBaseUrl = import.meta.env.VITE_SPOTIFY_BASE_URL

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
let query = "joy"

export const getMusic = async (weatherCondition) => {
  const token = await getSpotifyAccessToken();

  if (weatherCondition === "Clear") {
    query = "sunny"
  }

  if (weatherCondition === "Clouds") {
    query = "cloudy"
  }

  if (weatherCondition === "Rain") {
    query = "rain"
  }

  if (weatherCondition === "Snow") {
    query = "snow"
  }

  if (weatherCondition === "Thunderstorm") {
    query = "thunder"
  }

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

  const playTrack = document.getElementById("weather-track")
  playTrack.src = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`

  return trackId;
};
