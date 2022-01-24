import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, CardRound } from "components/Styled/style.js";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

const Watchlist = () => {
  const [isWatch, setIsWatch] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/watchlist", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response.data);
        setWatchlist(response.data);
      });
  }, []);

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
          return response.data.onWatch ? true : false;
        });
      });
  };

  return (
    <>
      {/* <Button
        variant="watchlist"
        onClick={() => {
          toggleWatchlist(stockId);
        }}
      >
        {!isWatch ? <AiOutlineStar /> : <AiFillStar />}
        {!isWatch ? ' Add to watchlist' : ' Remove from watchlist'}

      </Button> */}
      <div className="d-flex justify-content-between">
        <h5 className="text-left text-muted">Watchlist</h5>
        <Button variant="watchlist" size="sm">
          Manage
        </Button>
      </div>
      <CardRound>
        {watchlist.map((value) => (
          <Card.Body key={value.id}>
            <Row>
              <Col>
                <Card.Title>{value.Stocks.ticker}</Card.Title>
                <Card.Subtitle className="text-muted">
                  {value.Stocks.companyName}
                </Card.Subtitle>
              </Col>
              <Col>
                <Card.Title>{value.Stocks.currentPrice}</Card.Title>
                <Card.Subtitle className="text-muted">
                  {value.Stocks.change < 0 ? (
                    <TiArrowSortedDown
                      style={{ color: "#b90e0a", fontSize: 18 }}
                    />
                  ) : (
                    <TiArrowSortedUp
                      style={{ color: "#377674", fontSize: 18 }}
                    />
                  )}
                  {value.Stocks.change} ({value.Stocks.percentChange}%) USD
                </Card.Subtitle>
              </Col>
            </Row>
          </Card.Body>
        ))}
      </CardRound>
    </>
  );
};

export default Watchlist;
