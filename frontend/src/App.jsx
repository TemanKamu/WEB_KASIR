import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cashier from "./components/Cashier.jsx";
import Analytics from "./components/Analytics.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Bill from "./components/Bill.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Manage from "./components/Manage.jsx";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cashier />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
