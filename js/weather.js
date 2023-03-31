import { getMusic } from "./music";
import { getPicture } from "./picture";

const weatherAPIKey = import.meta.env.VITE_WEATHER_API_KEY;
const getWeatherUrl = import.meta.env.VITE_WEATHER_BASE_URL;

export const getWeather = async (cityName) => {
  const response = await fetch(
    `${getWeatherUrl}${cityName}&units=metric&lang=fr&appid=${weatherAPIKey}`
  )
  const data = await response.json();

  if (data.message === "city not found") {
    document.getElementById("error-message").classList.remove("hidden")
    document.getElementById("error-message").textContent = "Oups, une erreur s'est produite. Vérifiez l'orthographe et réessayez"
    document.getElementById("weather-bg-img").style.backgroundImage = `url('public/beachview.jpg')`
    document.getElementById("content-container").classList.remove("bg-white", "bg-opacity-50", "rounded-md")
    document.getElementById("weather-track").classList.add("hidden")

    document.getElementById("display-city-name").textContent = ""
    document.getElementById("display-current-temperature").textContent = ""

    document.getElementById("humidity-icon").classList.add("hidden")
    document.getElementById("humidity").textContent = ""
    document.getElementById("display-humidity").textContent = ""

    document.getElementById("wind-icon").classList.add("hidden")
    document.getElementById("wind-speed").textContent = ""
    document.getElementById("display-wind-speed").textContent = ""
  
    document.getElementById("weather-description").textContent = ""
    document.getElementById("weather-icon").classList.add("hidden")

    document.getElementById("weather-icon").src = ""
  }
  else {
    document.getElementById("content-container").classList.add("bg-white", "bg-opacity-50", "rounded-md")
    document.getElementById("error-message").classList.add("hidden")

    document.getElementById("display-city-name").textContent = `${data.name}, ${data.sys.country}`
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
  }

};