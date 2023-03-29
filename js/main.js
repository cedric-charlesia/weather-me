import { getWeather } from "./weather.js";

// 1. Grab the input city name and send it to getWeather function

const getWeatherBtn = document.getElementById("submit-weather").addEventListener(
    "click", (event) => {
        event.preventDefault()

        const userInput = document.getElementById("city-name").value
        const cityName = userInput.toLowerCase()
        
        getWeather(cityName)
        
})