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

function StockChart() {
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
      })
      .then(() => {
        // Line.forceUpdate();
        //
      });
  };

  const getDaysOfStockData = (days) => {
    let data = [];
    let counter = 0;
    if (stockChartData !== undefined || stockChartData !== null) {
      if (days === 0) {
        Object.keys(stockChartData).forEach((key) => {
          data.push(stockChartData[key]["2. high"]);
        });
      } else {
        Object.keys(stockChartData).forEach((key) => {
          if (counter !== days) {
            data.push(stockChartData[key]["2. high"]);
            counter++;
          } else {
            return data;
          }
        });
      }
    }
    return data.reverse();
  };

  const getDaysOfStockDataLabel = (days) => {
    let data = [];
    let counter = 0;
    if (stockChartData !== undefined || stockChartData !== null) {
      if (days === 0) {
        Object.keys(stockChartData).forEach((key) => {
          data.push(key);
        });
      } else {
        Object.keys(stockChartData).forEach((key) => {
          if (counter !== days) {
            data.push(key);
            counter++;
          } else {
            return data;
          }
        });
      }
    }
    return data.reverse();
  };

  const load1WChartData = () => {
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
    });
  };

  const load1MChartData = () => {
    setData({
      labels: getDaysOfStockDataLabel(31),
      datasets: [
        {
          label: `${ticker}`,
          data: getDaysOfStockData(31),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
  };

  const load3MChartData = () => {
    setData({
      labels: getDaysOfStockDataLabel(91),
      datasets: [
        {
          label: `${ticker}`,
          data: getDaysOfStockData(91),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
  };

  const load6MChartData = () => {
    setData({
      labels: getDaysOfStockDataLabel(182),
      datasets: [
        {
          label: `${ticker}`,
          data: getDaysOfStockData(182),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
  };

  const load1YChartData = () => {
    setData({
      labels: getDaysOfStockDataLabel(365),
      datasets: [
        {
          label: `${ticker}`,
          data: getDaysOfStockData(365),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
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
        <button onClick={load1WChartData}>1W</button>
        <button onClick={load1MChartData}>1M</button>
        <button onClick={load3MChartData}>3M</button>
        <button onClick={load6MChartData}>6M</button>
        <button onClick={load1YChartData}>1Y</button>
        <button onClick={loadMaxChartData}>MAX</button>
      </div>
    </div>
  );
}

export default StockChart;
