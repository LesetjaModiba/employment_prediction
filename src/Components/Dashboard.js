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

function Dashboard() {

  //Set the color for the current menu option
  var optionColor = { color: '#49EB59' }

  //Declare Variables
  const [selectedOption, setSelectedOption] = useState('');

  //Initial value when dropdown is on 'Province'
  var items = [{ heading: 'Limpopo', percent: '0.36' }, { heading: 'Gauteng', percent: '0.46' }, { heading: 'Free State', percent: '0.13' }, { heading: 'North West', percent: '0.36' }, { heading: 'Limpopo', percent: '0.36' }];

  //On change function for the dropdown
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    console.log(`Selected option: ${selectedValue}`);
  };

   //Filter data on the dropdown
  if (selectedOption === 'Education') {
    //Change value when dropdown is on 'Education'
    items = [{ heading: 'Matric', percent: '0.40' }, { heading: 'Diploma', percent: '0.31' }, { heading: 'Degree', percent: '0.29' }]
  } else if (selectedOption === 'Geography') {
    //Change value when dropdown is on 'Geography'
    items = [{ heading: 'Urban', percent: '0.40' }, { heading: 'Rural', percent: '0.33' }, { heading: 'Suburb', percent: '0.26' }]
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
        <div style={{display:'flex',alignItems:'center'}}><img src={dashboard} alt="dashboard" className="menu-icon" /><a href="/" style={optionColor}>Dashboard</a></div>
          <div style={{display:'flex',alignItems:'center'}}><img src={accuracy} alt="accuracy" className="menu-icon" /><a href="/accuracy">Accuracy</a></div>
          <div style={{display:'flex',alignItems:'center'}}><img src={visual} alt="visual" className="menu-icon" /><a href="/visualisations">Visualisations</a></div>
          <div style={{display:'flex',alignItems:'center'}}><img src={dataset} alt="dataset" className="menu-icon" /><a href="/dataset">Dataset</a></div>
        </div>
      </div>

      <div className="right-panel">
        <div className="header">
          <div className='top-left'>
            <h3>Employment Rates Per Province</h3>
          </div>
          <div className="top-right">
            {/* Dropdown */}
            <select value={selectedOption} onChange={handleChange}>
              <option value="Province">Province</option>
              <option value="Education">Education</option>
              <option value="Geography">Geography</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div className='card-container-container' style={{ display: 'flex', flexWrap: 'wrap', width: '645px', height: '640px', overflow: 'auto' }}>
            {
              items.map((item, index) => (
                // <div key={index}>This is div {item}</div>
                <div key={index} className='card-container' style={{ flex: '0 0 50%' }}>
                  <div className='card'>
                    <div className='card-header'><p>{item.heading}</p></div>
                    <div className='card-percentage'><p>0.87</p></div>
                    <div className='card-options'>
                      <div className='card-option1'><p className='card-option-header'>Matric</p></div>
                      <div className='card-option3'><p className='card-option-header'>Diploma</p></div>
                      <div className='card-option2'><p className='card-option-header'>Degree</p></div></div>
                  </div>
                </div>
              ))
            }
          </div>
          <div className='table-container'>
            <table className='prediction-table'>
              <tr>
                <th>PersonId</th><th>Education</th><th>Province</th><th>Geography</th><th>Employed</th>
              </tr>
                <tbody>
                {rows.map((row,pIndex)=>(
                  <tr key={pIndex}>
                  <td>{row.personId}</td><td>{row.education}</td><td>{row.province}</td><td>{row.geography}</td><td>{row.employed}</td>
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

export default Dashboard;
