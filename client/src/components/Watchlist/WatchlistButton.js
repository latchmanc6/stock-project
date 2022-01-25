import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "components/Styled/style.js";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const WatchlistButton = ({ ticker, stockId }) => {
  const [isWatch, setIsWatch] = useState(false);
  
  useEffect(() => {
    axios
      .get(`https://wetrade-stock-project.herokuapp.com/watchlist/${ticker}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response.data);
        setIsWatch(response.data.onWatchlist)
      });
  }, []);

  const toggleWatchlist = (stockId) => {
    axios
      .post(
        "https://wetrade-stock-project.herokuapp.com/watchlist",
        { stockId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        console.log(response.data.onWatch);
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

export default WatchlistButton;
