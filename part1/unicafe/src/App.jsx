import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick} value={props.value}> 
      {props.text}
    </button>
  )
}
const StatisticLine = ({text, value}) => {
  return(
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}
const Statistics = (props) => {
  const all = props.good + props.bad + props.neutral
  const average = (props.good - props.bad)/all
  const positive = ((props.good/all) * 100) + '%'
  return (
  <table>
    <tbody >
      <StatisticLine text="good" value={props.good}/>
      <StatisticLine text="neutral" value={props.neutral}/>
      <StatisticLine text="bad" value={props.bad}/>
      <StatisticLine text="all" value={all}/>
      <StatisticLine text="average" value={average}/>
      <StatisticLine text="positive" value={positive}/>
    </tbody>
  </table>)
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const responseLogic = () => {
    if(!good && !neutral && !bad) {
      return <p>No feedback given</p>
    } else {
      return <Statistics good={good} neutral={neutral} bad={bad}/>
    }
  }

  return (
    <>
    <div>
    <h3>give feedback</h3>
    <Button onClick={() => setGood(good + 1)} text="good" value={good}/>
    <Button onClick={() => setNeutral(neutral + 1)} text="neutral" value={neutral}/>
    <Button onClick={() => setBad(bad + 1)} text="bad" value={bad}/>
    </div>
    <h3>statistics</h3>
    {responseLogic()}
    </>
  )
}

export default App