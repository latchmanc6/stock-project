import React, { useContext } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { ModalContext } from "../helpers/ModalContext";

import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import { Button } from 'components/Styled/style.js';

const FundModal = ({ totalCash, setTotalCash }) => {
  const { modal, amount, depositStatus } = useContext(ModalContext);
  const [showModal, setModalShow] = modal;
  const [amountVal, setAmountVal] = amount;
  const [depositStatusVal, setDepositStatusVal] = depositStatus;

  const stripe = useStripe();
  const elements = useElements();

  const handleModalClose = () => {
    setModalShow(false);
    setAmountVal(0);
    setDepositStatusVal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      console.log(result.error.message);
    } else {
      const depositResult = await stripeTokenHandler(result.token);
      console.log(depositResult);

      if (depositResult.status !== "succeeded") {
        console.log(depositResult.error.message);
      } else {
        setDepositStatusVal(true);
        if (totalCash)
          setTotalCash(
            (parseFloat(totalCash) + parseFloat(amountVal)).toFixed(2)
          );
      }
    }
  };

  const stripeTokenHandler = async (token) => {
    const paymentData = { token: token.id, amount: amountVal };

    // Use fetch to send the token ID and any other payment data to your server.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const response = await fetch("https://wetrade-stock-project.herokuapp.com/funds/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(paymentData),
    });

    // Return and display the result of the charge.
    return response.json();
  };

  return (
    <Modal centered show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add funds</Modal.Title>
      </Modal.Header>

      {!depositStatusVal ? (
        <>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Amount to deposit</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <FormControl onChange={(e) => setAmountVal(e.target.value)} />
                  <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Card detail</Form.Label>
                <CardElement />
              </Form.Group>
            </Modal.Body>

            {/* TODO: Add swirl icon while resolving promise? */}
            <Modal.Footer>
              <Button variant="secondary" disabled={!stripe} type="submit">
                Confirm deposit
              </Button>
            </Modal.Footer>
          </Form>
        </>
      ) : (
        <>
          <Modal.Body>{`You've got $${amountVal} available to trade!`}</Modal.Body>

          <Modal.Footer>
            <Button
              variant="primary"
              onClick={handleModalClose}
            >
              Done
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default FundModal;
