import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, CardRound } from "components/Styled/style.js";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import styled from "styled-components";

const ItemWapper = styled.div`
  border-bottom: 1px solid rgb(230, 228, 227);

  .point {
    cursor: pointer;
  }
`;
const Container = styled.div`
  margin-bottom: 10px;
`;

const Watchlist = () => {
  let navigate = useNavigate();

  const [isWatch, setIsWatch] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    axios
      .get("https://wetrade-stock-project.herokuapp.com/watchlist", {
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
        "https://wetrade-stock-project.herokuapp.com/watchlist",
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

  const routeStockPage = (ticker) => {
    navigate(`/trade/${ticker}`);
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
      <Container>
        <div className="d-flex justify-content-between">
          <h5 className="text-left text-muted">Watchlist</h5>
          <Button variant="watchlist" size="sm">
            Manage
          </Button>
        </div>
      </Container>

      <CardRound>
        {watchlist.map((value) => (
          <ItemWapper>
            <Card.Body
              key={value.id}
              onClick={() => routeStockPage(value.Stocks.ticker)}
            >
              <Row>
                <Col xs={6} md={5} className="point">
                  <Card.Title>{value.Stocks.ticker}</Card.Title>
                  <Card.Subtitle className="text-muted">
                    {value.Stocks.companyName}
                  </Card.Subtitle>
                </Col>
                <Col xs={12} md={7}>
                  <Card.Title>$ {value.Stocks.currentPrice}</Card.Title>
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
          </ItemWapper>
        ))}
      </CardRound>
    </>
  );
};

export default Watchlist;
