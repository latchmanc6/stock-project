import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { GoPlus } from "react-icons/go";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../helpers/stripePromise";
import { ModalContext } from "../../helpers/ModalContext";
import FundModal from "../../components/FundModal";

const FundCard = () => {
  const [totalCash, setTotalCash] = useState(0);
  const { modal } = useContext(ModalContext);
  const [showModal, setModalShow] = modal;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/funds", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        // console.log(response.data.cash);
        setTotalCash(response.data.cash);
      });
  }, [totalCash]);

  return (
    <div>
      <p>Funds in this account</p>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Subtitle className="text-muted">
            Available to trade
          </Card.Subtitle>
          <Card.Title>{formatter.format(totalCash)}</Card.Title>
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
      </Card>
    </div>
  );
};

export default FundCard;
