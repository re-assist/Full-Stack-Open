import axios from 'axios'

const apiKey = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'  
 
const getWeather = (city, countryCode) => { 
    const request = axios
        .get(
        `${baseUrl}?q=${city},${countryCode}&appid=${apiKey}`
    )
        .then(response => response.data)
    
    return request.then(data => (
        {
            weather: data.weather,
            main: data.main,
            wind: data.wind
        }
    ))
}


const getIcon = (iconCode) => { 
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png` 
    return iconUrl
}
 

export default {getWeather, getIcon}