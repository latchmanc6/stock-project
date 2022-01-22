import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import StockList from "components/StockList";
import FundCard from "components/Portfolio/FundCard";

const Portfolio = () => {
  let navigate = useNavigate();

  useEffect(() => {
    console.log("from portfolio");
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      
      // TODO: 3-4 functions
      // - get table data(stock transaction), funds, watchlist, asset growth?
      // axios
      // .get(`http://localhost:3001/portfolio`, {
      //   headers: { accessToken: localStorage.getItem("accessToken") },
      // })
      // axios
      // .get("http://localhost:3001/funds", {
      //   headers: { accessToken: localStorage.getItem("accessToken") },
      // })
      // .then((response) => {
      //   console.log(response.data.cash);
      // });
    }
  }, []);

  return (
    <div>
      <StockList />
      <FundCard />
    </div>
  );
};

export default Portfolio;
