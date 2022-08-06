
import React, { useState } from 'react'
import "./App.css";
import Result from './Result';


function App() {

  const APP_KEY = "66a18f1500154a65b05111923220508";

  let input = "";

  const [weather, setWeather] = useState([]);

  function citytext() {
    document.querySelector("input").addEventListener("input", (e) => {
      e.preventDefault();
      input = e.target.value;
      console.log(input);



    })
  }

  async function getData(value) {
    const data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APP_KEY}&q=${value}&days=7&aqi=no&alerts=no`);
    const result = await data.json();
    setWeather(result.forecast.forecastday);
    console.log(result.forecast.forecastday);

  }




  return (
    <div>
      <div className='search'>
        <input type="text" placeholder='Search a city...' onChange={citytext}></input>
        <button onClick={() => getData(input)}  >Search</button>



      </div>

      {weather.map(item => (
        <Result key={item.date} date={item.date} mintemp={item.day.mintemp_c} maxtemp={item.day.maxtemp_c} condition={item.day.condition.text} icon={item.day.condition.icon}></Result>
      ))}
    </div>
  )
}

export default App