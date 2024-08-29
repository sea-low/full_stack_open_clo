import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import SearchFilter from './components/SearchFilter'
import DisplayPeople from './components/DisplayPeople'
import Notification from './components/Notification'
import phoneService from '/services/phonebook.js'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [currentMessage, setCurrentMessage] = useState(null)
  const [messageClass, setMessageClass] = useState("")

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

    const newPerson = {
      name: formData.name,
      number: formData.number,

    }
    if ((peopleArr.some((x) => x.name === formData.name)) === true) {
      let indexToBeUpdated = peopleArr.findIndex((x) => x.name == formData.name)
      if(window.confirm(`${formData.name} is already added to the phonebook, replace number with new one?`)) {
        phoneService
          .update(peopleArr[indexToBeUpdated], newPerson)
          .then(response => {
            setCurrentMessage(`Updated ${peopleArr[indexToBeUpdated].name}'s number`)
            setMessageClass("success")
            setTimeout(() => {
              setCurrentMessage(null)
              setMessageClass("")
            }, 5000)
            loadPeople()
          })
          .catch(error => {
            setCurrentMessage(`${error.response.data.error}`)
            setMessageClass("error")
            setTimeout(() => {
              setCurrentMessage(null)
              setMessageClass("")
            }, 5000)
            loadPeople()
          })

      }

    } else {
      phoneService
        .create(newPerson)
        .then(newPerson => {
          peopleArr.push(newPerson)
          setPersons(peopleArr)
        })
        .then(response => {
          setCurrentMessage(`Added ${newPerson.name}`)
          setMessageClass("success")
          setTimeout(() => {
            setCurrentMessage(null)
            setMessageClass("")
          }, 5000)
          loadPeople()
        }) .catch(error => {
          setCurrentMessage(`${error.response.data.error}`)
          setMessageClass("error")
          setTimeout(() => {
            setCurrentMessage(null)
            setMessageClass("")
          }, 5000)
          console.log(`${error.response.data.error}`)
          loadPeople()
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
        .then(response => {
          setCurrentMessage(`Deleted ${person.name}`)
          setMessageClass("success")
          setTimeout(() => {
            setMessageClass("")
            setCurrentMessage(null)
          }, 5000)
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
      <Notification type={messageClass} message={currentMessage}/>
      <h2>Phonebook</h2>
      <SearchFilter onChange={lookingPeopleUpHandler}/>
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} onChange={formDataHandler} formData={formData}/>
      <DisplayPeople persons={persons} deleteHandler={deleteHandler}/>
    </div>
  )
}

export default App