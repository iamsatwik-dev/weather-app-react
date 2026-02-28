export default function HourlyCard({ data }) {
  const time = new Date(data.dt_txt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  return (
    <div className="hour-card">
      <p className="hour-time">{time}</p>
      <img src={icon} alt="icon" />
      <h4>{data.main.temp}°C</h4>
    </div>
  );
}