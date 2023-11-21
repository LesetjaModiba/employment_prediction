// src/Components/Dashboard.js
import logo from '../logo.svg';
import info from '../Images/info.png';
import dataset from '../Images/dataset.png';
import accuracy from '../Images/percent.png';
import dashboard from '../Images/dashboard (1).png';
import visual from '../Images/pie-chart.png';
import React from 'react';
import '../Style/layout.css'; // Import the stylesheet
import { useState } from 'react';

function Prediction() {
  //Set the color for the current menu option
  var optionColor = { color: '#49EB59' }

  const [formData, setFormData] = useState({
    // Initialize form data with default values
    Matric:0,
    Degree:1,
    Diploma:0,
    Female: 0,
    Geography_Suburb:0,
    Geography_Urban:1, 
    Geography_nan:0,
    Province_Free_State:0,
    Province_Gauteng:1, 
    Province_KwaZuluNatal:0, 
    Province_Limpopo:0,
    Province_Mpumalanga:0,
    Province_North_West:0,
    Province_Northern_Cape:0,
    Province_Western_Cape:0,
    Province_nan:0
    // Add other features here with default values
  });

  const onPredict=()=>{
    console.log('testing')
  }
  return (
    <div className="layout">
      <div className="left-panel">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="system-name">Employment</h1>
        </div>
        <div className="menu-options">
        <div style={{display:'flex',alignItems:'center'}}><img src={dashboard} alt="dashboard" className="menu-icon" /><a href="/" style={optionColor}>Dashboard</a></div>
          <div style={{display:'flex',alignItems:'center'}}><img src={accuracy} alt="accuracy" className="menu-icon" /><a href="/accuracy">Accuracy</a></div>
          <div style={{display:'flex',alignItems:'center'}}><img src={visual} alt="visual" className="menu-icon" /><a href="/visualisations">Visualisations</a></div>
          <div style={{display:'flex',alignItems:'center'}}><img src={dataset} alt="dataset" className="menu-icon" /><a href="/dataset">Dataset</a></div>
        </div>
      </div>

      <div className="right-panel">
        <div className="header">
          <div className='top-left'>
            <h3>Employment Prediction</h3>
            <button onClick={onPredict}>Predict</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prediction;
