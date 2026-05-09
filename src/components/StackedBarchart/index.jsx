import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const StackedBarChart = ({ max, appreciation, investment, totalRental }) => {
  const currentYear = new Date().getFullYear();

  const rentalIncrement = totalRental / 5;
  const appreciationIncrement = appreciation / 5;

  const chartData = Array.from({ length: 5 }, (_, i) => ({
    year: (currentYear + i + 1).toString(),
    investment,
    totalRental: rentalIncrement * (i + 1),
    appreciation: appreciationIncrement * (i + 1),
  }));
  return (
    <div className="mt-3" style={{ textAlign: "center" }}>
      <BarChart
        width={600}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="investment" stackId="a" fill="#1F0303" />{" "}
        <Bar dataKey="totalRental" stackId="a" fill="#FFAB00" />{" "}
        <Bar dataKey="appreciation" stackId="a" fill="#BE170F" />{" "}
      </BarChart>
    </div>
  );
};

export default StackedBarChart;
