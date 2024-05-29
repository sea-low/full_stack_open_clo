import { useContext } from 'react'
import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}> 
      {props.text}
    </button>
  )
}

const App = () => {
  const randomizer = (x) => Math.floor(Math.random() * x)
  const [anecdotes, setAnecdotes] = useState([
    {quote: 'If it hurts, do it more often.', votes: 0},
    {quote: 'Adding manpower to a late software project makes it later!', votes: 0},
    {quote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
    {quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0},
    {quote: 'Premature optimization is the root of all evil.', votes: 0},
    {quote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0},
    {quote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes: 0},
    {quote: 'The only way to go fast, is to go well.', votes: 0}
  ]);
  const [selected, setSelected] = useState(0)
  const [most, setMost] = useState(0)

  return (
    <>
    <div>
      <h2>Anecdote of the Day</h2>
      {anecdotes[selected].quote}
    </div>
    <div>
      {anecdotes[selected].votes}
    </div>
    <Button text="vote" onClick={() => {
      const addingVotes = [...anecdotes]
      addingVotes[selected].votes = addingVotes[selected].votes + 1
      setAnecdotes(addingVotes)
      const justVotes = addingVotes.map((x) => x.votes)
      const highestVoted = Math.max(...justVotes)
      for(let i = 0; i < addingVotes.length; i++) {
        if(addingVotes[i].votes === highestVoted) {
          setMost(i)
        }
      }
      console.log(justVotes, highestVoted,)
    }}/>
    <Button text="next anecdote" onClick={() => setSelected(randomizer(anecdotes.length))}/>
    <div>
      <h2>Anecdote with most votes</h2>
      {`${anecdotes[most].quote} has ${anecdotes[most].votes} votes`}
    </div>
    </>
  )
}

export default App