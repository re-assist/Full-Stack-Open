import { useEffect, useState } from "react"
import phonebookServices from './services/persons'
import Person from './components/Person'
import PersonalForm from './components/PersonalForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import './index.css'



const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)

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
      phonebookServices
        .remove(person.id)
        .then(() => {
        setPersons(p => p.filter(p => p.id !== person.id))
        showNotification(`Deleted ${person.name}`, 'delete')
        })
      .catch(() => showNotification(`Information about ${person.name} has already been deleted`, 'error'))
    }
  }

  const showNotification = (message, type) => { 
    setNotification({message, type})
      setTimeout(() => {
          setNotification(null)
        }, 5000)
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
          showNotification(`Updated Number of ${returnedPersonObject.name}`, 'success')
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
      showNotification(`Added ${returnedPersonObject.name}`, 'success')
  })
}
  const personsToShow = search.trim() === '' ? persons :
    persons.filter(person => person.name.trim().toLowerCase().includes(search.trim().toLowerCase()))
  
  return (
    <>
      <h2>PhoneBook</h2>
      <Notification notification={notification} />
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
      <div>
    {personsToShow.map((person) => (
        <Person key={person.id} person={person} handleDelete={handleDelete}/>
    ))}
  </div>
    </>
  )
}

export default App