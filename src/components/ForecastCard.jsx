export default function ForecastCard({ data }) {
  if (!data || !data.weather) return null;

  const getIcon = (main) => {
    if (main === "Clear")
      return "https://cdn-icons-png.flaticon.com/512/869/869869.png";
    if (main === "Clouds")
      return "https://cdn-icons-png.flaticon.com/512/414/414825.png";
    if (main === "Rain")
      return "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
    if (main === "Snow")
      return "https://cdn-icons-png.flaticon.com/512/642/642102.png";

    return "https://cdn-icons-png.flaticon.com/512/869/869869.png";
  };

  const icon = getIcon(data.weather[0].main);

  return (
    <div className="card small">
      <p>{new Date(data.dt_txt).toLocaleDateString()}</p>

      <img src={icon} alt="forecast icon" />

      <h3>{data.main.temp}°C</h3>
      <p>{data.weather[0].main}</p>
    </div>
  );
}