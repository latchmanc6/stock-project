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
import axios from "axios";

import Trade from "./pages/Trade";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Button, Typography } from "@mui/material";

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
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
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
