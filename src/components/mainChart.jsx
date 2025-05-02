import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  TimeScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  TimeScale
);

const MainChart = ({ data }) => {
  // Group by category
  const categoryCount = {};
  const timeSeries = {};

  data.forEach((item) => {
    const category = item.alert.category;
    const time = item.timestamp.split("T")[0]; // date only

    // Count by category
    categoryCount[category] = (categoryCount[category] || 0) + 1;

    // Time series per day
    timeSeries[time] = (timeSeries[time] || 0) + 1;
  });

  // Chart Data
  const categoryLabels = Object.keys(categoryCount);
  const categoryValues = Object.values(categoryCount);

  const timeLabels = Object.keys(timeSeries);
  const timeValues = Object.values(timeSeries);

  // Chart.js format
  const barData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Alerts per Category",
        data: categoryValues,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Alert Count by Category" },
    },
  };

  const pieData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Alert Distribution",
        data: categoryValues,
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#cc65fe",
          "#ffce56",
          "#4bc0c0",
          "#9966ff",
          "#ff9f40",
        ],
      },
    ],
  };

  const lineData = {
    labels: timeLabels,
    datasets: [
      {
        label: "Alerts Over Time",
        data: timeValues,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.2,
        fill: true,
      },
    ],
  };

  return (
    <div style={{ display: "grid", gap: "40px", padding: "2rem" }}>
      <div>
        <h2>Bar Chart: Alerts by Category</h2>
        <Bar data={barData} options={options} />
      </div>
      <div>
        <h2>Line Chart: Alerts Over Time</h2>
        <Line data={lineData} options={options} />
      </div>
      <div>
        <h2>Pie Chart: Category Distribution</h2>
        <Pie data={pieData} options={options} />
      </div>
    </div>
  );
};

export default MainChart;
