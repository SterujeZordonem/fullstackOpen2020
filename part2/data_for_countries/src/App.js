import React, {useState, useEffect} from 'react';
import axios from 'axios'

import './App.css';

const App = (props) => {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [chosenCountry, setChosenCountry] = useState({});
  const [weatherData, setWeatherData] = useState({});


  // Fetching data of all countries and saving it into state variable "countries"
  useEffect(()=> {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data);
    })
  },[])

  // Fetching weather data of the country chosen by the user.
  useEffect(()=>{
    // Object cannot be empty! - this prevent a lot of bugs after first re-render.
    if(Object.keys(chosenCountry).length !== 0 ){
      // Saved 'special key' which is needed to use WeatherApi in Environmental Variable. (<-- look .env file)
      const api_key = process.env.REACT_APP_API_KEY;
      axios.get('http://api.weatherstack.com/current?access_key='+api_key+'&query='+chosenCountry.name).then(response=>{
        setWeatherData(response.data)
      })
    }
    // If the chosen country changes, this side efect function is executed
  },[chosenCountry])


  // After every re-render, function creates list(array) of countries that match with user input
  const countriesToShow = () => {
    const countryList = countries.filter(country=> country.name.toLowerCase().includes(input.toLowerCase()))

    // Of course input cannot be empty - otherwise state variables will cause a lot of bugs :/
    if(input.length > 0){

      if(countryList.length > 10){
        return(
          <p>Too many maches, specify another filter</p>
        )
      }

      else if(countryList.length>1){
        return(
          <div className='top'>
            {countryList.map(country => 
            <div className="country_div"  key={countries.indexOf(country)}>
              <div>{country.name}</div>
              <button onClick={()=> setInput(country.name)}>show</button>
            </div>
            )}
          </div>
        )
      }

      else if(countryList.length === 1) {
        // Update country
        if(chosenCountry !== countryList[0]){
          setChosenCountry(countryList[0]);
        }
        
        // Weather data cannot be empty - otherwise it'll cause break of the application
        if(Object.keys(weatherData).length > 0){
          return(
            <div>
              <h2>{chosenCountry.name}</h2>
              <p>capital {chosenCountry.capital}</p>
              <p>population {chosenCountry.population}</p>
              <h3>languages</h3>
              <ul>
                {chosenCountry.languages.map((language,i)=> <li key={i}>{language.name}</li>)}
              </ul>
              <img src={chosenCountry.flag} alt="flag of the country" height="150" width="200"/>
              <div className="weather">
                <h3>weather in {chosenCountry.name}</h3>
                <p><strong>temperature: </strong>{weatherData.current.temperature}</p>
                <img src={weatherData.current.weather_icons[0]} alt={weatherData.current.weather_descriptions}/>
                <p><strong>wind: </strong>{weatherData.current.wind_speed} direction {weatherData.current.wind_dir} </p>
              </div>
            </div>
          )
        }
      }
    }
  }
  

  return(
    <>
      <div>
        find countries 
        <input type="text" value={input} onChange={e=> setInput(e.target.value)}/>
      </div>
      <div>
        {countriesToShow()}
      </div>
    </>
  )
}



export default App;
