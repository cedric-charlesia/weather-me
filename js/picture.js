const unsplashAPIKey = import.meta.env.VITE_UNSPLASH_API_KEY;

const unsplashBaseUrl = import.meta.env.VITE_UNSPLASH_BASE_URL
let query = ""

export const getPicture = async (weatherCondition) => {

    if (weatherCondition === "Clear") {
        query = "beach"
    }

    if (weatherCondition === "Clouds") {
        query = "cloudy"
    }

    if (weatherCondition === "Rain") {
        query = "rainy"
    }

    if (weatherCondition === "Snow") {
        query = "snowy"
    }

    if (weatherCondition === "Thunderstorm") {
        query = "thunder"
    }
    
    const response = await fetch(`${unsplashBaseUrl}${query}&content_filter=high&per_page=3&client_id=${unsplashAPIKey}`)

    const data = await response.json()
    //console.log(data);

    const backgroundImage = document.getElementById("weather-bg-img")
    backgroundImage.classList.remove("bg-sky-300")
    backgroundImage.style.backgroundImage = `url('${data.results[0].urls.regular}')`;

}