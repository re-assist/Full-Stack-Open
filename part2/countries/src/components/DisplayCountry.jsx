import DisplayWeather from './DisplayWeather'

const DisplayCountry = ({ countryDetails }) => {
  

  if (countryDetails === null) return null

  return (
  <>
    <h1>{countryDetails.name.common}</h1>

    <p>Capital: {countryDetails.capital.join(', ')}</p>
    <p>Area {countryDetails.area}</p>

    <h2>Languages</h2>
    <ul>
      {Object
        .values(countryDetails.languages)
        .map(lang => (
        <li key={lang}>{lang}</li>
      ))}
    </ul>
    
      <h2>Flag</h2>
      <img src={countryDetails.flags.svg} alt={countryDetails.flags.alt} className="flag" />

      <DisplayWeather capital={countryDetails.capital[0]} countryCode={countryDetails.cca2} />
  </>
  )
}

export default DisplayCountry