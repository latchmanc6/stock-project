import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Trade from "./pages/Trade";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/trade/:ticker" element={<Trade />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
