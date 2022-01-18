import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import Trade from "./pages/Trade";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddFundForm from "./components/Stripe/AddFundForm";

// import Navbar from "./components/Navbar";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_A7jK4iCYHL045qgjjfzAfPxu');

function App() {
  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/token", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            email: response.data.email,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ email: "", id: 0, status: false });
  };

  return (
    <div className="App">
      
      <Elements stripe={stripePromise}>
        <AddFundForm />
      </Elements>

      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          {/* <Navbar /> */}
          {/* navbar */}
          <Box>
            {!authState.status ? (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register"> | Register</NavLink>
              </>
            ) : (
              <>
                <NavLink to="#">Home</NavLink>
                <NavLink to="#"> | Profile</NavLink>
              </>
            )}
          </Box>
          <Box className="loggedInContainer">
            <Typography>{authState.email}</Typography>
            {authState.status && (
              <Button variant="contained" onClick={logout}>
                Log out
              </Button>
            )}
          </Box>

          <Routes>
            <Route path="/trade/:ticker" element={<Trade />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
