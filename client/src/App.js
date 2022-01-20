import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

import Trade from "./pages/Trade";
import Register from "./pages/Register";
import Login from "./pages/Login";

import TopNavbar from "./components/TopNavbar";

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

          <TopNavbar authState={authState} logout={logout} />

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
