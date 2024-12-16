import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { fetchRealTimeData } from "../services/api";
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

// Define types for chart data structure
interface Dataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  fill: boolean;
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

const RealTimeData: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Biodegradability Rate",
        data: [], // Explicitly define as number[]
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
      {
        label: "Moisture Level",
        data: [],
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
        fill: false,
      },
    ],
  });

  const [lastData, setLastData] = useState<any>(null);
  const [isFluctuating, setIsFluctuating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRealTimeData();

        const labels = data.map((item: any) =>
          new Date(item.time).toLocaleTimeString()
        );
        const rateData = data.map((item: any) => item.rate);
        const moistureData = data.map((item: any) => item.moisture);

        setChartData({
          labels,
          datasets: [
            {
              label: "Biodegradability Rate",
              data: rateData,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              fill: true,
            },
            {
              label: "Moisture Level",
              data: moistureData,
              borderColor: "rgba(153,102,255,1)",
              backgroundColor: "rgba(153,102,255,0.2)",
              fill: false,
            },
          ],
        });

        setLastData(data[data.length - 1]);
      } catch (err) {
        console.error("Error fetching initial data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);

      if (!lastData || newData.time !== lastData.time) {
        setChartData((prevData) => ({
          ...prevData,
          labels: [
            ...prevData.labels,
            new Date(newData.time).toLocaleTimeString(),
          ],
          datasets: [
            {
              ...prevData.datasets[0],
              data: [...prevData.datasets[0].data, newData.rate],
            },
            {
              ...prevData.datasets[1],
              data: [...prevData.datasets[1].data, newData.moisture],
            },
          ],
        }));

        setLastData(newData);
        setIsFluctuating(true);
      }
    };

    socket.onerror = (error) => console.error("WebSocket error:", error);

    return () => socket.close();
  }, [lastData]);

  useEffect(() => {
    if (!isFluctuating) return;

    const interval = setInterval(() => {
      setChartData((prevData) => {
        const newRate =
          prevData.datasets[0].data.slice(-1)[0] + (Math.random() * 5 - 2.5);
        const newMoisture =
          prevData.datasets[1].data.slice(-1)[0] + (Math.random() * 5 - 2.5);

        return {
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: [...prevData.datasets[0].data.slice(0, -1), newRate],
            },
            {
              ...prevData.datasets[1],
              data: [...prevData.datasets[1].data.slice(0, -1), newMoisture],
            },
          ],
        };
      });

      setIsFluctuating(false);
    }, 1000);

    return () => clearInterval(interval);
  }, [isFluctuating]);

  return (
    <Box>
      <Typography variant="h4">Real-Time Biodegradability Data</Typography>
      <Line data={chartData} />
    </Box>
  );
};

export default RealTimeData;
