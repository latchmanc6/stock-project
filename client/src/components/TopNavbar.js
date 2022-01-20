import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import FundModal from "./FundModal";

const stripePromise = loadStripe("pk_test_A7jK4iCYHL045qgjjfzAfPxu");
// const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);

const TopNavbar = (props) => {
  const [showModal, setModalShow] = useState(false);

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  return (
    <Navbar bg="light" expand="lg" variant="light">
      <Container>
        <Navbar.Brand href="/">WeTrade</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            {props.authState.status && 
              <>
                <Nav.Link href="#">Portfolio</Nav.Link>
                <NavDropdown title="Funds" id="basic-nav-dropdown">
                  
                  <NavDropdown.Item onClick={handleModalShow}>
                    Add funds
                  </NavDropdown.Item>
                  <Elements stripe={stripePromise}>
                    <FundModal
                      showModal={showModal}
                      handleModalClose={handleModalClose}
                    />
                  </Elements>
                  
                  <NavDropdown.Item href="#">Withdraw funds</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#">View transaction</NavDropdown.Item>
                </NavDropdown>
              </>
            }

            {props.authState.status ? (
              <>
                <NavDropdown title="User" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="#"></NavDropdown.Item>
                  <NavDropdown.Item href="#">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={props.logout}>Sign Out</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/register">Sign Up</Nav.Link>
                <Nav.Link href="/login">Sign In</Nav.Link>
              </>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
