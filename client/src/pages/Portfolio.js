import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import StockList from "components/Portfolio/StockList";
import FundCard from "components/Portfolio/FundCard";
import Watchlist from "components/Watchlist/Watchlist";

const Portfolio = () => {
  let navigate = useNavigate();

  useEffect(() => {
    console.log("from portfolio");
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } 
  }, []);

  return (
    <Container>
      <Row>

        <Col md={8}>
          <StockList />
        </Col>

        <Col md={4}>
          <FundCard />
        </Col>

        <Col md={{ span: 4, offset: 8 }}>
          <Watchlist />
        </Col>

      {/* </Row>

      <Row> */}

      </Row>

    </Container>
  );
};

export default Portfolio;
