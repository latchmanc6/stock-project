import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function FundingHistory() {
  const { authState } = useContext(AuthContext);
  const [history, setHistory] = useState([]);

  const getTransactionhistory = () => {
    axios
      .get(
        `https://wetrade-stock-project.herokuapp.com/funds/getUserTransactionHistory/${authState.id}`
      )
      .then((response) => {
        console.log(response.data);
        setHistory(response.data);
      });
  };

  useEffect(() => {
    getTransactionhistory();
  }, []);

  return <div></div>;
}

export default FundingHistory;
