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
  const [stockChartData, setStockChartData] = useState([]);

  const getChartDataFromAPI = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/stock/getStockChartData/${ticker}`
    );
    setStockChartData(data);
  };

  const lineData1Week = {
    labels: getDaysOfStockDataLabel(1000),
    datasets: [
      {
        label: `${ticker}`,
        data: getDaysOfStockData(1000),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const lineData1Month = {
    labels: getDaysOfStockDataLabel(31),
    datasets: [
      {
        label: `${ticker}`,
        data: getDaysOfStockData(31),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const lineData3Months = {
    labels: getDaysOfStockDataLabel(91),
    datasets: [
      {
        label: `${ticker}`,
        data: getDaysOfStockData(91),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  function getDaysOfStockData(days) {
    let data = [];
    if (stockChartData.length !== 0) {
    if (days >= stockChartData.length) {
      days = stockChartData.length;
    }
    console.log("Days: " + days);
    console.log("Stock Chart: " + stockChartData.length);
      for (let i = 0; i < days; i++) {
        if (Object.keys(stockChartData)[i] === undefined) {
          return data;
        }
        data.push(stockChartData[Object.keys(stockChartData)[i]]["2. high"]);
      }
    }
    return data.reverse();
  }

  function getDaysOfStockDataLabel(days) {
    let data = [];
    if (stockChartData.length !== 0) {
      if (days >= stockChartData.length) {
        days = stockChartData.length;
      }
      console.log("Days Label: " + days);
      console.log("Stock Chart Label: " + stockChartData.length);
      for (let i = 0; i < days; i++) {
        if (Object.keys(stockChartData)[i] === null) {
          return data;
        }
        data.push(Object.keys(stockChartData)[i]);
      }
    }
    return data.reverse();
  }

  useEffect(() => {
    getChartDataFromAPI();
  }, []);

  return (
    <div>
      <Line data={lineData1Week} />
    </div>
  );
}

export default StockChart;
