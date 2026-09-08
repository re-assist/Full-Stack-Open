const Person = ({person, handleDelete}) => (
  <div >
    <span>{person.name} {person.number}</span>
    <button className="delete" onClick={() => handleDelete(person)}>Delete</button>
  </div>
)

export default Person