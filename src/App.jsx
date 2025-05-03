import React, { useEffect } from "react";
import alertData from "./alerts.json";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import NavigationBar from "./components/NavigationBar";
import IpTable from "./components/IpTable";

export default function App() {
  useEffect(() => {
    console.log("alertData", alertData);
    // alertData.forEach((entry, index) => {
    //   if (entry.timestamp) {
    //     const date = new Date(entry.timestamp);
    //     console.log(`Alert ${index + 1}:`, date.toLocaleString());
    //   }
    // });
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white py-4">
      <NavigationBar />
      <hr className="mb-4 h-10" />
      <div className="flex flex-col gap-[5rem] items-center">
        <LineChart data={alertData} />
        <BarChart data={alertData} />
        <PieChart data={alertData} />
        <IpTable data={alertData} />
      </div>
    </div>
  );
}
