import { useState } from "react"

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad}) => {
   
  const total = good + neutral + bad
   
  if(total === 0) return (<p>No feedback given</p>)
  
  const average =   (good - bad) / total 
      
  const positivePercentage =  `${(good / total) * 100} %`
  
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={total}/>
        <StatisticLine text="average" value={average}/>
        <StatisticLine text="positive" value={positivePercentage}/>
      </tbody>
    </table>
    )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(g => g + 1)

  const handleNeutralClick = () => setNeutral(n => n + 1)

  const handleBadClick = () => setBad(b => b + 1)

  return (
    <>
      <h1>give feedback</h1> 
      
      <Button onClick={handleGoodClick} text="Good" />
      <Button onClick={handleNeutralClick} text="Neutral" />
      <Button onClick={handleBadClick} text="Bad" />
      <br />
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </>
  )
  

}

export default App