import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, TextField } from "@mui/material";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { AuthContext } from "helpers/AuthContext";
import { Button, BoxRound } from "components/Styled/style.js";

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
      <BoxRound size="md" styleß={{ margin: "auto" }}>
        <Row>
          <Typography variant="h4">Log in</Typography>
        </Row>

        <FloatingLabel label="Email" className="mb-3">
          <Form.Control
            type="email"
            className="w-30"
            placeholder="name@example.com"
          />
        </FloatingLabel>

        <FloatingLabel label="Password">
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>

        {/* <Row>
          <TextField
              name="email"
              label="Email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            /> 
        </Row>

          <TextField
            name="password"
            label="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button 
            variant="secondary" 
            type="submit" 
            onClick={login}
          >
            Login
          </Button> */}
      </BoxRound>
    </Container>
  );
}

export default Login;
