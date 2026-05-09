// Import React and ApexCharts components
import React from "react";
import Chart from "react-apexcharts";

const BarChart = () => {
  // Define the chart options and data
  const options = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        distributed: true,
        barHeight: "20%",
        columnWidth: "42px",
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      colors: ["#40C4AA", "#89D0F0", "#40C4AA", "#89D0F0"], // Custom colors for each bar
    },
  };

  const series = [
    {
      name: "Progress",
      data: [100, 80, 60, 40],
    },
  ];

  return (
    <div className="bar-chart">
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default BarChart;
