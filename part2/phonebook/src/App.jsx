import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1, invisible: false},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2, invisible: false },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3, invisible: false },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4, invisible: false }
  ])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const peopleArr = [...persons]
    const newPerson = {
      name: newName,
      number: newNumber,
      id: (peopleArr.length + 1),
      invisible: false
    }
    if ((peopleArr.some((x) => x.name === newName)) === true) {
      alert(`${newName} is already added to phonebook`)
    } else {
      peopleArr.push(newPerson)
      setPersons(peopleArr)
    }
  }

  const isThisYourPerson = (event) => {
    const pattern = event.target.value
    const regex = new RegExp(pattern, "gi")
    const current = [...persons]
    current.map((x) => {
      !x.name.match(regex) ? x.invisible = true : x.invisible = false
    })
    setPersons(current)
    console.log(persons)
  }
  const nameHandler = (event) => setNewName(event.target.value)
  const numberHandler = (event) => setNewNumber(event.target.value)


  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input type="text" onChange={isThisYourPerson}/></div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(event) => 
            setNewName(event.target.value)
            }/>
        </div>
        <div>number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>
      <h2>Numbers</h2>
      {persons.map((x) => {
        if(x.invisible === false) {
          return <ul key={x.id}> {x.name} {x.number}</ul>
        }
      })}
      </div>
    </div>
  )
}

export default App