import React, { useContext, useState, useEffect } from "react";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Elements } from "@stripe/react-stripe-js";

import { stripePromise } from "../helpers/stripePromise";
import { AuthContext } from "../helpers/AuthContext";
import { ModalContext } from "../helpers/ModalContext";
import FundModal from "./FundModal";
import { StyliedNavbar } from "components/Styled/style.js";
import SearchBar from "./SearchBar";
import axios from "axios";

const TopNavbar = ({ logout }) => {
  const { authState } = useContext(AuthContext);
  const { modal } = useContext(ModalContext);
  const [showModal, setModalShow] = modal;
  const [searchBarData, setSearchBarData] = useState({});

  const getAllTickers = () => {
    axios
      .get("https://wetrade-stock-project.herokuapp.com/api/stock/getAllStocks")
      .then((response) => {
        setSearchBarData(response.data);
      });
  };

  useEffect(() => {
    getAllTickers();
  }, []);

  return (
    <StyliedNavbar bg="light" expand="lg" variant="light">
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
                  <NavDropdown.Item href="/transaction-history">
                    View transaction history
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}

            {authState.status ? (
              <>
                {/* <NavDropdown title="User" id="basic-nav-dropdown"> */}
                <NavDropdown
                  title={authState.firstName ? authState.firstName : "User"}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="#"></NavDropdown.Item>
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

          {authState.status && (
            <SearchBar
              placeholder="Enter a ticker..."
              data={searchBarData}
            />
          )}
        </Navbar.Collapse>
      </Container>
    </StyliedNavbar>
  );
};

export default TopNavbar;
