const Header = ({ courses }) => <h1>{courses}</h1>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>
const Content = ({ parts }) => 
  <>
  {parts.map((x) => 
  <Part key={x.id} part={x}/>)
  }   
  </>
const Course = ({courses, parts}) => 
<>
  <Header courses={courses.name}/>
  <Content parts={courses.parts}/>
</>

export default Course