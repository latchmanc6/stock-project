import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

import Home from "./pages/Home";
import Trade from "./pages/Trade";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Portfolio from "./pages/Portfolio";
import Profile from "./pages/Profile";
import FundingHistory from "./pages/FundingHistory";

import TopNavbar from "./components/TopNavbar";
import { ModalContext } from "./helpers/ModalContext";


function App() {

  // AuthContext Values
  const [authState, setAuthState] = useState({
    firstName: "",
    email: "",
    id: 0,
    status: false,
  });

  // ModalContext Values
  const [showModal, setModalShow] = useState(false);
  const [amount, setAmount] = useState("");
  const [depositStatus, setDepositStatus] = useState(false);

  useEffect(() => {
    axios
      .get("https://wetrade-stock-project.herokuapp.com/auth/token", {
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
        <ModalContext.Provider
          value={{
            modal: [showModal, setModalShow],
            amount: [amount, setAmount],
            depositStatus: [depositStatus, setDepositStatus],
          }}
        >
          <Router>
            <TopNavbar logout={logout} />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/trade/:ticker" element={<Trade />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/my-portfolio" element={<Portfolio />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/transaction-history" element={<FundingHistory />} />
            </Routes>
          </Router>
        </ModalContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
