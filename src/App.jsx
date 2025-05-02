import React from "react";
import alertData from "./alerts.json";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";

export default function App() {
  return (
    <div className="min-h-screen bg-[#121212] text-white p-4">
      <h1 className="text-4xl  font-bold mb-8">Alert Dashboard</h1>
      <hr className="mb-4 h-10" />
      <div className="flex flex-col gap-[5rem] items-center">
        <LineChart data={alertData} />
        <BarChart data={alertData} />
        <PieChart data={alertData} />
      </div>
    </div>
  );
}
