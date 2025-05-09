// src/Components/Dataset.js
import logo from '../logo.svg';
import dataset from '../Images/dataset.png';
import accuracy from '../Images/percent.png';
import dashboard from '../Images/dashboard (1).png';
import visual from '../Images/pie-chart.png';
import prediction from '../Images/predicion.png'
import React from 'react';
import '../Style/layout.css';
import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Dataset() {
  const navigate = useNavigate();
  // const [csvData, setCsvData] = useState([]);
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/'); // Redirect to login if not authenticated
    }

    const fetchData = async () => {
      try {

        const response = await fetch('/Train.csv'); // Relative path to the CSV file
        const csvData = await response.text();

        Papa.parse(csvData, {
          header: true, // Assumes the first row in CSV is the header
          complete: (result) => {
            setJsonData(result.data);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          },
        });
      } catch (error) {
        console.error('Error fetching CSV data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  console.log(jsonData)
  var rows = jsonData;

  //Set the color for the current menu option
  var optionColor = { color: '#49EB59' }
  return (
    <div className="layout">
      <div className="left-panel">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="system-name">Employment</h1>
        </div>
        <div className="menu-options">
          <div style={{ display: 'flex', alignItems: 'center' }}><img src={dashboard} alt="dashboard" className="menu-icon" /><Link to="/dashboard">Dashboard</Link></div>
          <div style={{ display: 'flex', alignItems: 'center' }}><img src={accuracy} alt="accuracy" className="menu-icon" /><Link to="/accuracy">Accuracy</Link></div>
          <div style={{ display: 'flex', alignItems: 'center' }}><img src={visual} alt="visual" className="menu-icon" /><Link to="/visualisations">Visualisations</Link></div>
          <div style={{ display: 'flex', alignItems: 'center' }}><img src={dataset} alt="dataset" className="menu-icon" /><Link to="/dataset" style={optionColor}>Dataset</Link></div>
          <div style={{ display: 'flex', alignItems: 'center' }}><img src={prediction} alt="dataset" className="menu-icon" /><Link to="/prediction">Prediction</Link></div>
        </div>
      </div>
      <div className="right-panel">
        <div className="header">
          <div className='top-left'>
            <h3>Dataset</h3>
          </div>
        </div>
        <div className='table-dataset-container' style={{width:'1050px',maxHeight:'83vh', overflow:'auto',                            scrollbarWidth: 'none', msOverflowStyle: 'none'  }}>
          <table className='prediction-table' style={{width:'100%', height:'1200px'}}>
            <tbody>
              <tr style={{position:'sticky',top:'0'}}>
                <th>PersonId</th><th>Survey_date</th><th>Round</th><th>Status</th><th>Tenure</th><th>Geography</th><th>Province</th><th>Matric</th><th>Degree</th><th>Diploma</th><th>Schoolquintile</th><th>Math</th><th>Mathlit</th><th>Additional_lang</th><th>Home_lang</th><th>Science</th><th>Female</th><th>Sa_citizen</th><th>Birthyear</th><th>Birthmonth</th><th>Target</th>
              </tr>

              {rows.map((row, pIndex) => (
                <tr>
                  <td>{row.Person_id}</td><td>{row.Survey_date}</td><td>{row.Round}</td><td>{row.Status}</td><td>{row.Tenure}</td><td>{row.Geography}</td><td>{row.Province}</td><td>{row.Matric}</td><td>{row.Degree}</td><td>{row.Diploma}</td><td>{row.Schoolquintile}</td><td>{row.Math}</td><td>{row.Mathlit}</td><td>{row.Additional_lang}</td><td>{row.Home_lang}</td><td>{row.Science}</td><td>{row.Female}</td><td>{row.Sa_citizen}</td><td>{row.Birthyear}</td><td>{row.Birthmonth}</td><td>{row.Target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dataset;
