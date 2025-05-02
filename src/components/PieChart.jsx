import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const alertCategories = data.reduce((acc, alert) => {
    const category = alert.alert?.category || "Others";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(alertCategories),
    datasets: [
      {
        data: Object.values(alertCategories),
        backgroundColor: [
          "#FF6347",
          "#6A5ACD",
          "#98FB98",
          "#FFD700",
          "#FF4500",
          "#32CD32",
          "#8A2BE2",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
    radius: "70%",
  };

  return (
    <div className="bg-[#1e1e1e] rounded-xl p-4 shadow-md w-full max-w-4xl h-[400px] mx-auto my-6">
      <h3 className="text-white text-3xl font-bold mb-4 text-center">Pie Chart</h3>
      <div className="w-full h-full">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PieChart;
