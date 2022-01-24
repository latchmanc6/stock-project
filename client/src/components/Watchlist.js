import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Button } from "components/Styled/style.js";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Watchlist = ({ ticker }) => {
  // const [totalCash, setTotalCash] = useState(0);

  const addTowatchlist = (ticker) => {
    axios
      .post(
        "http://localhost:3001/watchlists",
        { ticker },
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
          addTowatchlist(ticker);
        }}
      >
        <AiOutlineStar /> Add to watchlist
      </Button>
    </>
  );
};

export default Watchlist;
