import { useState } from "react"

const Filter = ({search, handleSearch}) => (
  <div>
    filter shown with: <input value={search} onChange={handleSearch} />
  </div>
)

const InputField = ({ field, value, onChange }) => (
  <div>
    {field}: <input value={value} onChange={onChange} />
  </div>
)

const PersonalForm = ({ newName, handleNewName, newNumber, handleNewNumber, addPerson }) => (
  <form >
    <InputField field="Name" value={newName} onChange={handleNewName}/>
    <InputField field="Number" value={newNumber} onChange={handleNewNumber}/>
    <div>
      <button type="submit" onClick={addPerson}>Add</button>
    </div>
  </form>
)

const Persons = ({persons}) => (
  <div>
    {persons.map((person) => <div key={person.id}>{person.name} {person.number}</div>)}
  </div>
)


const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')


  const handleNewName = (e) => {
    setNewName(e.target.value)
  }
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value) 
  }

const addPerson = (event) => {
  event.preventDefault()

  const normalizedName = newName.trim().toLowerCase()
  const normalizedNumber = newNumber.trim()

  const alreadyExists = persons.some(person => person.name.trim().toLowerCase() === normalizedName)
  
  if (alreadyExists) {
    alert(`${newName} is already added to the phonebook`)
    return
  }
  if (normalizedName === "" || normalizedNumber ==="") {
    const emptyFields = []
    if (normalizedName === "") emptyFields.push('name')
    if (normalizedNumber === "") emptyFields.push('number')
    alert(`The Following Fields are empty: ${emptyFields.join(', ')}`)
    return
  }
  const personObj = {
    name: newName,
    number: newNumber,
    id: persons.length + 1
  }
  setPersons(persons.concat(personObj))
  setNewName('')
  setNewNumber('')
}
  const personsToShow = search.trim() === '' ? persons :
    persons.filter(person => person.name.trim().toLowerCase().includes(search.trim().toLowerCase()))
  
  return (
    <>
      <h2>PhoneBook</h2>
      
      <Filter search={search} handleSearch={handleSearch} />
      
        <h2>add a new</h2>
      <PersonalForm
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </>
  )
}

export default App