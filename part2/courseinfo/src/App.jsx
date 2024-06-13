import Course from "./components/Courses"

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

  const App = () => {
    const courses = [
      {
        name: 'Half Stack application development',
        id: 1,
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3
          },
          {
            name: 'Redux',
            exercises: 11,
            id: 4
          }
        ]
      }, 
      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]
  
    return (
      <>
      <div>
        <Course courses={courses[0]} parts={courses[0].parts} />
        <Total sum={
          courses[0].parts.reduce((a, c) => a + c.exercises, 0)
          }/>
      </div>
      <div>
      <Course courses={courses[1]} parts={courses[1].parts} />
        <Total sum={
          courses[1].parts.reduce((a, c) => a + c.exercises, 0)
          }/>
      </div>
      </>
  )
  }
  
  export default App