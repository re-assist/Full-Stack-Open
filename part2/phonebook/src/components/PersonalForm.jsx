import InputField from './InputField'

const PersonalForm = ({ newName, handleNewName, newNumber, handleNewNumber, addPerson }) => (
  <form >
    <InputField field="Name" value={newName} onChange={handleNewName}/>
    <InputField field="Number" value={newNumber} onChange={handleNewNumber}/>
    <div>
      <button className="add" type="submit" onClick={addPerson}>Add</button>
    </div>
  </form>
)

export default PersonalForm