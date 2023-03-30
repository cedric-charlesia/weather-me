import { getMusic } from "./music";
import { getPicture } from "./picture";

const weatherAPIKey = import.meta.env.VITE_WEATHER_API_KEY;
const getWeatherUrl = import.meta.env.VITE_WEATHER_BASE_URL;

export const getWeather = async (cityName) => {
  const response = await fetch(
    `${getWeatherUrl}${cityName}&units=metric&lang=fr&appid=${weatherAPIKey}`
  )
  const data = await response.json();

  document.getElementById("display-city-name").textContent = data.name
  document.getElementById("display-current-temperature").textContent = `${Math.ceil(data.main.temp)}°c`

  document.getElementById("humidity-icon").classList.remove("hidden")
  document.getElementById("humidity").textContent = "Humidité"
  document.getElementById("display-humidity").textContent = `${Math.ceil(data.main.humidity)}%`

  document.getElementById("wind-icon").classList.remove("hidden")
  document.getElementById("wind-speed").textContent = "Vitesse du vent"
  document.getElementById("display-wind-speed").textContent = `${Math.ceil(data.wind.speed)} km/h`

  document.getElementById("weather-description").textContent = data.weather[0].description
  document.getElementById("weather-icon").classList.remove("hidden")

  const weatherDescription = data.weather[0].main.toLowerCase()
  document.getElementById("weather-icon").src = `./public/icons/${weatherDescription}.svg`

  getPicture(weatherDescription)
  getMusic(weatherDescription)
};