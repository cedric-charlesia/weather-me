const unsplashAPIKey = import.meta.env.VITE_UNSPLASH_API_KEY;

const unsplashBaseUrl = import.meta.env.VITE_UNSPLASH_BASE_URL
let query = "sunny"

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

    const response = await fetch(`${unsplashBaseUrl}${query}&content_filter=high&per_page=5&client_id=${unsplashAPIKey}`)

    const data = await response.json()
    //console.log(data);

    const backgroundImage = document.getElementById("weather-bg-img")
    backgroundImage.classList.remove("bg-sky-300")
    //backgroundImage.style.backgroundImage = `url('${data.results[0].urls.regular}')`;

    let index = 0;
    let iterations = 0;

    const updateBackgroundImage = () => {
        if (index >= data.results.length) {
            index = 0;
            iterations++;
        }

        backgroundImage.style.backgroundImage = `url('${data.results[index].urls.regular}')`;

        if (iterations >= 2) {
            clearInterval(interval);
        } else {
            index++;
        }
    }

    updateBackgroundImage()
    let interval = setInterval(updateBackgroundImage, 4000);

    return data

}