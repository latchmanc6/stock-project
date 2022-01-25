import React, { useState, useEffect, useContext } from "react";
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
  const [chartData, setChartData] = useState({});
  const [userData, setUserData] = useState({});
  const [data, setData] = useState({ labels: [], datasets: [] });

  const getChartDataFromAPI = async () => {
    await axios
      .get(
        "https://wetrade-stock-project.herokuapp.com/funds/getUserAssetChartData",
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        console.log(response.data);
        setChartData(response.data);
      })
      .then(() => {
        setData({
          labels: getUserDataLabel(),
          datasets: [
            {
              label: "Your Asset Progression",
              data: getUserData(),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    min: 0,
                  },
                },
              ],
            },
          },
        });
      })
      .then(() => {});

      axios
      .get("https://wetrade-stock-project.herokuapp.com/profile", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      });
  };

  const getUserData = () => {
    let data = [];
    if (chartData !== undefined || chartData !== null) {
      Object.keys(chartData).forEach((key) => {
        data.push(chartData[key].totalAccountValue);
      });
    }
    return data;
  };

  const getUserDataLabel = () => {
    let data = [];
    if (chartData !== undefined || chartData !== null) {
      Object.keys(chartData).forEach((key) => {
        data.push(chartData[key].date);
      });
    }
    return data;
  };

  const loadChartData = () => {
    setData({
      labels: getUserDataLabel(),
      datasets: [
        {
          label: "Your Asset Progression",
          data: getUserData(),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0,
              },
            },
          ],
        },
      },
    });
  };

  useEffect(() => {
    getChartDataFromAPI();
    loadChartData();
  }, []);

  return (
    <div>
      <div className="chartContainer">
        <Line
          data={
            data.labels.length === 0
              ? {
                  labels: getUserDataLabel(),
                  datasets: [
                    {
                      label: "Your Asset Progression",
                      data: getUserData(),
                      borderColor: "rgb(255, 99, 132)",
                      backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                  ],
                  options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                            min: 0,
                          },
                        },
                      ],
                    },
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
