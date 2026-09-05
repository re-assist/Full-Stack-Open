import { useEffect, useState } from "react"
import phonebookServices from './services/persons'


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

const Person = ({person, handleDelete}) => (
  <div >
    <span>{person.name} {person.number}</span>{" "}
    <button onClick={() => handleDelete(person)}>Delete</button>
  </div>
)

const Persons = ({ persons, handleDelete }) => (
  <div>
    {persons.map((person) => (
        <Person key={person.id} person={person} handleDelete={handleDelete}/>
    ))}
  </div>
)


const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    phonebookServices
      .getAll()
      .then(initialPersons => 
      setPersons(initialPersons)
    )
    
  }, [])
  


  const handleNewName = (e) => {
    setNewName(e.target.value)
  }
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value) 
  }

  const handleDelete = (person) => { 
    if(window.confirm(`Delete ${person.name}`)) { 
    phonebookServices.remove(person.id).then(() => setPersons(p => p.filter(p => p.id !== person.id) ))
    }
  }
  

const addPerson = (event) => {
  event.preventDefault()

  const normalizedName = newName.trim().toLowerCase()
  const normalizedNumber = newNumber.trim()

  const alreadyExists = persons.find(person => person.name.trim().toLowerCase() === normalizedName)
  
  if (alreadyExists) {
    if (alreadyExists.number !== normalizedNumber) {
      const confirmed = confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      if (confirmed) {
        phonebookServices.update(alreadyExists.id, {
            ...alreadyExists,
            number: normalizedNumber    
        }).then(returnedPersonObject => {
          setPersons(p =>
                  p.map(person =>
                    person.id === returnedPersonObject.id ? returnedPersonObject : person
                  )
          )
          setNewName('')
          setNewNumber('')
        })

      }
      return
    }
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
  }
  phonebookServices
    .create(personObj)
    .then( returnedPersonObject => {
    setPersons(persons.concat(returnedPersonObject))
    setNewName('')
    setNewNumber('')
  })
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
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </>
  )
}

export default App