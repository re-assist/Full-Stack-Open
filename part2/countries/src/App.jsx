import { useState} from "react"
import Search from './components/Search'
import SearchResults from './components/SearchResults'
import  './index.css'




const App = () => {
  
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
  } 

  const handleCountrySelect = (country) => setSelectedCountry(country)

  
  
  
  return (
    <>
      <Search search={search} handleSearch={handleSearch} />
      <SearchResults
        search={search}
        selectedCountry={selectedCountry}
        handleCountrySelect={handleCountrySelect}
      />
    </>
    

  )
}
 
export default App