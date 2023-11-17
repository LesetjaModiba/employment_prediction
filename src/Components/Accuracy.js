// src/Components/Accuracy.js
import logo from '../logo.svg';
import info from '../Images/info.png';
import dataset from '../Images/dataset.png';
import accuracy from '../Images/percent.png';
import dashboard from '../Images/dashboard (1).png';
import visual from '../Images/pie-chart.png';
import React from 'react';
import '../Style/layout.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Accuracy() {

  //Set the color for the current menu option
  var optionColor = { color: '#49EB59' }

  //Declare Variables
  const [selectedOption, setSelectedOption] = useState('');

  //Initial value when dropdown is on 'Province'
  var items = [{ heading: 'Logistic Regression', percent: '0.76' }];
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

  var modelInfo = 'Logistic Regression: 80% -  Our model excels with an 80% accuracy rate, making it a reliable tool for data-driven predictions. We’re continuously working to improve its accuracy further.';

  //Filter data on the dropdown
  if (selectedOption === 'Random Forest') {
    //Change value when dropdown is on 'Education'
    items = [{ heading: 'Random Forest', percent: '0.78' }]
    modelInfo = 'Random Forest : 75% - Our model is performing well and making accurate predictions for most cases. We’re continuously working to improve its accuracy further.';
  } else if (selectedOption === 'Neural Networks') {
    //Change value when dropdown is on 'Geography'
    items = [{ heading: 'Neural Networks', percent: '0.76' }]
    modelInfo = 'Neural Networks: 84% - Our model is performing well and making accurate predictions for most cases. We’re continuously working to improve its accuracy further.';
  }

  //Design the predictions table
  // var table = <table className='prediction-table'><th>PersonId</th><th>Education</th><th>Province</th><th>Geography</th><th>Employed</th></table>;
  var rows = [{ personId: 'id001', education: 'Matric', province: 'Limpopo', geography: 'rural', employed: 'No' },
  { personId: 'id001', education: 'Matric', province: 'Limpopo', geography: 'rural', employed: 'No' },
  { personId: 'id001', education: 'Matric', province: 'Limpopo', geography: 'rural', employed: 'No' },
  { personId: 'id001', education: 'Matric', province: 'Limpopo', geography: 'rural', employed: 'No' },
  { personId: 'id001', education: 'Matric', province: 'Limpopo', geography: 'rural', employed: 'No' },
  { personId: 'id001', education: 'Matric', province: 'Limpopo', geography: 'rural', employed: 'No' },
  { personId: 'id001', education: 'Matric', province: 'Limpopo', geography: 'rural', employed: 'No' },
  { personId: 'id001', education: 'Matric', province: 'Limpopo', geography: 'rural', employed: 'No' },
  { personId: 'id001', education: 'Matric', province: 'Limpopo', geography: 'rural', employed: 'No' },
  { personId: 'id001', education: 'Matric', province: 'Limpopo', geography: 'rural', employed: 'No' },
  { personId: 'id001', education: 'Matric', province: 'Limpopo', geography: 'rural', employed: 'No' },
  { personId: 'id001', education: 'Matric', province: 'Limpopo', geography: 'rural', employed: 'No' },
  { personId: 'id001', education: 'Matric', province: 'Limpopo', geography: 'rural', employed: 'No' },
  { personId: 'id001', education: 'Matric', province: 'Limpopo', geography: 'rural', employed: 'No' },
  { personId: 'id001', education: 'Matric', province: 'Limpopo', geography: 'rural', employed: 'No' },
  { personId: 'id001', education: 'Matric', province: 'Limpopo', geography: 'rural', employed: 'No' }
  ];

  return (
    <div className="layout">
      <div className="left-panel">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="system-name">Employment</h1>
        </div>
        <div className="menu-options">
          <div style={{display:'flex',alignItems:'center'}}><img src={dashboard} alt="dashboard" className="menu-icon" /><a href="/">Dashboard</a></div>
          <div style={{display:'flex',alignItems:'center'}}><img src={accuracy} alt="accuracy" className="menu-icon" /><a href="/accuracy" style={optionColor}>Accuracy</a></div>
          <div style={{display:'flex',alignItems:'center'}}><img src={visual} alt="visual" className="menu-icon" /><a href="/visualisations">Visualisations</a></div>
          <div style={{display:'flex',alignItems:'center'}}><img src={dataset} alt="dataset" className="menu-icon" /><a href="/dataset">Dataset</a></div>
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
          <div className='card-container-accuracy' style={{ width: '645px', height: '640px', overflow: 'auto' }}>
            {
              items.map((item, index) => (
                // <div key={index}>This is div {item}</div>
                <div key={index} className='card-container' style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                  <div className='card'>
                    <div className='card-header'><p>{item.heading}</p></div>
                    <div className='card-percentage'><p>{item.percent}</p></div>
                    <div className='card-options'>
                      <div className='card-option1'><p className='card-option-header'>Matric</p></div>
                      <div className='card-option3'><p className='card-option-header'>Diploma</p></div>
                      <div className='card-option2'><p className='card-option-header'>Degree</p></div></div>
                  </div>
                </div>
              ))
            }
            <div className='model-info' style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              <img src={info} alt="info" className="logo" />
              <p style={{margin:'0'}}>{modelInfo}</p>
            </div>
            <div style={{ marginLeft: 'auto', marginRight: 'auto', padding: '18px' }}>
              <div className='btn-view-mdl' onClick={handleClick}>View Best Model</div>
              {/* <a href="/bestmodel" className='btn-view-mdl'>Dataset</a> */}
            </div>
          </div>
          <div className='table-container'>
            <table className='prediction-table'>
              <tr>
                <th>PersonId</th><th>Education</th><th>Province</th><th>Geography</th><th>Employed</th>
              </tr>

              {rows.map((row, pIndex) => (
                <tr key={pIndex}>
                  <td>{row.personId}</td><td>{row.education}</td><td>{row.province}</td><td>{row.geography}</td><td>{row.employed}</td>
                </tr>
              ))}

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accuracy;
