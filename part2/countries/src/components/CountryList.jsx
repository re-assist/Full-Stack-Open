const CountryList = ({ searchResults, handleCountrySelect }) => {

  if (searchResults.length === 0 || searchResults.length === 1) return null
  


  if (searchResults.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  

  return (
    <div>
      {searchResults.map(country =>
        <div key={country}>
        {country} <button onClick={() => handleCountrySelect(country)}>show</button>
      </div>)}
    </div>
  )

}

export default CountryList