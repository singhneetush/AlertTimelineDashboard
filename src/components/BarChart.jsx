import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarChart({ data }) {
  const categoryCount = {};

  data.forEach((item) => {
    const category = item.alert?.category || "Other";
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });

  const labels = Object.keys(categoryCount);
  const values = Object.values(categoryCount);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Alert Count",
        data: values,
        backgroundColor: "#FF6384",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "white" } },
    },
    scales: {
      x: { ticks: { color: "white" } },
      y: { ticks: { color: "white" } },
    },
  };

  return (
    <div className="w-full max-w-4xl p-4 bg-[#1e1e1e] rounded-xl shadow-md my-6">
      <h2 className="text-white text-3xl font-bold mb-4 text-center">
        Bar Chart
      </h2>
      <Bar data={chartData} options={options} />
      <div className="mt-6">
        <ul className="text-sm space-y-1">
          {labels.map((label, index) => (
            <li key={label}>
              <span className="font-semibold text-[#FF6384]">{label}</span>:{" "}
              {values[index]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
