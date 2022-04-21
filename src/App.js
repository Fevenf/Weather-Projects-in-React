
import React, { useState } from "react";

const api = {
  key: "af01f14b01d43276fe8c6cb5b386afd3",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?zip=${query}&units=imperial&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January","February","March","April","May","June","July","August","September","October","November","December",];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let seconds = d.getSeconds();
    return `${hour}:${minute}:${seconds}, ${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="app">
      <h1 className="app-title">Weather App</h1>
      <main>
        <div className="container">
          <div>
            <input
              type="text"
              className="search-bar"
              placeholder="search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}/>
          </div>
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-holder">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">
                {dateBuilder(new Date(weather.dt * 1000))}
              </div>
            </div>
            <div className="weather-holder">
              <div className="temp">{Math.round(weather.main.temp)}°F</div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className="high">High: {weather.main.temp_max}°F</div>
              <div className="low">Low: {weather.main.temp_min}°F</div>
              <div className="feelsLike">
                Feels Like: {weather.main.feels_like}°F
              </div>
              <div className="humidity">Humidity: {weather.main.humidity}</div>
              <img
                alt="weather icon"
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
