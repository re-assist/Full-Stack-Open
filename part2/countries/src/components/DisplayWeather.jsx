import { useEffect, useState } from "react"
import weatherServices from '../services/weather'

const DisplayWeather = ({ capital, countryCode }) => { 
  

  const [weather, setWeather] = useState(null)
  
  useEffect(() => {
    
    weatherServices
      .getWeather(capital, countryCode)
    .then(weather => setWeather(weather))
    
  }, [capital, countryCode])

  if(!weather) return null

  const tempInCelsius =  (weather.main.temp -273.15).toFixed(2)

  return (
    <>
      <h2>Weather in {capital}</h2>
      <p>Temperature: {tempInCelsius} Celsius</p>
      <img src={weatherServices.getIcon(weather.weather[0].icon)} alt={weather.weather[0].description} />
      <p>{weather.weather[0].description}</p>
      <p>wind: {weather.wind.speed} m/s</p>
    </>
  )
  
}

export default DisplayWeather