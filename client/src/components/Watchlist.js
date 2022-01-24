import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Button } from "components/Styled/style.js";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Watchlist = ({ stockId }) => {
  const [isWatch, setIsWatch] = useState(false);

  const toggleWatchlist = (stockId) => {
    axios
      .post(
        "http://localhost:3001/watchlist",
        { stockId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        // console.log(response.data.onWatch);
        setIsWatch(() => {
          return response.data.onWatch ? true : false
        });
      });
  };

  return (
    <>
      <Button
        variant="watchlist"
        onClick={() => {
          toggleWatchlist(stockId);
        }}
      >
        {!isWatch ? <AiOutlineStar /> : <AiFillStar />}
        {!isWatch ? ' Add to watchlist' : ' Remove from watchlist'}

      </Button>
    </>
  );
};

export default Watchlist;