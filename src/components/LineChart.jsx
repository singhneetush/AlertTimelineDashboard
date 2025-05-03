import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  TimeScale,
  LinearScale,
  Tooltip,
  Filler,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

ChartJS.register(
  LineElement,
  PointElement,
  TimeScale,
  LinearScale,
  Tooltip,
  Filler,
  CategoryScale
);

const LineChart = ({ data }) => {
  const filteredData = data.filter((d) => d.timestamp && d.alert?.category);
  const timeCountMap = {};
  filteredData.forEach((d) => {
    const timeKey = new Date(d.timestamp).toLocaleString(); 
    timeCountMap[timeKey] = (timeCountMap[timeKey] || 0) + 1;
  });

  const maxTime = Object.entries(timeCountMap).reduce(
    (max, [time, count]) => (count > max.count ? { time, count } : max),
    { time: null, count: 0 }
  );

  const categorySet = Array.from(
    new Set(filteredData.map((d) => d.alert.category))
  );
  const categoryMap = categorySet.reduce((acc, category, index) => {
    acc[category] = index + 1;
    return acc;
  }, {});

  const chartData = {
    datasets: [
      {
        label: "Alert Category Over Time",
        data: filteredData.map((entry) => ({
          x: new Date(entry.timestamp),
          y: categoryMap[entry.alert.category] || 0,
        })),
        borderColor: "#00BCD4",
        backgroundColor: "#00BCD4",
        fill: false,
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const category = Object.keys(categoryMap).find(
              (key) => categoryMap[key] === context.raw.y
            );
            return `Time: ${new Date(
              context.raw.x
            ).toLocaleString()}\nCategory: ${category}`;
          },
        },
      },
      legend: { display: false },
    },
    scales: {
      x: {
        type: "time",
        time: { unit: "minute" },
        title: {
          display: true,
          text: "Timestamp",
          color: "#fff",
        },
        ticks: {
          color: "#00BCD4",
        },
        grid: {
          color: "#444",
        },
      },
      y: {
        ticks: {
          callback: (value) => {
            const category = Object.keys(categoryMap).find(
              (key) => categoryMap[key] === value
            );
            return category || "Other";
          },
          stepSize: 1,
          color: "#fff",
        },
        title: {
          display: true,
          text: "Alert Category",
          color: "#fff",
        },
        grid: {
          color: "#444",
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl h-[400px] p-4 bg-[#1e1e1e] rounded-xl shadow-md">
      <h2 className="text-white text-3xl font-bold mb-4 text-center ">
        Line Chart
      </h2>
      <Line data={chartData} options={chartOptions} />
      <div className="mt-4 text-sm text-white">
        <p className="font-medium">
          <span className="text-[#00BCD4]">Peak Alert Time:</span>{" "}
          {maxTime.time} ({maxTime.count} alerts)
        </p>
      </div>
    </div>
  );
};

export default LineChart;
