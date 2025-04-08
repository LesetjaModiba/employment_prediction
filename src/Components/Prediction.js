import logo from '../logo.svg';
import dataset from '../Images/dataset.png';
import accuracy from '../Images/percent.png';
import dashboard from '../Images/dashboard (1).png';
import visual from '../Images/pie-chart.png';
import prediction from '../Images/predicion.png'
import React from 'react';
import '../Style/layout.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react'; // Make sure to import useState


function Prediction() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const [predictionResults, setPredictionResults] = useState([]);


    const handlePrediction = () => {
        if (!selectedFile) return;

        // Simulated prediction results
        const dummyResults = [
            {
                Person_id: 101,
                Survey_date: '2022-01-15',
                Round: 1,
                Status: 'Completed',
                Tenure: 'Full-time',
                Geography: 'Urban',
                Province: 'Gauteng',
                Matric: 'Yes',
                Degree: 'No',
                Diploma: 'Yes',
                Schoolquintile: 5,
                Math: 70,
                Mathlit: null,
                Additional_lang: 'Afrikaans',
                Home_lang: 'English',
                Science: 65,
                Female: 1,
                Sa_citizen: 1,
                Birthyear: 1999,
                Birthmonth: 7,
                Target: 1
            },
            {
                Person_id: 102,
                Survey_date: '2022-02-10',
                Round: 1,
                Status: 'Completed',
                Tenure: 'Part-time',
                Geography: 'Rural',
                Province: 'Limpopo',
                Matric: 'Yes',
                Degree: 'Yes',
                Diploma: 'No',
                Schoolquintile: 3,
                Math: 82,
                Mathlit: null,
                Additional_lang: 'Zulu',
                Home_lang: 'Sepedi',
                Science: 75,
                Female: 0,
                Sa_citizen: 1,
                Birthyear: 1998,
                Birthmonth: 12,
                Target: 0
            }
        ];

        setPredictionResults(dummyResults);
        console.log(predictionResults)
    };

    //Set the color for the current menu option
    var optionColor = { color: '#49EB59' }
    return (
        <div className="layout">
            <div className="left-panel">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                    <h1 className="system-name">Employment</h1>
                </div>

                {/* Nav Bar */}
                <div className="menu-options">
                    <div style={{ display: 'flex', alignItems: 'center' }}><img src={dashboard} alt="dashboard" className="menu-icon" /><Link to="/dashboard">Dashboard</Link></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}><img src={accuracy} alt="accuracy" className="menu-icon" /><Link to="/accuracy">Accuracy</Link></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}><img src={visual} alt="visual" className="menu-icon" /><Link to="/visualisations">Visualisations</Link></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}><img src={dataset} alt="dataset" className="menu-icon" /><Link to="/dataset">Dataset</Link></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}><img src={prediction} alt="dataset" className="menu-icon" /><Link to="/prediction" style={optionColor}>Prediction</Link></div>
                </div>
            </div>

            {/* Title */}
            <div className="right-panel">
                <div className="header">
                    <div className='top-left'>
                        <h3>Prediction</h3>
                    </div>
                </div>

                {/* File Selection */}
                <div className='prediction_container' style={{ width: '1000px', height: '83vh', overflow: 'auto', padding: '20px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <h4>Select a file for prediction:</h4>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ marginTop: '10px', marginBottom: '10px' }}
                    />
                    {selectedFile && (
                        <div style={{ marginTop: '10px' }}>
                            <strong>Selected File:</strong> {selectedFile.name}
                        </div>
                    )}

                    {/* Prediction Button */}
                    <button
                        onClick={() => handlePrediction()}
                        disabled={!selectedFile}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: selectedFile ? '#817D86' : '#ccc',
                            color: selectedFile ? '#49EB59' : '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: selectedFile ? 'pointer' : 'not-allowed',
                            marginTop: '15px'
                        }}
                    >Make Prediction
                    </button>

                    {/* Prediction Results */}
                    <div style={{ marginTop: '30px', overflow: 'hidden' }}>
                        <h4>Prediction Results</h4>
                        <div style={{
                            overflowX: 'auto',
                            overflowY: 'auto',
                            maxWidth: '100%',
                            maxHeight: '400px',
                            whiteSpace: 'nowrap',
                            scrollbarWidth: 'none',       // Firefox
                            msOverflowStyle: 'none'       // IE and Edge
                        }}>
                            <table className='prediction-table' style={{ width: '100%' }}>
                                <tbody>
                                    <tr style={{height:'40px',position:'sticky',top:'0'}}>
                                        <th>PersonId</th><th>Survey_date</th><th>Round</th><th>Status</th><th>Tenure</th><th>Geography</th><th>Province</th><th>Matric</th><th>Degree</th><th>Diploma</th><th>Schoolquintile</th><th>Math</th><th>Mathlit</th><th>Additional_lang</th><th>Home_lang</th><th>Science</th><th>Female</th><th>Sa_citizen</th><th>Birthyear</th><th>Birthmonth</th><th>Target</th>
                                    </tr>

                                    {predictionResults.map((row, pIndex) => (
                                        <tr style={{height:'40px'}} key={pIndex}>
                                            <td>{row.Person_id}</td><td>{row.Survey_date}</td><td>{row.Round}</td><td>{row.Status}</td><td>{row.Tenure}</td><td>{row.Geography}</td><td>{row.Province}</td><td>{row.Matric}</td><td>{row.Degree}</td><td>{row.Diploma}</td><td>{row.Schoolquintile}</td><td>{row.Math}</td><td>{row.Mathlit}</td><td>{row.Additional_lang}</td><td>{row.Home_lang}</td><td>{row.Science}</td><td>{row.Female}</td><td>{row.Sa_citizen}</td><td>{row.Birthyear}</td><td>{row.Birthmonth}</td><td>{row.Target}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Prediction;
