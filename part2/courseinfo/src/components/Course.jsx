
const Header = ({ name }) => <h1>{name}</h1>

const Part = ({name,exercises}) => (
  <p>
    {name} {exercises}
  </p>
)

const Content = ({parts}) => (
    <>
        {parts.map(part =>
            <Part key={part.id} name={part.name} exercises={part.exercises} />
        )} 
        <Total parts={parts}/>
    </>
)

const Total = ({ parts }) => { 
 
    const sum = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <strong>total of {sum} exercises</strong>
    )
}

const Course = ({course}) => (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            
        </>
    )

  
export default Course