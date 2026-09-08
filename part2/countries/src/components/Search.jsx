const Search = ({search, handleSearch}) => (
  <div>
      find countries: <input type="text" value={search} onChange={handleSearch} />
  </div>
)

export default Search