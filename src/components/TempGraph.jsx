import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Legend
);

export default function TempGraph({ hourly }) {
  const data = {
    labels: hourly.map((h) =>
      new Date(h.dt_txt).toLocaleTimeString([], { hour: "2-digit" })
    ),
    datasets: [
      {
        label: "Temperature (°C)",
        data: hourly.map((h) => h.main.temp),
        borderColor: "#4facfe",
        backgroundColor: "rgba(79,172,254,0.2)",
        tension: 0.4,
        fill: true,

        // ⭐ POINT SETTINGS
        pointRadius: 4,
        pointHoverRadius: 8,
        pointBackgroundColor: "#4facfe",
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "#000",
        titleColor: "#fff",
        bodyColor: "#fff",
        callbacks: {
          label: function (context) {
            return `Temperature: ${context.parsed.y}°C`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { color: "rgba(0,0,0,0.05)" },
      },
    },
  };

  return <Line data={data} options={options} />;
}