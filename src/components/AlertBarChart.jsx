// src/components/AlertChart.jsx
import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import alertData from "../new.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const getCategoryData = (category) => {
  const result = {};

  alertData.forEach((item) => {
    const ts = item.timestamp;
    const cat = item.alert?.category || "Others";

    if (cat !== category) return;

    result[ts] = (result[ts] || 0) + 1;
  });

  // Sort by timestamp
  const sortedEntries = Object.entries(result).sort(
    ([a], [b]) => new Date(a) - new Date(b)
  );

  return {
    labels: sortedEntries.map(([ts]) => ts),
    data: sortedEntries.map(([_, count]) => count),
  };
};

const AlertChart = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    "Potentially Bad Traffic"
  );

  const categories = [
    ...new Set(alertData.map((item) => item.alert?.category || "Others")),
  ];

  const { labels, data } = getCategoryData(selectedCategory);

  const chartData = {
    labels,
    datasets: [
      {
        label: selectedCategory,
        data,
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: `Alerts Over Time: ${selectedCategory}` },
    },
    scales: {
      x: {
        type: "time",
        time: { unit: "minute" },
        title: { display: true, text: "Timestamp" },
      },
      y: {
        title: { display: true, text: "Alert Count" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="p-2 rounded border my-4"
      >
        {categories.map((cat, i) => (
          <option key={i} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default AlertChart;
