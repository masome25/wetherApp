

import React, { useState } from 'react'
import axios  from 'axios';


function WeatherApp() {
 const appId = '10e500a2733b2361f1e74acf08b3cccc'
 const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast'
 const iconUrl ='http://openweathermap.org/img/wn/'
 const [txt, setTxt]=useState('')
 const [result, setResult]=useState('')
 
 const handleChange = (e) => {
     setTxt(e.target.value)
  }
 
 const handleClick = () => {
    axios.get(`${baseUrl}?q=${txt}&appid=${appId}&units=metric&cnt=7`)
   .then(res=>{
     setResult(res.data)
    })
    .catch(
      console.log('error')
    )}
 
   return (
      <>
     <div className='app'>      
     <input type='search' onChange={handleChange}  value={txt} />
     <button onClick={handleClick} >search</button>
     </div>
    { (result && txt) ? (
     <div className='weather'>
     <div className='weatherHeader'>
     <div>
       <h3>{result.city.country}</h3>
       <h2>{result.city.name}</h2>
     </div>
      <div>
        <h2>{Math.round(result.list[0].main.temp)}°</h2>
        <img src={`${iconUrl}${result.list[0].weather[0].icon}@2x.png`}/>
      </div>
     </div>
      <div className='weatherInfo'>
      <div>
        <span>wind speed</span>
        <span>{result.list[0].wind.speed}</span>
      </div>
      <div>
        <span>feels like</span>
        <span>{result.list[0].main.feels_like}</span>
      </div>
      <div>
        <span>humidity</span>
        <span>{result.list[0].main.humidity}</span>
      </div>
      <div>
        <span>pressure</span>
        <span>{result.list[0].main.pressure}</span>
      </div>
      </div>
      <div className="weatherIcons">
              {result.list.map((item) => {
                return (
                  <div key={item.dt_txt}>
                  <img  src={`${iconUrl}${item.weather[0].icon}@2x.png`} />
                   <span>{item.weather[0].description}</span>
                   <span>{item.dt_txt.split(' ')[1].slice(0, 5)}</span>
                   <span><span>{item.main.temp_max}</span> <span>{item.main.temp_min}</span></span>
                  </div>
                )
              })}
            </div>
     </div> 
    ) : (
      <></>
    )}
      </>
    )}
 

export default WeatherApp