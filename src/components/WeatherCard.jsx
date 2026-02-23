export default function WeatherCard({ data, aqi }) {
  if (!data || !data.weather) return null;

  const now = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getIcon = (main) => {
    if (main === "Clear")
      return "https://cdn-icons-png.flaticon.com/512/869/869869.png";
    if (main === "Clouds")
      return "https://cdn-icons-png.flaticon.com/512/414/414825.png";
    if (main === "Rain")
      return "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
    return "https://cdn-icons-png.flaticon.com/512/869/869869.png";
  };

  const getAqiText = (aqi) => {
    if (aqi === 1) return "Good";
    if (aqi === 2) return "Fair";
    if (aqi === 3) return "Moderate";
    if (aqi === 4) return "Poor";
    if (aqi === 5) return "Very Poor";
  };

  const icon = getIcon(data.weather[0].main);

  return (
    <div className="card big">
      <h2>{data.name}</h2>

      <img src={icon} alt="weather icon" />

      <h1>🕒 {now} • {data.main.temp}°C</h1>

      <p>{data.weather[0].description}</p>
      <p>💨 Wind: {data.wind.speed} m/s</p>
      {aqi && <p>🌫 AQI: {getAqiText(aqi)}</p>}
    </div>
  );
}