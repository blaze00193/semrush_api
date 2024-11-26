import React, { useRef, useEffect } from "react";
import { Bubble } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Box } from "@mui/material";

// Register required components
ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const BubbleChart = ({ data }) => {
  const chartRef = useRef();

  const scaleCost = (cost) => {
    if (cost === 0)
        return 1;
    const magnitude = Math.floor(Math.log10(cost)) - 1;
    return 10 ** magnitude;
  }
  // Transform data for the chart
  const chartData = {
    datasets: data.map((item, index) => ({
      label: item.Domain || `Domain ${index + 1}`,
      data: [
        {
          x: Number(item["Organic Keywords"]),
          y: Number(item["Organic Traffic"]),
          r: Number(item["Organic Cost"]) / scaleCost(Number(item["Organic Cost"])),
        },
      ],
      backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`,
    })),
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Organic Keywords",
        },
        type: "linear", // Ensure linear scale is used
      },
      y: {
        title: {
          display: true,
          text: "Organic Traffic",
        },
        type: "linear", // Ensure linear scale is used
      },
    },
  };

  // Destroy the chart instance on unmount
  useEffect(() => {
    const chartInstance = chartRef.current;
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return(
    <Box
        sx={{
        width: "100%", // The box takes the full width of the container
        overflowX: "auto", // Enables horizontal scrolling if the content overflows
        }}
    >
    {/* Inner container to enforce the minimum width */}
        <Box
            sx={{
                minWidth: "1024px", width: "100%"
            }}
        >
            <Bubble ref={chartRef} data={chartData} options={chartOptions} />
        </Box>
    </Box>
  )
    
};

export default BubbleChart;
