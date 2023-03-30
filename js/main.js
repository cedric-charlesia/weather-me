import { getWeather } from "./weather.js";

document.getElementById("submit-weather").addEventListener(
    "click", (event) => {
        event.preventDefault()

        const userInput = document.getElementById("city-name").value
        const cityName = userInput.toLowerCase()
        
        getWeather(cityName)
        
})