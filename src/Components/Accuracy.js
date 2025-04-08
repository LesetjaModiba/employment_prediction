// src/Components/Accuracy.js
import logo from '../logo.svg';
import info from '../Images/info.png';
import dataset from '../Images/dataset.png';
import accuracy from '../Images/percent.png';
import dashboard from '../Images/dashboard (1).png';
import visual from '../Images/pie-chart.png';
import prediction from '../Images/predicion.png'
import React from 'react';
import '../Style/layout.css';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Accuracy() {

  //Set the color for the current menu option
  var optionColor = { color: '#49EB59' }

  //Declare Variables
  const [selectedOption, setSelectedOption] = useState('');
  var [jsonData, setJsonData] = useState([]);

  const navigate = useNavigate();

  const handleClick = () => {
    // Redirect to the 'bestmodel' route
    navigate('/bestmodel');
  };

  //On change function for the dropdown
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    console.log(`Selected option: ${selectedValue}`);
  };

    //Convert data from dummy valiables to categorical variables
    for (var i = 0; i < jsonData.length; i++) {
      //Convert educational level
      if (jsonData[i].Matric > 0) {
        jsonData[i]["Education"] = "Matric"
      }
      if (jsonData[i].Degree > 0) {
        jsonData[i]["Education"] = "Degree"
      }
      if (jsonData[i].Dploma > 0) {
        jsonData[i]["Education"] = "Diploma"
      }
  
      //Convert Geography
      if (jsonData[i].Suburb > 0) {
        jsonData[i]["Geography"] = "Suburb"
      }
      if (jsonData[i].Urban > 0) {
        jsonData[i]["Geography"] = "Urban"
      }
      if (jsonData[i].sumRural > 0) {
        jsonData[i]["Geography"] = "Rural"
      }
  
      //Convert Province
      if (jsonData[i].Gauteng > 0) {
        jsonData[i]["Province"] = "Gauteng"
      }
      if (jsonData[i].Limpopo > 0) {
        jsonData[i]["Province"] = "Limpopo"
      }
      if (jsonData[i].Free_state > 0) {
        jsonData[i]["Province"] = "Free State"
      }
      if (jsonData[i].Mpumalanga > 0) {
        jsonData[i]["Province"] = "Mpumalanga"
      }
      if (jsonData[i].kzn > 0) {
        jsonData[i]["Province"] = "KZN"
      }
      if (jsonData[i].North_west > 0) {
        jsonData[i]["Province"] = "North West"
      }
      if (jsonData[i].Northern_cape > 0) {
        jsonData[i]["Province"] = "Northern Cape"
      }
      if (jsonData[i].Western_cape > 0) {
        jsonData[i]["Province"] = "Western Cape"
      }
  
    }

  //Initial value when dropdown is on 'Province'
  var items = [{ heading: 'Logistic Regression', percent: '0.80' }];
  var modelInfo = 'Logistic Regression: 80% - Our model is performing well and making accurate predictions for most cases. We’re continuously working to improve its accuracy further.';

  //Filter data on the dropdown
  if (selectedOption === 'Random Forest') {
    //Change value when dropdown is on 'Education'
    items = [{ heading: 'Random Forest', percent: '0.83' }]
    modelInfo = 'Random Forest : 83% - Our model excels with an 80% accuracy rate, making it a reliable tool for data-driven predictions. We’re continuously working to improve its accuracy further.';
  } else if (selectedOption === 'Neural Networks') {
    //Change value when dropdown is on 'Geography'
    items = [{ heading: 'Neural Networks', percent: '0.79' }]
    modelInfo = 'Neural Networks: 79% - Our model is performing well and making accurate predictions for most cases. We’re continuously working to improve its accuracy further.';
  }

  //Fetch the csv file
  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch('/random_forest.csv'); // Relative path to the CSV file
        const csvData = await response.text();

        Papa.parse(csvData, {
          header: true, // The first row in CSV is the header
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
  }, []);
  //Design the predictions table
  // var table = <table className='prediction-table'><th>PersonId</th><th>Education</th><th>Province</th><th>Geography</th><th>Employed</th></table>;
  var rows = jsonData;
  

  return (
    <div className="layout">
      <div className="left-panel">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="system-name">Employment</h1>
        </div>
        <div className="menu-options">
          <div style={{ display: 'flex', alignItems: 'center' }}><img src={dashboard} alt="dashboard" className="menu-icon" /><Link to="/dashboard">Dashboard</Link></div>
          <div style={{ display: 'flex', alignItems: 'center' }}><img src={accuracy} alt="accuracy" className="menu-icon" /><Link to="/accuracy" style={optionColor}>Accuracy</Link></div>
          <div style={{ display: 'flex', alignItems: 'center' }}><img src={visual} alt="visual" className="menu-icon" /><Link to="/visualisations">Visualisations</Link></div>
          <div style={{ display: 'flex', alignItems: 'center' }}><img src={dataset} alt="dataset" className="menu-icon" /><Link to="/dataset">Dataset</Link></div>
          <div style={{ display: 'flex', alignItems: 'center' }}><img src={prediction} alt="dataset" className="menu-icon" /><Link to="/prediction">Prediction</Link></div>
        </div>
      </div>
      <div className="right-panel">
        <div className="header">
          <div className='top-left'>
            <h3>Model Accuracy</h3>
          </div>
          <div className="top-right">
            {/* Dropdown */}
            <select value={selectedOption} onChange={handleChange}>
              <option value="Logistic Regression">Logistic Regression</option>
              <option value="Random Forest">Random Forest</option>
              <option value="Neural Networks">Neural Networks</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div className='card-container-accuracy' style={{ width: '100%',maxWidth: '500px', height: '640px', overflow: 'auto' }}>
            {
              items.map((item, index) => (
                // <div key={index}>This is div {item}</div>
                <div key={index} className='card-container' style={{ width:'100%'}}>
                  <div className='card'>
                    <div className='card-header'><p>{item.heading}</p></div>
                    <div className='card-percentage'><p>{item.percent}</p></div>
                    <div className='card-options'>
                      {/* <div className='card-option1'><p className='card-option-header'>2021</p></div>
                      <div className='card-option3'><p className='card-option-header'>2022</p></div>
                      <div className='card-option2'><p className='card-option-header'>2023</p></div> */}
                    </div>
                  </div>
                </div>
              ))
            }
            <div className='model-info' style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              <img src={info} alt="info" className="logo" />
              <p style={{ margin: '0' }}>{modelInfo}</p>
            </div>
            <div style={{ marginLeft: 'auto', marginRight: 'auto', padding: '18px' }}>
              <div className='btn-view-mdl' onClick={handleClick}>View Best Model</div>
              {/* <a href="/bestmodel" className='btn-view-mdl'>Dataset</a> */}
            </div>
          </div>
          <div className='table-container'>
            <table className='prediction-table'>
              <tbody>
                <tr>
                  <th>PersonId</th><th>Education</th><th>Province</th><th>Geography</th><th>Employed</th>
                </tr>

                {rows.map((row, pIndex) => (
                  <tr key={pIndex}>
                    <td>{row.Education ? row.Education : "Unknown"}</td><td>{row.Province}</td><td>{row.Geography}</td><td>{row.Target}</td><td>{row.Target == 1 ? "employed" : "Unemployed"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accuracy;
