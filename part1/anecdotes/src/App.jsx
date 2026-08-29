import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>
const DisplayAnecdote = ({anecdote, votes}) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes]= useState(anecdotes.map(() => 0))   
  const [selected, setSelected] = useState(0)

  const handleNextAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const handleVote = () => {
    setVotes(v => {
      const copy = [...v]
      copy[selected] += 1
      return copy
    })
  }

  const mostVotedIndex = votes.reduce(
    (bestIndex, currentVotes, currentIndex) => 
      currentVotes > votes[bestIndex] ? currentIndex : bestIndex
    , 0
    )

  return (
    <>
      <h1>Anecdote of the day</h1>
      
      <DisplayAnecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <Button onClick={handleNextAnecdote} text="next anecdote" />
      <Button onClick={handleVote} text="vote" />
      
      <h1>Anecdote with most votes</h1>
      
      <DisplayAnecdote anecdote={anecdotes[mostVotedIndex]} votes={votes[mostVotedIndex]}/>

    </>
  )
}

export default App