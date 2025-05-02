// src/components/AlertChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

// Sample alert data (you can replace this with a fetch or import from JSON)
const alertData = [
  {
    timestamp: "2019-01-02T03:50:09.097718",
    flow_id: 52373568,
    in_iface: "eth0",
    event_type: "alert",
    src_ip: "8.42.77.171",
    src_port: 65036,
    dest_ip: "138.68.3.71",
    dest_port: 3306,
    proto: "TCP",
    alert: {
      action: "allowed",
      gid: 1,
      signature_id: 2010937,
      rev: 3,
      signature: "ET SCAN Suspicious inbound to mySQL port 3306",
      category: "Potentially Bad Traffic",
      severity: 2,
    },
  },
  {
    timestamp: "2019-01-02T03:50:10.386108",
    flow_id: 52491840,
    in_iface: "eth0",
    event_type: "alert",
    src_ip: "8.42.77.171",
    src_port: 65386,
    dest_ip: "138.68.3.71",
    dest_port: 5915,
    proto: "TCP",
    alert: {
      action: "allowed",
      gid: 1,
      signature_id: 2002911,
      rev: 5,
      signature: "ET SCAN Potential VNC Scan 5900-5920",
      category: "Attempted Information Leak",
      severity: 2,
    },
  },
  {
    timestamp: "2019-01-02T03:50:10.421359",
    flow_id: 52507296,
    in_iface: "eth0",
    event_type: "alert",
    src_ip: "8.42.77.171",
    src_port: 65438,
    dest_ip: "138.68.3.71",
    dest_port: 5432,
    proto: "TCP",
    alert: {
      action: "allowed",
      gid: 1,
      signature_id: 2010939,
      rev: 3,
      signature: "ET SCAN Suspicious inbound to PostgreSQL port 5432",
      category: "Potentially Bad Traffic",
      severity: 2,
    },
  },
  {
    timestamp: "2019-01-02T03:50:10.576769",
    flow_id: 52568784,
    in_iface: "eth0",
    event_type: "alert",
    src_ip: "8.42.77.171",
    src_port: 49238,
    dest_ip: "138.68.3.71",
    dest_port: 1433,
    proto: "TCP",
    alert: {
      action: "allowed",
      gid: 1,
      signature_id: 2010935,
      rev: 3,
      signature: "ET SCAN Suspicious inbound to MSSQL port 1433",
      category: "Potentially Bad Traffic",
      severity: 2,
    },
  },
  {
    timestamp: "2019-01-02T03:50:10.585758",
    flow_id: 52576512,
    in_iface: "eth0",
    event_type: "alert",
    src_ip: "8.42.77.171",
    src_port: 49269,
    dest_ip: "138.68.3.71",
    dest_port: 1521,
    proto: "TCP",
    alert: {
      action: "allowed",
      gid: 1,
      signature_id: 2010936,
      rev: 3,
      signature: "ET SCAN Suspicious inbound to Oracle SQL port 1521",
      category: "Potentially Bad Traffic",
      severity: 2,
    },
  },
  {
    timestamp: "2019-01-02T03:50:10.621656",
    flow_id: 52589280,
    in_iface: "eth0",
    event_type: "alert",
    src_ip: "8.42.77.171",
    src_port: 49306,
    dest_ip: "138.68.3.71",
    dest_port: 5811,
    proto: "TCP",
    alert: {
      action: "allowed",
      gid: 1,
      signature_id: 2002910,
      rev: 5,
      signature: "ET SCAN Potential VNC Scan 5800-5820",
      category: "Attempted Information Leak",
      severity: 2,
    },
  },
  {
    timestamp: "2019-01-02T03:50:11.315110",
    flow_id: 52710912,
    in_iface: "eth0",
    event_type: "alert",
    src_ip: "8.42.77.171",
    src_port: 49678,
    dest_ip: "138.68.3.71",
    dest_port: 22,
    proto: "TCP",
    alert: {
      action: "allowed",
      gid: 1,
      signature_id: 2001219,
      rev: 19,
      signature: "ET SCAN Potential SSH Scan",
      category: "Attempted Information Leak",
      severity: 2,
    },
  },
  {
    timestamp: "2019-01-02T03:51:01.124914",
    flow_id: 52713600,
    in_iface: "eth0",
    event_type: "alert",
    src_ip: "61.176.222.167",
    src_port: 59947,
    dest_ip: "138.68.3.71",
    dest_port: 1433,
    proto: "TCP",
    alert: {
      action: "allowed",
      gid: 1,
      signature_id: 2010935,
      rev: 3,
      signature: "ET SCAN Suspicious inbound to MSSQL port 1433",
      category: "Potentially Bad Traffic",
      severity: 2,
    },
  },
  {
    timestamp: "2019-01-02T03:51:01.124914",
    flow_id: 52713600,
    in_iface: "eth0",
    event_type: "alert",
    src_ip: "61.176.222.167",
    src_port: 59947,
    dest_ip: "138.68.3.71",
    dest_port: 1433,
    proto: "TCP",
    alert: {
      action: "allowed",
      gid: 1,
      signature_id: 2010935,
      rev: 3,
      signature: "ET SCAN Suspicious inbound to MSSQL port 1433",
      category: "Potentially Bad Traffic",
      severity: 2,
    },
  },
];

const AlertChart = () => {
  // Aggregate data: count categories per timestamp
  const categoryCountsByTime = {};

  alertData.forEach((entry) => {
    const time = entry.timestamp;
    const category = entry.alert.category;

    if (!categoryCountsByTime[time]) {
      categoryCountsByTime[time] = {};
    }
    if (!categoryCountsByTime[time][category]) {
      categoryCountsByTime[time][category] = 0;
    }
    categoryCountsByTime[time][category]++;
  });

  // Get sorted timestamps
  const timestamps = Object.keys(categoryCountsByTime).sort();

  // Get unique categories
  const allCategories = new Set();
  timestamps.forEach((t) =>
    Object.keys(categoryCountsByTime[t]).forEach((cat) =>
      allCategories.add(cat)
    )
  );

  // Prepare dataset for each category
  const datasets = Array.from(allCategories).map((category, idx) => ({
    label: category,
    data: timestamps.map((t) => ({
      x: t,
      y: categoryCountsByTime[t][category] || 0,
    })),
    borderColor: `hsl(${(idx * 137.5) % 360}, 70%, 50%)`,
    backgroundColor: "transparent",
    tension: 0.3,
  }));

  const data = {
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        type: "time",
        time: {
          tooltipFormat: "PPpp",
          unit: "second",
        },
        title: { display: true, text: "Timestamp" },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Alert Count" },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default AlertChart;
