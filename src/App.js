// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Accuracy from './Components/Accuracy';
import Dataset from './Components/Dataset';
import Visualisations from './Components/Visualisations';
import BestModel from './Components/BestModel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/accuracy" element={<Accuracy />} />
        <Route path="/dataset" element={<Dataset />} />
        <Route path="/visualisations" element={<Visualisations />} />
        <Route path="/bestmodel" element={<BestModel />} />
      </Routes>
    </Router>
  );
}

export default App;
