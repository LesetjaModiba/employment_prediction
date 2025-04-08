// src/Components/Dashboard.js
import logo from '../logo.svg';
// import info from '../Images/info.png';
import dataset from '../Images/dataset.png';
import accuracy from '../Images/percent.png';
import dashboard from '../Images/dashboard (1).png';
import visual from '../Images/pie-chart.png';
import prediction from '../Images/predicion.png'
import React from 'react';
import '../Style/layout.css'; // Import the stylesheet
import { useEffect, useState } from 'react';
import csvtojson from 'csvtojson';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate()
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

  // const [csvData, setCsvData] = useState([]);
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/'); // Redirect to login if not authenticated
    }
    const fetchData = async () => {
      try {

        const response = await fetch('http://localhost:4000/get-csv-data');
        // const response = await fetch('https://drive.google.com/file/d/1bs9TrkxSQe_RBK_ATL12-8EQx7YUJluv/view');

        if (response.ok) {
          const data = await response.text();
          // Process or set the CSV data in the state
          // setCsvData(data);

          // Convert CSV to JSON
          const jsonArray = await csvtojson().fromString(data);
          // console.log(jsonArray)

          // Set the JSON data in the state
          setJsonData(jsonArray);

        } else {
          console.error('Failed to fetch CSV file:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  var totalEmployed = [];

  var sumMatric = 0, sumDegree = 0, sumDiploma = 0, sumUnknown = 0;
  var matricPercent = 0, degreePercent = 0, diplomaPercent = 0, percentUnknown = 0;

  var sumSuburb = 0, sumUrban = 0, sumRural = 0;
  var suburbPercent = 0, urbanPercent = 0, ruralPercent = 0;

  var sumGP = 0, sumL = 0, sumKZN = 0, sumNW = 0, sumFS = 0, sumWC = 0, sumEC = 0, sumMP = 0, sumNC = 0;
  var gpPercent = 0, lPercent = 0, kznPercent = 0, nwPercent = 0, fsPercent = 0, wcPercent = 0, ecPercent = 0, ncPercent = 0, mpPercent = 0;



  //Assign only positive outcomes to totalEmployed
  for (var i = 0; i < jsonData.length; i++) {
    if (jsonData[i].Target == 1) {
      totalEmployed[i] = jsonData[i];
    }
  }
  console.log('total employed', totalEmployed.length)

  //Calculate the percentage of employment for each category
  for (var i = 0; i < jsonData.length; i++) {
    // jsonData.push({"Education":""})
    //Calculate for Educational Level
    if (jsonData[i].Matric > 0 && jsonData[i].Degree <= 0 && jsonData[i].Dploma <= 0) {
      sumMatric++;
      jsonData[i]["Education"] = "Matric"
    }
    if (jsonData[i].Degree > 0 && jsonData[i].Matric > 0) {
      sumDegree++;
      jsonData[i]["Education"] = "Degree"
    }
    if (jsonData[i].Dploma > 0 && jsonData[i].Matric > 0) {
      sumDiploma++;
      jsonData[i]["Education"] = "Diploma"
    }
    if (jsonData[i].Matric <= 0 && jsonData[i].Degree <= 0 && jsonData[i].Dploma <= 0) {
      sumUnknown++;
      jsonData[i]["Education"] = "No Qualifcation"
    }

    //Calculate for Geography
    if (jsonData[i].Suburb > 0) {
      sumSuburb++;
      jsonData[i]["Geography"] = "Suburb"
    }
    if (jsonData[i].Urban > 0) {
      sumUrban++;
      jsonData[i]["Geography"] = "Urban"
    }
    if (jsonData[i].Rural <= 0 && jsonData[i].Suburb <= 0 && jsonData[i].Urban <= 0) {
      sumRural++;
      jsonData[i]["Geography"] = "Rural"
    }

    //Calculate for Province
    if (jsonData[i].Gauteng > 0) {
      sumGP++;
      jsonData[i]["Province"] = "Gauteng"
    }
    if (jsonData[i].Limpopo > 0) {
      sumL++;
      jsonData[i]["Province"] = "Limpopo"
    }
    if (jsonData[i].Free_state > 0) {
      sumFS++;
      jsonData[i]["Province"] = "Free State"
    }
    if (jsonData[i].Mpumalanga > 0) {
      sumMP++;
      jsonData[i]["Province"] = "Mpumalanga"
    }
    if (jsonData[i].kzn > 0) {
      sumKZN++;
      jsonData[i]["Province"] = "KZN"
    }
    if (jsonData[i].North_west > 0) {
      sumNW++;
      jsonData[i]["Province"] = "North West"
    }
    if (jsonData[i].Northern_cape > 0) {
      sumNC++;
      jsonData[i]["Province"] = "Northern Cape"
    }
    if (jsonData[i].Western_cape > 0) {
      sumWC++;
      jsonData[i]["Province"] = "Western Cape"
    }


    // if(jsonData[i].target > 0){
    //   jsonData.target = "Employed"
    // }else{
    //   jsonData[i].target = "Unemployed"
    // }
  }
  //Assign the percentages for educational levels
  matricPercent = ((sumMatric / totalEmployed.length) * 100).toFixed(2);
  degreePercent = ((sumDegree / totalEmployed.length) * 100).toFixed(2);
  diplomaPercent = ((sumDiploma / totalEmployed.length) * 100).toFixed(2);
  percentUnknown = ((sumUnknown / totalEmployed.length) * 100).toFixed(2);

  //Assign the percentages for Geographical areas
  suburbPercent = ((sumSuburb / totalEmployed.length) * 100).toFixed(2);
  urbanPercent = ((sumUrban / totalEmployed.length) * 100).toFixed(2);
  ruralPercent = ((sumRural / totalEmployed.length) * 100).toFixed(2);

  //Assign the percentages for Province
  gpPercent = ((sumGP / totalEmployed.length) * 100).toFixed(2);
  lPercent = ((sumL / totalEmployed.length) * 100).toFixed(2);
  fsPercent = ((sumFS / totalEmployed.length) * 100).toFixed(2);
  nwPercent = ((sumNW / totalEmployed.length) * 100).toFixed(2);
  ecPercent = ((sumEC / totalEmployed.length) * 100).toFixed(2);
  wcPercent = ((sumWC / totalEmployed.length) * 100).toFixed(2);
  kznPercent = ((sumKZN / totalEmployed.length) * 100).toFixed(2);
  mpPercent = ((sumMP / totalEmployed.length) * 100).toFixed(2);
  ncPercent = ((sumNC / totalEmployed.length) * 100).toFixed(2);

  console.log(jsonData)
  //Design the predictions table

  //Convert dummy variables into categorical variables
  // for(var i =0; i<jsonData.length; i++){
  //   if(jsonData[i].Matric ==)
  // }
  // var table = <table className='prediction-table'><th>PersonId</th><th>Education</th><th>Province</th><th>Geography</th><th>Employed</th></table>;
  var rows = jsonData;

  //Filter criteria for education
  var education = ["Matric", "Degree", "Diploma", "No Qualification"];
  var edPercentObj = { "Matric": matricPercent, "Degree": degreePercent, "Diploma": diplomaPercent, "No Qualification": percentUnknown }
  // Filter criteria for geography
  var geography = ["Suburb", "Urban", "Rural"];//, "Rural"
  var geoPercentObj = { "Suburb": suburbPercent, "Urban": urbanPercent, "Rural": ruralPercent }
  // Filter criteria for geography
  var province = ["Gauteng", "Free State", "Limpopo", "KZN", "North West", "Northern Cape", "Western Cape", "Eastern Cape", "Mpumalanga"];//, "Rural"
  var provPercentObj = { "Gauteng": gpPercent, "Free State": fsPercent, "KZN": kznPercent, "Limpopo": lPercent, "North West": nwPercent, "Northern Cape": ncPercent, "Eastern Cape": ecPercent, "Western Cape": wcPercent, "Mpumalanga": mpPercent }
  var items = [];
  for (var j = 0; j < province.length; j++) {
    items.push({ "heading": province[j], "percent": provPercentObj[province[j]] });
  }

  //Initial value when dropdown is on 'Province'
  // var items = [{ heading: 'Limpopo', percent: '0.36' }, { heading: 'Gauteng', percent: '0.46' }, { heading: 'Free State', percent: '0.13' }, { heading: 'North West', percent: '0.36' }, { heading: 'Limpopo', percent: '0.36' }];

  var title = "Province"

  //Filter data on the dropdown
  if (selectedOption === 'Education') {
    //Change value when dropdown is on 'Education'
    items = [];
    title = "Educational Level"
    for (var j = 0; j < education.length; j++) {
      items.push({ "heading": education[j], "percent": edPercentObj[education[j]] });
    }
    // console.log(items)
  } else if (selectedOption === 'Geography') {
    //Change value when dropdown is on 'Geography'
    title = "Geographical Area"
    items = [];
    for (var j = 0; j < geography.length; j++) {
      items.push({ "heading": geography[j], "percent": geoPercentObj[geography[j]] });
    }
  }


  return (
    <div className="layout">
      <div className="left-panel">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="system-name">Employment</h1>
        </div>
        <div className="menu-options">
          <div style={{ display: 'flex', alignItems: 'center' }}><img src={dashboard} alt="dashboard" className="menu-icon" /><Link to="/dashboard" style={optionColor}>Dashboard</Link></div>
          <div style={{ display: 'flex', alignItems: 'center' }}><img src={accuracy} alt="accuracy" className="menu-icon" /><Link to="/accuracy">Accuracy</Link></div>
          <div style={{ display: 'flex', alignItems: 'center' }}><img src={visual} alt="visual" className="menu-icon" /><Link to="/visualisations">Visualisations</Link></div>
          <div style={{ display: 'flex', alignItems: 'center' }}><img src={dataset} alt="dataset" className="menu-icon" /><Link to="/dataset">Dataset</Link></div>
          <div style={{ display: 'flex', alignItems: 'center' }}><img src={prediction} alt="dataset" className="menu-icon" /><Link to="/prediction">Prediction</Link></div>
        </div>
      </div>

      <div className="right-panel">
        <div className="header">
          <div className='top-left'>
            <h3>Employment Rates Per {title}</h3>
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
          <div className='card-container-container' style={{ display: 'flex', flexWrap: 'wrap', width: '100%',maxWidth:'645px', height: '640px', overflow: 'auto' }}>
            {
              items.map((item, index) => (
                // <div key={index}>This is div {item}</div>
                <div key={index} className='card-container' style={{ flex: '0 0 50%' }}>
                  <div className='card'>
                    <div className='card-header'><p>{item.heading}</p></div>
                    <div className='card-percentage'><p>{isNaN(item.percent) ? 'loading..' : item.percent}</p></div>
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
              <tbody>
                <tr>
                  <th>Education</th><th>Province</th><th>Geography</th><th>Target</th><th>Status</th>
                </tr>
                {rows.map((row, pIndex) => (
                  <tr key={pIndex}>
                    <td>{row.Education ? row.Education : "No Qualification"}</td><td>{row.Province}</td><td>{row.Geography}</td><td>{row.Target}</td><td>{row.Target == 1 ? "employed" : "Unemployed"}</td>
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
