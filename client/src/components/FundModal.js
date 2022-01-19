import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import CardSection from "./Stripe/CardSection";

const FundModal = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
    } else {
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
      console.log(result);
      stripeTokenHandler(result.token);
    }
  };

  const stripeTokenHandler = async (token) => {
    const paymentData = { token: token.id };

    // Use fetch to send the token ID and any other payment data to your server.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const response = await fetch("http://localhost:3001/funds/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    // Return and display the result of the charge.
    return response.json();
  };

  return (
    <Modal show={props.showModal} onHide={props.handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Modal body text goes here.</p>
        <form onSubmit={handleSubmit}>
          <CardSection />
          <button disabled={!stripe}>Confirm order</button>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default FundModal;
