import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function UserAssetChart() {
  let { ticker } = useParams();
  const [stockChartData, setStockChartData] = useState({});
  const [data, setData] = useState({ labels: [], datasets: [] });

  const getChartDataFromAPI = () => {
    axios
      .get(`http://localhost:3001/api/stock/getStockChartData/${ticker}`)
      .then((response) => {
        setStockChartData(response.data);
      })
      .then(() => {
        setData({
          labels: getDaysOfStockDataLabel(7),
          datasets: [
            {
              label: `${ticker}`,
              data: getDaysOfStockData(7),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      });
  };

  const loadMaxChartData = () => {
    setData({
      labels: getDaysOfStockDataLabel(0),
      datasets: [
        {
          label: `${ticker}`,
          data: getDaysOfStockData(0),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
  };

  useEffect(() => {
    getChartDataFromAPI();
    load1WChartData();
  }, []);

  return (
    <div>
      <div className="chartContainer">
        <Line
          data={
            data.labels.length === 0
              ? {
                  labels: getDaysOfStockDataLabel(7),
                  datasets: [
                    {
                      label: `${ticker}`,
                      data: getDaysOfStockData(7),
                      borderColor: "rgb(255, 99, 132)",
                      backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                  ],
                  options: {
                    responsive: true,
                    maintainAspectRatio: false,
                  },
                }
              : data
          }
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
}

export default UserAssetChart;
