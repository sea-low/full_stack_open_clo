const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
 }
 const Part = (props) => {
  return (
  <div>
    <p>{props.name} {props.exercises}</p>
  </div>
  )
 }

 const Total = (props) => {
  return (
    <div>
      <p>{props.amount}</p>
    </div>
  )
 }
 const Content = (props) => {
  return (
    <div>
      <Part name={props.course.parts[0].name} exercises={props.course.parts[0].exercises}/>
      <Part name={props.course.parts[1].name} exercises={props.course.parts[1].exercises}/>
      <Part name={props.course.parts[2].name} exercises={props.course.parts[2].exercises}/>
    </div>
  )
 }

const App = () => {
  const course = {
    title: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  console.log(course.parts[0].exercises)
  return (
    <div>
      <Header course={course.title}/>
      <Content course={course}/>
      <Total amount={(course.parts[0].exercises) + (course.parts[1].exercises) + (course.parts[2].exercises)}/>
    </div>
  )
}

export default App