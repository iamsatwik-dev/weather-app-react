import { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import HourlyCard from "./components/HourlyCard";

const API_KEY = import.meta.env.VITE_API_KEY;;

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [aqi, setAqi] = useState(null);
  const [hourly, setHourly] = useState([]);

  const searchWeather = async () => {
    if (!city) return;

    // current weather
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    const data = await res.json();
    setWeather(data);

    // AQI
    const { lat, lon } = data.coord;
    const aqiRes = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const aqiData = await aqiRes.json();
    setAqi(aqiData.list[0].main.aqi);

    // forecast
    const fRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    const fData = await fRes.json();

    // ⭐ 5-day forecast
    const daily = fData.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );
    setForecast(daily.slice(0, 5));

    // ⭐ hourly remaining today
    const now = new Date();
    const todayHours = fData.list.filter((item) => {
      const forecastTime = new Date(item.dt_txt);
      return (
        forecastTime.getDate() === now.getDate() &&
        forecastTime.getHours() > now.getHours()
      );
    });

    setHourly(todayHours);
  };

  return (
    <div className="container">
      <h1>🌤 Weather Forecast</h1>

      <div className="search">
        <input
          placeholder="Enter city"
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={searchWeather}>Search</button>
      </div>

      {weather && <WeatherCard data={weather} aqi={aqi} />}

      {/* hourly */}
      {hourly.length > 0 && (
        <div className="hourly">
          <h3>Remaining Today</h3>
          <div className="hourly-row">
            {hourly.map((h, i) => (
              <HourlyCard key={i} data={h} />
            ))}
          </div>
        </div>
      )}

      {/* 5 day */}
      <div className="forecast">
        {forecast.map((f, i) => (
          <ForecastCard key={i} data={f} />
        ))}
      </div>
    </div>
  );
}