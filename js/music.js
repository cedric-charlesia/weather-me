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
  }

  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    accessToken
  )

  const data = await response.json()
  let spotifyToken = data.access_token
  return spotifyToken
}

export const getMusic = async (weatherDescription) => {
  const token = await getSpotifyAccessToken()

  let query = ""
  const clearWeather = ["sunny", "beautiful day", "sunny day", "sunshine", "beach"]
  const cloudyWeather = ["cloudy", "clouds", "cloudy day", "cloudy weather"]
  const rainyWeather = ["rainy", "rainy day", "rainy window", "rain", "heavy rain"]
  const snowyWeather = ["snow", "snowy", "snowy mountains", "winter", "christmas"]
  const thunderWeather = ["thunder", "storm", "hurricane" ]

  if (weatherDescription === "clear") {
    query = clearWeather[Math.ceil(Math.random() * 5)]
  }

  if (weatherDescription === "clouds") {
    query = cloudyWeather[Math.ceil(Math.random() * 4)]
  }

  if (weatherDescription === "rain") {
    query = rainyWeather[Math.ceil(Math.random() * 5)]
  }

  if (weatherDescription === "snow") {
    query = snowyWeather[Math.ceil(Math.random() * 5)]
  }

  if (weatherDescription === "thunder") {
    query = thunderWeather[Math.ceil(Math.random() * 3)]
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
  )

  const data = await response.json()
  let tracks = data.tracks.items
  let trackId = data.tracks.items[0].id

  const playTrack = document.getElementById("weather-track")
  playTrack.src = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`

  // let index = 0
  //   let i = 0

  //   const updateMusic = () => {
  //       if (index >= tracks.length) {
  //           index = 0
  //           i++
  //       }

  //       playTrack.src = `https://open.spotify.com/embed/track/${tracks[index].id}?utm_source=generator`
  //       console.log(playTrack.src);
  //       if (i >= 5) {
  //           clearInterval(interval)
  //       } else {
  //           index++
  //       }
  //   }

  //   updateMusic()
  //   let interval = setInterval(updateMusic, 33000)
}