import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import SearchFilter from './components/SearchFilter'
import DisplayPeople from './components/DisplayPeople'
import phoneService from '/services/phonebook.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const loadPeople = () => {
    const people = []
    phoneService
      .getAll()
      .then(response => {
        response.map((x) => {
          x.invisible = false
          people.push(x)
        })
        setPersons(people)
      })
  }

  const hook = () => {
    loadPeople()
  }
  useEffect(hook, [])

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
    const idParam = []
    peopleArr.map((x) => idParam.push(x.id))
    idParam.sort((a, b) => b - a)

    const newPerson = {
      name: formData.name,
      number: formData.number,
      id: (Number(idParam[0]) + 1).toString(),
      invisible: false
    }
    if ((peopleArr.some((x) => x.name === formData.name)) === true) {
      let indexToBeUpdated = peopleArr.findIndex((x) => x.name == formData.name)
      if(window.confirm(`${formData.name} is already added to the phonebook, replace number with new one?`)) {
        phoneService
          .update(peopleArr[indexToBeUpdated], newPerson)
          .then(response => {
            loadPeople()
          })
      }
      // alert(`${formData.name} is already added to phonebook`)
    } else {
      phoneService
        .create(newPerson)
        .then(response => {
          peopleArr.push(newPerson)
          setPersons(peopleArr)
        })
    }
  }

  const deleteHandler = (person) => {
    if(window.confirm(`Delete ${person.name}?`)) {
      phoneService
        .eliminate(person)
        .then(response => {
          loadPeople()
        })
    }
  }

  const lookingPeopleUpHandler = (event) => {
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
      <SearchFilter onChange={lookingPeopleUpHandler}/>
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} onChange={formDataHandler} formData={formData}/>
      <DisplayPeople persons={persons} deleteHandler={deleteHandler}/>
    </div>
  )
}

export default App