import { useEffect, useState } from "react"
import countryServices from '../services/countries'
import CountryList from './CountryList'
import DisplayCountry from './DisplayCountry'


const SearchResults = ({ search, selectedCountry, handleCountrySelect }) => { 

  const [countryNames, setCountryNames] = useState([])
  const [countryDetails, setCountryDetails] = useState(null)

  const normalizedSearch = search.toLowerCase().trim()

  const searchResults =
    normalizedSearch === "" 
  ? []
    : countryNames.filter(country =>
      country.toLowerCase().includes(normalizedSearch)
      )

  // display the country user selected or if there's only one searchResult
    const countryToDisplay = selectedCountry ?? (searchResults.length === 1 ?  searchResults[0] : null)
  
  useEffect(() => {
    countryServices
      .getAllNames()
    .then(countries => setCountryNames(countries) )
  }, [])

  useEffect(() => {
    if (countryToDisplay === null) {
      return
    }

    countryServices
      .getCountryDetails(countryToDisplay)
      .then(countryDetails => setCountryDetails(countryDetails))
    
  }, [countryToDisplay])

  const shouldShowDetails = countryToDisplay !== null

  return (shouldShowDetails 
    ? <DisplayCountry countryDetails={countryDetails}/>
    : <CountryList searchResults={searchResults} handleCountrySelect={handleCountrySelect}  />
    )
    
}

export default SearchResults