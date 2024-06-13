import { useState } from 'react'
import PersonForm from './components/PersonForm'
import SearchFilter from './components/SearchFilter'
import DisplayPeople from './components/DisplayPeople'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1, invisible: false},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2, invisible: false },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3, invisible: false },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4, invisible: false }
  ])
  const [formData, setFormData] = useState ({
    name: "",
    number: ""
  })
  const formDataHandler = (event) => {
    const { name, value } = event.target;
    setFormData( {...formData, [name]: value})
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log(event.target)
    const peopleArr = [...persons]
    const newPerson = {
      name: formData.name,
      number: formData.number,
      id: (peopleArr.length + 1),
      invisible: false
    }
    if ((peopleArr.some((x) => x.name === formData.name)) === true) {
      alert(`${formData.name} is already added to phonebook`)
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
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter onChange={isThisYourPerson}/>
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} onChange={formDataHandler} formData={formData}/>
      <DisplayPeople persons={persons}/>
    </div>
  )
}

export default App