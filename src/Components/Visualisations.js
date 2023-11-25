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


function Visualisations() {

  //Set the color for the current menu option
  var optionColor = { color: '#49EB59' }

  //Declare Variables
  const [selectedOption, setSelectedOption] = useState('');

  //Initial value when dropdown is on 'Classification report'
  var items = { heading: 'Bar Chart - Province' };
  var chartInfo = 'In the training data, candidates from the Western Cape are the most likely to get a positive outcome, while those from the North West province are least likely.';
  // var title = 'Bar Chart - Provnce'
  // Bar Chart - Geoography
  // Box Plot
  //On change function for the dropdown
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    console.log(`Selected option: ${selectedValue}`);
  };


  var display = 'province';
  var fileUrl = "https://drive.google.com/file/d/1-P8Apec084SEc7x9MwX0PoS4cyxFEfo0/preview";
  //Filter data on the dropdown
  if (selectedOption.toLocaleLowerCase().trim === 'Bar Chart - Province'.toLocaleLowerCase().trim()) {
    //Change value when dropdown is on 'Province'
    fileUrl = "https://drive.google.com/file/d/1-P8Apec084SEc7x9MwX0PoS4cyxFEfo0/preview";
    display = 'province';
    items = { heading: 'Province' }
    chartInfo = 'In the training data, candidates from the Western Cape are the most likely to get a positive outcome, while those from the North West province are least likely.';
    console.log(display)
  }
  if (selectedOption.toLocaleLowerCase().trim() === 'Histogram'.toLocaleLowerCase().trim()) {
    //Change value when dropdown is on 'Hist'
    fileUrl="https://drive.google.com/file/d/1iv-uUMxsOXdLt2Zo9GOibF7zOONbw4eS/preview";
    display = 'hist';
    items = { heading: 'Histogram' }
    chartInfo = 'The ages of candidates with a positive outcome and those with a negative outcome seem to follow a similar distribution.';
    console.log(display)
  }
  if (selectedOption.toLocaleLowerCase().trim() === 'Bar Chart - Geography'.toLocaleLowerCase().trim()) {
    //Change value when dropdown is on 'Geo'
    fileUrl = "https://drive.google.com/file/d/1-9Bi7FOEpJYAXsVOLyqpA9-zeWc-hHQb/preview";
    display = 'geo'
    items = { heading: 'Bar Chart - Geography' }
    chartInfo = 'We see that people from "Urban" areas are most likely to get a positive outcome.';
    console.log(display)
  }
  if (selectedOption.toLocaleLowerCase().trim() === 'Box Plot'.toLocaleLowerCase().trim()) {
    //Change value when dropdown is on 'box plot'
    fileUrl = "https://drive.google.com/file/d/1-6SSFIMRxg0mACO35hxLRLYN0jog4OgB/preview";
    display = 'box-plot'
    items = { heading: 'Box Plot' }
    chartInfo = 'The presence of many points below the first quartile suggests a left-skewed skewed distribution, with many outliers on the lower end. To get more details, we can use the pandas.DataFrame.describe() function..';
    console.log(display)
  }



  // useEffect(() => {
  //   // Replace 'YOUR_FILE_ID' with the actual file ID from your Google Drive
  //   //const fileId = '1-P8Apec084SEc7x9MwX0PoS4cyxFEfo0';
  //   //const clientId = '794003993201-uff34hnkefdicv11g4kdtako4jbm73di.apps.googleusercontent.com';
  //   //const apiKey = 'AIzaSyD6h8g14NpALf-E2FNtzBzij2YWjkzdsZU';
  //   const clien_secret_File = "";
  //   const api_name = "";
  //   const api_version = "v3";
  //   const scope = "";


  //   // Google Drive API endpoint
  //   // const endpoint = `https://www.googleapis.com/drive/v3/files/${fileId}?key=${apiKey}`;
  //   // console.log(endpoint)

  //   // // Fetch the image details from Google Drive
  //   // fetch(endpoint, {
  //   //   headers: {
  //   //     Authorization: `Bearer ${clientId}`,
  //   //   },
  //   // })
  //   //   .then((response) => response.json())
  //   //   .then((data) => {
  //   //     // Get the thumbnail link or download link depending on your requirements
  //   //     const thumbnailLink = data.thumbnailLink;
  //   //     const downloadLink = data.webContentLink;

  //   //     // Set the image URL to be displayed
  //   //     setImageURL(downloadLink || thumbnailLink);
  //   //     console.log('url', imageURL)
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error('Error fetching image:', error);
  //   //   });
  // }, []);


  // const [imageURL, setImageURL] = useState('');


  // useEffect(() => {
  //   const fetchGoogleDriveFile = async () => {
  //     const fileUrl = "https://drive.google.com/file/d/1-P8Apec084SEc7x9MwX0PoS4cyxFEfo0/view";
  //     const serverUrl = 'http://localhost:5000/getGoogleDriveFile';

  //     try {
  //       const response = await axios.get(serverUrl, { params: { fileUrl } });
  //       setImageURL(response.data);
  //       console.log('url ',imageURL)
  //     } catch (error) {
  //       console.error('Error fetching Google Drive file:', error);
  //     }
  //   };

  //   fetchGoogleDriveFile();
  // }, []);

    return (
      <div className="layout">
        <div className="left-panel">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
            <h1 className="system-name">Employment</h1>
          </div>
          <div className="menu-options">
            <div style={{ display: 'flex', alignItems: 'center' }}><img src={dashboard} alt="dashboard" className="menu-icon" /><a href="/">Dashboard</a></div>
            <div style={{ display: 'flex', alignItems: 'center' }}><img src={accuracy} alt="accuracy" className="menu-icon" /><a href="/accuracy">Accuracy</a></div>
            <div style={{ display: 'flex', alignItems: 'center' }}><img src={visual} alt="visual" className="menu-icon" /><a href="/visualisations" style={optionColor}>Visualisations</a></div>
            <div style={{ display: 'flex', alignItems: 'center' }}><img src={dataset} alt="dataset" className="menu-icon" /><a href="/dataset">Dataset</a></div>
          </div>
        </div>
        <div className="right-panel">
          <div className="header">
            <div className='top-left'>
              <h3>Visualisations</h3>
            </div>
            <div className="top-right">
              {/* Dropdown */}
              <select value={selectedOption} onChange={handleChange}>
                <option value="Bar Chart - Province">Bar Chart - Province</option>
                <option value="Bar Chart - Geography">Bar Chart - Geography</option>
                <option value="Histogram">Histogram</option>
                <option value="Box Plot">Box Plot</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <div className='card-container-accuracy' style={{ width: '1200px', height: '640px', overflow: 'auto' }}>
              <div className='card-container' style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <div className='card' style={{ width: '800px', height: '400px','display':'flex','justifyContent':'center','flexDirection':'column' }}>
                  <div className='card-header'><p>{items.heading}</p></div>

                  <iframe src={fileUrl} width="640" height="345" allow="autoplay" style={{'marginLeft':'auto', 'marginRight':'auto'}}></iframe>
                  {/* <button onClick={uploadFile()} >save file to drive</button> */}
                </div>
              </div>
              <div className='model-info' style={{ marginLeft: 'auto', marginRight: 'auto', width: '600px' }}>
                <img src={info} alt="info" className="logo" />
                <p style={{ margin: '0' }}>{chartInfo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  export default Visualisations;
