import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
  // Title,
  // Tooltip,
  // Legend
);

const LineChart = () => {
  const data = {
    labels: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "BTC",
        data: [40000, 30000, 20000, 10000, 40000, 30000, 20000],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      // {
      //   label: 'ETH',
      //   data: [30000, 20000, 10000, 40000, 30000, 20000, 10000],
      //   borderColor: 'rgba(153, 102, 255, 1)',
      //   backgroundColor: 'rgba(153, 102, 255, 0.2)',
      //   fill: true,
      // },
      // {
      //   label: 'Trading Bot',
      //   data: [20000, 10000, 40000, 30000, 20000, 10000, 40000],
      //   borderColor: 'rgba(255, 159, 64, 1)',
      //   backgroundColor: 'rgba(255, 159, 64, 0.2)',
      //   fill: true,
      // },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Cryptocurrency Statistics Over 1 Year",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
        },
      },
      y: {
        title: {
          display: true,
          text: "Value (USD)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
