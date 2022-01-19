import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const TopNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" variant='light'>
      <Container>

        <Navbar.Brand href="/">We Trade</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link href="#">Trade</Nav.Link>
            <Nav.Link href="/register">Sign Up</Nav.Link>
            <Nav.Link href="/login">Sign In</Nav.Link>

            <NavDropdown title="Funds" id="basic-nav-dropdown">
              <NavDropdown.Item href="/funds/add">Add funds</NavDropdown.Item>
              <NavDropdown.Item href="#">Withdraw funds</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">View transaction</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="User" id="basic-nav-dropdown">
              <NavDropdown.Item href="#">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#"></NavDropdown.Item>
              <NavDropdown.Item href="#">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">Sign Out</NavDropdown.Item>
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default TopNavbar;
