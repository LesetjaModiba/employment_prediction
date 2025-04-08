
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Accuracy from './Components/Accuracy';
import Dataset from './Components/Dataset';
import Visualisations from './Components/Visualisations';
import BestModel from './Components/BestModel';
import Register from './Components/Authentication/register';
import Login from './Components/Authentication/login';
import Prediction from './Components/Prediction';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accuracy" element={<Accuracy />} />
        <Route path="/dataset" element={<Dataset />} />
        <Route path="/visualisations" element={<Visualisations />} />
        <Route path="/bestmodel" element={<BestModel />} />
        <Route path="/Prediction" element={<Prediction />} />
      </Routes>
    </Router>
  );
}

export default App;
