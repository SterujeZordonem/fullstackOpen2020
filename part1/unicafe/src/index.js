import React, {useState} from 'react';
import ReactDOM from 'react-dom';



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return(
    <div>
      <h1>Give feedback</h1>
      <Button text={"good"} set={setGood} which={good}/>
      <Button text={"neutral"} set={setNeutral} which={neutral}/>
      <Button text={"bad"} set={setBad} which={bad}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  const sum = () => {
    const sum = good+neutral+bad
    return sum
  }

  const average = () => {
    const average = ((good-bad)/sum())
    if(sum() === 0){
      return 0
    }
    return Math.round(average * 100) / 100
  }

  const positive = () => {
    const positive = (good/sum())*100
    if(good === 0){
      return 0;
    }
    return Math.round(positive * 100) / 100 + "%";
  }
  

  if(sum() === 0){
    return(
      <p>No feedback given</p>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={good}/>
          <Statistic text="neutral" value={neutral}/>
          <Statistic text="bad" value={bad}/>
          <Statistic text="all" value={sum()}/>
          <Statistic text="average" value={average()}/>
          <Statistic text="positive" value={positive()}/>
        </tbody>
      </table>
    </div>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
  
}

const Button = (props) => {
  const clickFunction = () => {
    props.set(props.which + 1)
  }

  return (
    <button onClick={clickFunction}>{props.text}</button>
  )
}



ReactDOM.render(<App />, document.getElementById('root'));


