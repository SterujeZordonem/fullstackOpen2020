import React from 'react'

const Course = ({course}) => {
	return (
		<div>
			{course.map(course => {
				return (
					 <div key={course.id}>
						 <Header course={course.name}/>
						 <Content parts={course.parts}/>
						 <Total parts={course.parts}/>
					 </div>
			 )
			})}
		</div>
	)
}

const Header = ({course}) => <h2>{course}</h2>

const Content = ({parts}) => {

  return(
    <div>
      {parts.map(el => <Part key={el.id} part={el.name} exercise={el.exercises} /> )}
    </div>
  )
}

const Part = ({part,exercise}) => <p>{part} {exercise}</p>

const Total = ({parts}) => {

  const sum = parts.reduce((acc,val) => acc+val.exercises, 0)

  return(
    <p><strong>total of {sum} exercises</strong></p>
  )
}

export default Course