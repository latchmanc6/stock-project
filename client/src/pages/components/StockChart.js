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
  const [stockChartData, setStockChartData] = useState();
  const [data, setData] = useState({ labels: [], datasets: [] });

  const getChartDataFromAPI = async () => {
    await axios
      .get(`http://localhost:3001/api/stock/getStockChartData/${ticker}`)
      .then((response) => {
        console.log(response.data);
        setStockChartData(response.data);
      })
      .then(() => {
        console.log("Right before data is set for the chart");
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
      })
      .then(() => {
        // Line.forceUpdate();
      });
  };

  const getDaysOfStockData = (days) => {
    let data = [];
    if (stockChartData !== undefined) {
      for (let i = 0; i < days; i++) {
        if (Object.keys(stockChartData)[i] === undefined) {
          return data;
        }
        data.push(stockChartData[Object.keys(stockChartData)[i]]["2. high"]);
      }
    }
    return data.reverse();
  };

  const getDaysOfStockDataLabel = (days) => {
    let data = [];
    if (stockChartData !== undefined) {
      for (let i = 0; i < days; i++) {
        if (Object.keys(stockChartData)[i] === null) {
          return data;
        }
        console.log(days);
        data.push(Object.keys(stockChartData)[i]);
      }
    }
    return data.reverse();
  };

  const reRenderChart = () => {
    this.forceUpdate();
  };

  // const lineData1Week = {
  //   labels: getDaysOfStockDataLabel(7),
  //   datasets: [
  //     {
  //       label: `${ticker}`,
  //       data: getDaysOfStockData(7),
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     },
  //   ],
  // };

  // const lineData1Month = {
  //   labels: getDaysOfStockDataLabel(31),
  //   datasets: [
  //     {
  //       label: `${ticker}`,
  //       data: getDaysOfStockData(31),
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     },
  //   ],
  // };

  // const lineData3Months = {
  //   labels: getDaysOfStockDataLabel(91),
  //   datasets: [
  //     {
  //       label: `${ticker}`,
  //       data: getDaysOfStockData(91),
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     },
  //   ],
  // };

  // const lineData6Months = {
  //   labels: getDaysOfStockDataLabel(182),
  //   datasets: [
  //     {
  //       label: `${ticker}`,
  //       data: getDaysOfStockData(182),
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     },
  //   ],
  // };

  // const lineData1Year = {
  //   labels: getDaysOfStockDataLabel(365),
  //   datasets: [
  //     {
  //       label: `${ticker}`,
  //       data: getDaysOfStockData(365),
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     },
  //   ],
  // };

  // const lineDataMax = {
  //   labels: getDaysOfStockDataLabel(20000),
  //   datasets: [
  //     {
  //       label: `${ticker}`,
  //       data: getDaysOfStockData(20000),
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     },
  //   ],
  // };

  const load1MChartData = () => {};

  useEffect(() => {
    getChartDataFromAPI();
  }, []);

  return (
    <div>
      <Line data={data} onClick={reRenderChart} />
      <button>1W</button>
      <button onClick={load1MChartData}>1M</button>
      <button>3M</button>
      <button>6M</button>
      <button>1Y</button>
      <button>MAX</button>
    </div>
  );
}

export default StockChart;
