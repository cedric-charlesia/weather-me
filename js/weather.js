import { getMusic } from "./music";
import { getPicture } from "./picture";

const weatherAPIKey = import.meta.env.VITE_WEATHER_API_KEY;

const getWeatherUrl = import.meta.env.VITE_WEATHER_BASE_URL;

export const getWeather = async (cityName) => {
  const response = await fetch(
    `${getWeatherUrl}${cityName}&units=metric&lang=fr&appid=${weatherAPIKey}`
  )
  const data = await response.json();
  //console.log(data);

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

  if (data.weather[0].main === "Clear") {
    document.getElementById("weather-icon").src = "./public/icons/sunny-day.svg"
  }

  if (data.weather[0].main === "Clouds") {
    document.getElementById("weather-icon").src = "./public/icons/cloudy.svg"
  }

  if (data.weather[0].main === "Drizzle") {
    document.getElementById("weather-icon").src = "./public/icons/drizzle.svg"
  }

  if (data.weather[0].main === "Thunderstorm") {
    document.getElementById("weather-icon").src = "./public/icons/thunderstorms.svg"
  }

  if (data.weather[0].main === "Rain") {
    document.getElementById("weather-icon").src = "./public/icons/rain.svg"
  }

  if (data.weather[0].main === "Snow") {
    document.getElementById("weather-icon").src = "./public/icons/snow.svg"
  }

  if (data.weather[0].main === "Mist") {
    document.getElementById("weather-icon").src = "./public/icons/mist.svg"
  }

  if (data.weather[0].main === "Smoke") {
    document.getElementById("weather-icon").src = "./public/icons/smoke.svg"
  }

  if (data.weather[0].main === "Fog") {
    document.getElementById("weather-icon").src = "./public/icons/fog.svg"
  }

  if (data.weather[0].main === "Tornado") {
    document.getElementById("weather-icon").src = "./public/icons/tornado.svg"
  }

  getPicture(data.weather[0].main)
  getMusic(data.weather[0].main)

  return data
};

