import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Button } from "components/Styled/style.js";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Watchlist = ({ stockId }) => {
  // const [totalCash, setTotalCash] = useState(0);

  const addTowatchlist = (stockId) => {
    axios
      .post(
        "http://localhost:3001/watchlist",
        { stockId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <>
      <Button
        variant="watchlist"
        onClick={() => {
          addTowatchlist(stockId);
        }}
      >
        <AiOutlineStar /> Add to watchlist
      </Button>
    </>
  );
};

export default Watchlist;
