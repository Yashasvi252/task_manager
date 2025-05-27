import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Completed from "./pages/Completed";
import Archived from "./pages/Archived";
import './styles/tailwind.css';

export default function App() {
  return (
    <RecoilRoot>
      <Router>
        <div className="p-4 font-sans">
          <nav className="flex gap-4 mb-4">
  <Link to="/" className="text-blue-500">Home</Link>
  <Link to="/completed" className="text-blue-500">Completed</Link>
  <Link to="/archived" className="text-blue-500">Archived</Link>
</nav>

          <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/completed" element={<Completed />} />
  <Route path="/archived" element={<Archived />} />
</Routes>

        </div>
        <ToastContainer />
      </Router>
    </RecoilRoot>
  );
}
