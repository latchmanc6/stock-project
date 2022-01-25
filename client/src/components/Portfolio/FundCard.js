import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { GoPlus } from "react-icons/go";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "helpers/stripePromise";
import { ModalContext } from "helpers/ModalContext";
import FundModal from "components/FundModal";
import { Button, CardRound } from "components/Styled/style.js";
import styled from "styled-components";

const ItemWapper = styled.div`
  span {
    padding: 20px 0 20px 10px;
  }
  
  h3 {
    padding: 20px 0 20px 10px;
  }
`;

const FundCard = () => {
  const [totalCash, setTotalCash] = useState(0);
  const { modal } = useContext(ModalContext);
  const [showModal, setModalShow] = modal;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    axios
      .get("https://wetrade-stock-project.herokuapp.com/funds", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        // console.log(response.data.cash);
        setTotalCash(response.data.cash);
      });
  }, [totalCash]);

  return (
    <>
      <h5 className="text-left text-muted">Funds in this account</h5>
      {/* <Card style={{ width: "100%" }}> */}
      <CardRound>
        <Card.Body>
          <ItemWapper>
            <Card.Subtitle className="text-muted">
              <span>Available cash to trade</span>
            </Card.Subtitle>
            <Card.Title>
              <h3>{formatter.format(totalCash)}</h3>
            </Card.Title>
          </ItemWapper>
          <Button
            variant="primary"
            onClick={() => {
              setModalShow(true);
            }}
          >
            <GoPlus /> Add
          </Button>
          <Elements stripe={stripePromise}>
            <FundModal totalCash={totalCash} setTotalCash={setTotalCash} />
          </Elements>
        </Card.Body>
      </CardRound>
    </>
  );
};

export default FundCard;
