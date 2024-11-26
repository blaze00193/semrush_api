import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DataChart = ({ data }) => {
  // Helper function to generate dates
  const generateDatesFromTrends = (startDate, trendsLength) => {
    const dates = [];
    const date = new Date(startDate);
    for (let i = 0; i < trendsLength; i++) {
      dates.push(date.toLocaleDateString("en-US", { month: "short", year: "numeric" }));
      date.setMonth(date.getMonth() + 1);
    }
    return dates;
  };

  // Assuming all trends arrays have the same length
  const trendsLength = data[0].Trends.split(",").length;
  const currentTime = new Date();
  const startDate = currentTime.setFullYear(currentTime.getFullYear() - 1);
  const labels = generateDatesFromTrends(startDate, trendsLength);

  // Transform data for Chart.js
  const transformedData = data.map((item, index) => ({
    label: `Keyword ${index + 1}`,
    data: item.Trends.split(",").map((value) => parseFloat(value)),
    backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 0.7)`,
  }));

  // Chart data object
  const chartData = {
    labels,
    datasets: transformedData,
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Keyword Trends Over Time",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};


export default DataChart;
