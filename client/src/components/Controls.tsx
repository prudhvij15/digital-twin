import React, { useState } from "react";
import { Slider, Typography, Box } from "@mui/material";
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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Controls: React.FC = () => {
  const [temperature, setTemperature] = useState(25);
  const [moisture, setMoisture] = useState(50);
  const [chartData, setChartData] = useState({
    labels: ["Time"],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [temperature],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
      {
        label: "Moisture (%)",
        data: [moisture],
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
        fill: true,
      },
    ],
  });

  const simulateFluctuations = () => {
    const newTemperature = temperature + (Math.random() * 5 - 2.5);
    const newMoisture = moisture + (Math.random() * 5 - 2.5);

    setChartData((prevData) => {
      const newTime = new Date().toLocaleTimeString();

      return {
        ...prevData,
        labels: [...prevData.labels, `Time ${newTime}`],
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, newTemperature],
          },
          {
            ...prevData.datasets[1],
            data: [...prevData.datasets[1].data, newMoisture],
          },
        ],
      };
    });
  };

  const handleTemperatureChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setTemperature(newValue as number);
    simulateFluctuations();
  };

  const handleMoistureChange = (event: Event, newValue: number | number[]) => {
    setMoisture(newValue as number);
    simulateFluctuations();
  };

  return (
    <Box>
      <Typography variant="h6">Temperature (°C): {temperature}</Typography>
      <Slider
        value={temperature}
        min={10}
        max={50}
        step={1}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}°C`}
        onChange={handleTemperatureChange}
      />

      <Typography variant="h6">Moisture (%): {moisture}</Typography>
      <Slider
        value={moisture}
        min={10}
        max={100}
        step={1}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}%`}
        onChange={handleMoistureChange}
      />

      <Line data={chartData} />
    </Box>
  );
};

export default Controls;
