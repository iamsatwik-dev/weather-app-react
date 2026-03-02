export default function WeatherCard({ data, aqi }) {
  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  const getAqiText = (aqi) => {
    if (aqi === 1) return "Good";
    if (aqi === 2) return "Fair";
    if (aqi === 3) return "Moderate";
    if (aqi === 4) return "Poor";
    if (aqi === 5) return "Very Poor";
  };

  return (
    <div className="weather-wrapper">
      {/* Big block */}
      <div className="main-weather-card">
        <h2>{data.name}</h2>
        <img src={icon} alt="icon" />
        <h1>{data.main.temp}°C</h1>
        <p>{data.weather[0].description}</p>
      </div>

      {/* AQI + Wind */}
      <div className="info-row">
        <div className="info-card">
          <h4>AQI</h4>
          <p>{getAqiText(aqi)}</p>
        </div>

        <div className="info-card">
          <h4>Wind Speed</h4>
          <p>{data.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
}