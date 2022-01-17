import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Container, Typography, Button, TextField } from "@mui/material";
import { AuthContext } from "../helpers/AuthContext";

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
    <Container maxWidth="sm">
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <Typography variant="h3">Log In</Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="email"
            label="Email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          /> 
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="password"
            label="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button 
            variant="contained" 
            type="submit" 
            onClick={login}
          >
            Login
          </Button>
        </Grid>

      </Grid>
    </Container>
  );
}

export default Login;
