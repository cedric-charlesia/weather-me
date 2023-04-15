import { getWeather } from "./weather.js";

document.getElementById("submit-weather").addEventListener(
    "click", (event) => {
        event.preventDefault()

        const userInput = document.getElementById("city-name").value
        if (userInput === "") {
            document.getElementById("error-message").classList.remove("hidden")
            document.getElementById("error-message").textContent = "Veuillez entrer le nom d'une ville"

            document.getElementById("weather-bg-img").style.backgroundImage = ""
            document.getElementById("weather-bg-img").classList.add("bg-gradient-to-r", "from-cyan-600", "to-blue-300")

            document.getElementById("content-container").classList.remove("bg-white")
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
            document.getElementById("error-message").classList.add("hidden")
            const cityName = userInput.toLowerCase()
            getWeather(cityName)
        }
    })

    /** Mobile menu toggle **/
const navigationMenu = document.querySelector(".mobile-menu");

const toggleBtn = document
  .querySelector("button.mobile-menu-button")
  .addEventListener("click", function () {
    navigationMenu.classList.toggle("hidden");
  });