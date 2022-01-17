import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Trade from "./pages/Trade";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/trade/:ticker" element={<Trade />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
