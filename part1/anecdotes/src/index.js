import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(props.anecdotes.length).fill(0))

  const howManyVotes = () => {
    return points[selected];
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>has {howManyVotes()} votes</p>
      <NextAnectodeButton selected={selected} setSelected={setSelected} anecdotes={props.anecdotes} />
      <VoteButton selected={selected} points={points} setPoints={setPoints} anecdotes={anecdotes} />
      <MostViewedAnecdote anecdotes={props.anecdotes} points={points}/>
    </div>
  )
}

const NextAnectodeButton = (props) => {

  const nextAnectode = () => {
    const min = 0;
    const max = props.anecdotes.length-1;
    let random;

    do {
      random = Math.round(Math.random() * (max - min) + min)
    } 
    while (random === props.selected)
    
    props.setSelected(random)
  }

  return (
    <div>
      <br/>
      <button onClick={nextAnectode}>next anecdote</button>
    </div>
  )
}

const VoteButton = (props) => {

  const clickFunction = () => {
    const newPoints = [...props.points]
    newPoints[props.selected] += 1;
    props.setPoints(newPoints);
  }

  return (
    <button onClick={clickFunction}>vote</button>
  )
}

const MostViewedAnecdote = (props) => {
  const mostViewedAnecdote = () =>{
    let largest = props.points[0];
    let index = 0;
    for(let i = 1; i < props.points.length;i++){
      if(props.points[i] > largest){
        largest = props.points[i];
        index = i;
      }
    }
    return [index, largest]
  }
  
  return (
    <div>
      <h1>Anecdote with most views</h1>
      <p>{props.anecdotes[mostViewedAnecdote()[0]]}</p>
      <p>has {mostViewedAnecdote()[1]} views</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)