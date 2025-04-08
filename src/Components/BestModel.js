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
import { useState } from 'react';
import { Link } from 'react-router-dom';

function BestModel() {

    //Set the color for the current menu option
    var optionColor = { color: '#49EB59' }

    //Declare Variables
    const [selectedOption, setSelectedOption] = useState('');

    //On change function for the dropdown
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        console.log(`Selected option: ${selectedValue}`);
    };

    //Initial value when dropdown is on 'Classification report'
    var items = { heading: 'Classification Report' };
    var modelInfo = 'After evaluating three models on our dataset, the results indicate that the Random Forest model outperforms the others with an accuracy of 83%, followed by Logistic Regression at 80%, and Neural Networks at 79%. Therefore, the Random Forest model is recommended as it demonstrates the highest accuracy and appears to be the most suitable for our dataset.';
    var fileUrl = 'https://drive.google.com/file/d/1-3pOStTHlN7eqhm0MAF9AaGX0ssZYaE_/preview';
    //Filter data on the dropdown
    if (selectedOption === 'Confusion Matrix') {
        //Change value when dropdown is on 'Confusion Matrix'
        items = { heading: 'Confusion Matrix' }
        modelInfo = 'After evaluating three models on our dataset, the results indicate that the Random Forest model outperforms the others with an accuracy of 83%, followed by Logistic Regression at 80%, and Neural Networks at 79%. Therefore, the Random Forest is recommended as it demonstrates the highest accuracy and appears to be the most suitable for our dataset.';
        fileUrl = 'https://drive.google.com/file/d/1-5oB98-UQFC0MB0gh5cGCjMvf1_5FhcI/preview';
    }


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
                        <h3>Best Model: Random Forest</h3>
                    </div>
                    <div className="top-right">
                        {/* Dropdown */}
                        <select value={selectedOption} onChange={handleChange}>
                            <option value="Classification Report">Classification Report</option>
                            <option value="Confusion Matrix">Confusion Matrix</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex' }}>
                    <div className='card-container-accuracy' style={{ width: '100%',maxWidth: '1100px', height: '640px', overflow: 'auto' }}>
                        <div className='card-container' style={{ width:'100%' }}>
                            <div className='car' style={{ marginTop:'-70px',marginBottom:'10px',width: '60%', height: '305px','display':'flex','justifyContent':'center','flexDirection':'column',marginLeft: 'auto', marginRight: 'auto' }}>
                                <div className='card-header'><p>{items.heading}</p></div>
                                <iframe src={fileUrl} width="99%" height="305" allow="autoplay" style={{'marginLeft':'auto', 'marginRight':'auto'}}></iframe>
                            </div>
                        </div>
                        <div className='model-info' style={{ marginLeft: 'auto', marginRight: 'auto', width: '500px', height: 'auto' }}>
                            <img src={info} alt="info" className="logo" />
                            <p style={{ margin: '0' }}>{modelInfo}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BestModel;
