
const weatherForm = document.querySelector(".weatherForm")
const city_input = document.querySelector(".cityInput")
const card = document.querySelector(".card")
const api_key = "f90a0289d56353d5be77a40cb72d4c5c"

weatherForm.addEventListener("submit", async event =>{

    event.preventDefault()
    const city = city_input.value

    if(city){

        try {
           const GetWeather =  await getweatherData(city)
           displayWeatherInfo(GetWeather)
        } catch (error) {
            console.log(error)
            displayError(error)
        }

    }
    else{
        displayError("Please enter a city")
    }
})

async function getweatherData(city){

    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

    const response = await fetch(apiurl)
    console.log(response)

    if(!response.ok){
        throw new Error("could not fetch weather data")
    }

    return await response.json()
}

function displayWeatherInfo(data){
    const {
        name: city,
        main: {temp, humidity},
        weather: [{description, id}]
    } = data

    card.textContent = ""
    card.style.display = "flex"

    const city_display = document.createElement("h1")
    const temp_display = document.createElement("p")
    const humidity_display = document.createElement("p")
    const descrip_display = document.createElement("p")
    const weather_emoji = document.createElement("p")
    
    city_display.textContent = city
    city_display.classList.add("cityDisplay")
    card.appendChild(city_display)

    temp_display.textContent = `${(temp - 273.15).toFixed(2)}°C`
    temp_display.classList.add("tempDisplay")
    card.appendChild(temp_display)

    humidity_display.textContent = `Humidity: ${humidity}%`
    humidity_display.classList.add("hunidityDisplay")
    card.appendChild(humidity_display)

    descrip_display.textContent = description
    descrip_display.classList.add("descripDisplay")
    card.appendChild(descrip_display)

    weather_emoji.textContent = getWeatherEmoji(id)
    weather_emoji.classList.add("descripDisplay") 
    card.appendChild(weather_emoji)

}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈"
        case (weatherId >= 300 && weatherId < 400):
            return "🌦"
        case (weatherId >= 500 && weatherId < 600):
            return "⛅"
        case (weatherId >= 600 && weatherId < 700):
            return "❄️"
        case (weatherId >= 700 && weatherId < 800):
            return "🌁"
        case (weatherId === 800):
            return "☀️"
        case (weatherId >= 801 && weatherId < 810):
            return "☁️"
        default:
            return "❓"
    }
}  

function displayError(message){
    const error = document.createElement("p")
    error.textContent = message
    error.classList.add("errorDisplay")

    card.innerHTML = ""
    card.style.display = "flex"
    card.appendChild(error)
}   
