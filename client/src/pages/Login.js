import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { Typography } from "@mui/material";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { BoxRound, Button } from "components/Styled/style.js";

const Wrapper = styled.div`
  margin-top: 40px;
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  const login = () => {
    const data = { email, password };

    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        console.log(response.data.error);
        // FIXME: display server side errors?
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          email: response.data.email,
          id: response.data.id,
          status: true,
        });

        navigate("/");
      }
    });
  };

  return (
    <Container>
      <BoxRound size="md">
        <Typography variant="h3">Log in</Typography>

          <Wrapper>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel label="Email" className="mb-3">
              <Form.Control
                name="email"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="name@example.com"
                style={{ width: "300px" }}
              />
            </FloatingLabel>
          </Form.Group>

            <FloatingLabel label="Password">
              <Form.Control
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Password"
                style={{ width: "300px" }}
              />
            </FloatingLabel>
          </Wrapper>

        <Wrapper>
          <Button variant="secondary" type="submit" onClick={login}>
            Log in
          </Button>
        </Wrapper>

        <Wrapper>
          Don't have an account?{" "}
          <Link to={"/register"} style={{ textDecoration: "underline" }}>
            Sign up
          </Link>
          <a></a>
        </Wrapper>
      </BoxRound>
    </Container>
  );
}

export default Login;
