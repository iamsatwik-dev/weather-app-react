export default function HourlyCard({ data }) {
  const time = new Date(data.dt_txt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="hour-card">
      <p>{time}</p>
      <h4>{data.main.temp}°C</h4>
    </div>
  );
}