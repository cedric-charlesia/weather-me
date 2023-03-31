const unsplashAPIKey = import.meta.env.VITE_UNSPLASH_API_KEY;
const unsplashBaseUrl = import.meta.env.VITE_UNSPLASH_BASE_URL

let query = ""

export const getPicture = async (weatherDescription) => {
    const clearWeather = ["sunny", "sunny day", "sunflower", "beach", "beaches", "coconut trees"]
    const cloudyWeather = ["cloudy", "cloudy sky", "cloudy day", "cloudy weather"]
    const rainyWeather = ["rainy", "rainy day", "rainy window", "rain", "heavy raining", "heavy rain"]
    const snowyWeather = ["snow", "snowy", "snowy mountains", "winter", "snow background"]
    const thunderWeather = ["thunder", "thunderstorms", "lightning", "lightning clouds", "thunderstorm and lightning", "lightning bolts"]

    if (weatherDescription === "clear") {
        query = clearWeather[Math.ceil(Math.random() * 6)]
    }

    if (weatherDescription === "clouds") {
        query = cloudyWeather[Math.ceil(Math.random() * 4)]
    }

    if (weatherDescription === "rain") {
        query = rainyWeather[Math.ceil(Math.random() * 6)]
    }

    if (weatherDescription === "snow") {
        query = snowyWeather[Math.ceil(Math.random() * 5)]
    }

    if (weatherDescription === "thunderstorm") {
        query = thunderWeather[Math.ceil(Math.random() * 6)]
    }

    if (!weatherDescription) {
        query = "sky"
    }

    const response = await fetch(`${unsplashBaseUrl}${query}&content_filter=high&per_page=7&client_id=${unsplashAPIKey}`)
    const data = await response.json()
    const images = data.results

    const backgroundImage = document.getElementById("weather-bg-img")
    backgroundImage.classList.remove("bg-gradient-to-r", "from-teal-400", "to-cyan-500")

    let index = 0
    let i = 0

    const updateBackgroundImage = () => {
        if (index >= images.length) {
            index = 0
            i++
        }

        backgroundImage.style.backgroundImage = `url('${images[index].urls.regular}')`

        if (i >= 7) {
            clearInterval(interval)
        } else {
            index++
        }
    }

    updateBackgroundImage()
    let interval = setInterval(updateBackgroundImage, 10000)
}