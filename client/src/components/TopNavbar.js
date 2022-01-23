import React, { useContext } from "react";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Elements } from "@stripe/react-stripe-js";

import { stripePromise } from "../helpers/stripePromise";
import { AuthContext } from "../helpers/AuthContext";
import { ModalContext } from "../helpers/ModalContext";
import FundModal from "./FundModal";

const TopNavbar = ({ logout }) => {
  const { authState } = useContext(AuthContext);
  const { modal } = useContext(ModalContext);
  const [showModal, setModalShow] = modal;

  return (
    <Navbar bg="light" expand="lg" variant="light">
      <Container>
        <Navbar.Brand href="/">WeTrade</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {authState.status && (
              <>
                <Nav.Link href="/my-portfolio">Portfolio</Nav.Link>
                <NavDropdown title="Funds" id="basic-nav-dropdown">
                  <NavDropdown.Item
                    onClick={() => {
                      setModalShow(true);
                    }}
                  >
                    Add funds
                  </NavDropdown.Item>
                  <Elements stripe={stripePromise}>
                    <FundModal />
                  </Elements>

                  <NavDropdown.Item href="#">Withdraw funds</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#">View transaction history</NavDropdown.Item>
                </NavDropdown>
              </>
            )}

            {authState.status ? (
              <>
                <NavDropdown title="User" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="#"></NavDropdown.Item>
                  <NavDropdown.Item href="#">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Sign Out</NavDropdown.Item>
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
