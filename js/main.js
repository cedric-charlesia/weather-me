import { getWeather } from "./weather.js";

/*
document.getElementById("city-name").addEventListener(
    "keyup", (event) => {
        event.preventDefault()
        console.log(event.target.value);
        
})
*/
document.getElementById("submit-weather").addEventListener(
    "click", (event) => {
        event.preventDefault()

        const userInput = document.getElementById("city-name").value
        if (userInput === "") {
            document.getElementById("error-message").classList.remove("hidden")
            document.getElementById("error-message").textContent = "Veuillez entrer le nom d'une ville"
        }
        else {
            document.getElementById("error-message").classList.add("hidden")
            const cityName = userInput.toLowerCase()
            getWeather(cityName)
        }


    })