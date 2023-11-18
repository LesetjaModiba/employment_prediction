// src/Components/Accuracy.js
import logo from '../logo.svg';
import info from '../Images/info.png';
import dataset from '../Images/dataset.png';
import accuracy from '../Images/percent.png';
import dashboard from '../Images/dashboard (1).png';
import visual from '../Images/pie-chart.png';
// import province_bar from '../Images/province_bar.png'
import React from 'react';
import '../Style/layout.css';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
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

  


  const data = [10, 25, 15, 30, 20, 32, 34, 35, 12];
  const svgRef = useRef();
  const svgGeoRef = useRef();
  const svgHistRef = useRef();
  const svgboxRef = useRef();

  //Province Bar chart
  useEffect(() => {
    // Clear previous content
    d3.select('.province').selectAll('*').remove();

    // Set up the SVG container
    const svgWidth = 500;
    const svgHeight = 200;
    const margin = { top: 40, right: 20, bottom: 60, left: 60 };

    const svg = d3.select('.province')

      .append('svg')
      .attr('width', svgWidth + margin.left + margin.right)
      .attr('height', svgHeight + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set up the scales
    const xScale = d3.scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, svgWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, 100]) // Assuming the range of percentages is from 0 to 100
      .range([svgHeight, 0]);

    // Draw the bars
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('y', d => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', d => svgHeight - yScale(d))
      .attr('fill', 'steelblue');

    // Add x-axis title
    svg.append('text')
      .attr('class', 'x-axis-title')
      .attr('x', svgWidth / 2)
      .attr('y', svgHeight + margin.top + 20)
      .style('text-anchor', 'middle')
      .text('Provinces in South Africa');

    // Add y-axis title
    svg.append('text')
      .attr('class', 'y-axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('x', 0 - svgHeight / 2)
      .attr('y', 0 - margin.left)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Percentage of province outcome');

    // Add percentages above the bars
    svg.selectAll('.percentage-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'percentage-label')
      .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d) - 5)
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .text(d => `${d}%`);

    // Draw x-axis with province names
    svg.append('g')
      .attr('transform', `translate(0, ${svgHeight})`)
      .call(d3.axisBottom(xScale).tickFormat((d, i) => provinceNames[i]));

    // Draw y-axis
    svg.append('g')
      .call(d3.axisLeft(yScale).ticks(5)); // Adjust the number of ticks as needed
  }, [data]);
  const provinceNames = ['Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape'];

  //Bar graph for Geographical area
  const geoData = [10, 25, 15];
  useEffect(() => {
    // Clear previous content
    d3.select('.geo').selectAll('*').remove();

    // Set up the SVG container
    const svgWidth = 500;
    const svgHeight = 200;
    const margin = { top: 40, right: 20, bottom: 60, left: 60 };

    const svg = d3.select('.geo')
      .append('svg')
      .attr('width', svgWidth + margin.left + margin.right)
      .attr('height', svgHeight + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set up the scales
    const xScale = d3.scaleBand()
      .domain(geoData.map((d, i) => i))
      .range([0, svgWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, 100]) // Assuming the range of percentages is from 0 to 100
      .range([svgHeight, 0]);

    // Draw the bars
    svg.selectAll('rect')
      .data(geoData)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('y', d => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', d => svgHeight - yScale(d))
      .attr('fill', 'steelblue');

    // Add x-axis title
    svg.append('text')
      .attr('class', 'x-axis-title')
      .attr('x', svgWidth / 2)
      .attr('y', svgHeight + margin.top + 20)
      .style('text-anchor', 'middle')
      .text('Geographical Areas');

    // Add y-axis title
    svg.append('text')
      .attr('class', 'y-axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('x', 0 - svgHeight / 2)
      .attr('y', 0 - margin.left)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Percentage');

    // Add percentages above the bars
    svg.selectAll('.percentage-label')
      .data(geoData)
      .enter()
      .append('text')
      .attr('class', 'percentage-label')
      .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d) - 5)
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .text(d => `${d}%`);

    // Draw x-axis with geographical areas
    const geographicalAreas = ['Urban', 'Rural', 'Suburb'];
    svg.append('g')
      .attr('transform', `translate(0, ${svgHeight})`)
      .call(d3.axisBottom(xScale).tickFormat((d, i) => geographicalAreas[i]));

    // Draw y-axis
    svg.append('g')
      .call(d3.axisLeft(yScale).ticks(5)); // Adjust the number of ticks as needed
  }, [data]);


  //Histogram for birth year and target
  useEffect(() => {
    // Clear previous content
    d3.select('.hist').selectAll('*').remove();

    // Example data
    const data = [
      { year: 1970, count0: 20, count1: 30 },
      { year: 1980, count0: 40, count1: 25 },
      { year: 1990, count0: 10, count1: 50 },
      { year: 2000, count0: 30, count1: 40 },
      { year: 2010, count0: 15, count1: 35 },
    ];

    // Set up the SVG container
    const svgWidth = 600;
    const svgHeight = 200;
    const margin = { top: 30, right: 30, bottom: 50, left: 50 };

    const svg = d3.select('.hist') //svgHistRef.current
      .append('svg')
      .attr('width', svgWidth + margin.left + margin.right)
      .attr('height', svgHeight + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Prepare data
    const years = data.map(d => d.year);
    const counts0 = data.map(d => d.count0);
    const counts1 = data.map(d => d.count1);

    // Set up scales
    const xScale = d3.scaleBand()
      .domain(years)
      .range([0, svgWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max([...counts0, ...counts1])])
      .range([svgHeight, 0]);

    // Draw line for count0
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', d3.line()
        .x(d => xScale(d.year) + xScale.bandwidth() / 4)
        .y(d => yScale(d.count0))
      );

    // Draw line for count1
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'orange')
      .attr('stroke-width', 2)
      .attr('d', d3.line()
        .x(d => xScale(d.year) + (3 * xScale.bandwidth()) / 4)
        .y(d => yScale(d.count1))
      );

    // Draw x-axis with title
    svg.append('g')
      .attr('transform', `translate(0, ${svgHeight})`)
      .call(d3.axisBottom(xScale))
      .append('text')
      .attr('x', svgWidth / 2)
      .attr('y', margin.bottom - 10)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Birth Year');

    // Draw y-axis with title
    svg.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', 0 - svgHeight / 2)
      .attr('y', 0 - margin.left)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Count');

  }, []);  // Empty dependency array means this effect will run once on mount

  //Box plot
    useEffect(() => {
      // Clear previous content
      d3.select('.box-plot').selectAll('*').remove();
  
      // Example data
      const data = [
        { year: 1970, values: [180, 190, 200, 210, 220] },
        { year: 1980, values: [185, 195, 205, 215, 225] },
        { year: 1990, values: [190, 200, 210, 220, 230] },
        { year: 2000, values: [195, 205, 215, 225, 235] },
        { year: 2005, values: [200, 210, 220, 230, 240] },
      ];
  
      // Set up the SVG container
      const svgWidth = 600;
      const svgHeight = 200;
      const margin = { top: 30, right: 30, bottom: 50, left: 50 };
  
      const svg = d3.select('.box-plot')
        .append('svg')
        .attr('width', svgWidth + margin.left + margin.right)
        .attr('height', svgHeight + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
  
      // Set up scales
      const xScale = d3.scaleBand()
        .domain(data.map(d => d.year))
        .range([0, svgWidth])
        .padding(0.1);
  
      const yScale = d3.scaleLinear()
        .domain([180, 240])  // Adjust the domain based on your data
        .range([svgHeight, 0]);
  
      // Draw box plot
      svg.selectAll('.box')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'box')
        .attr('x', d => xScale(d.year) + xScale.bandwidth() / 4)
        .attr('y', d => yScale(d3.quantile(d.values, 0.25)))
        .attr('width', xScale.bandwidth() / 2)
        .attr('height', d => yScale(d3.quantile(d.values, 0.75)) - yScale(d3.quantile(d.values, 0.25)))
        .attr('stroke', 'black')
        .attr('fill', 'lightgray');
  
      // Draw median line
      svg.selectAll('.median-line')
        .data(data)
        .enter()
        .append('line')
        .attr('class', 'median-line')
        .attr('x1', d => xScale(d.year) + xScale.bandwidth() / 4)
        .attr('y1', d => yScale(d3.median(d.values)))
        .attr('x2', d => xScale(d.year) + 3 * xScale.bandwidth() / 4)
        .attr('y2', d => yScale(d3.median(d.values)))
        .attr('stroke', 'black');
  
      // Draw whiskers
      svg.selectAll('.whisker')
        .data(data)
        .enter()
        .append('line')
        .attr('class', 'whisker')
        .attr('x1', d => xScale(d.year) + xScale.bandwidth() / 2)
        .attr('y1', d => yScale(d3.min(d.values)))
        .attr('x2', d => xScale(d.year) + xScale.bandwidth() / 2)
        .attr('y2', d => yScale(d3.max(d.values)))
        .attr('stroke', 'black');
  
      // Draw x-axis
      svg.append('g')
        .attr('transform', `translate(0, ${svgHeight})`)
        .call(d3.axisBottom(xScale));
  
      // Draw y-axis
      svg.append('g')
        .call(d3.axisLeft(yScale));
  
      // Add x-axis label
      svg.append('text')
        .attr('x', svgWidth / 2)
        .attr('y', svgHeight + margin.top + 20)
        .style('text-anchor', 'middle')
        .text('Year');
  
      // Add y-axis label
      svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', 0 - svgHeight / 2)
        .attr('y', 0 - margin.left)
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Values');
    }, []);  // Empty dependency array means this effect will run once on mount


  var display = 'province';
  //Filter data on the dropdown
  if (selectedOption.toLocaleLowerCase().trim === 'Bar Chart - Province'.toLocaleLowerCase().trim()) {
    //Change value when dropdown is on 'Province'
    display = 'province';
    items = { heading: 'Province' }
    chartInfo = 'In the training data, candidates from the Western Cape are the most likely to get a positive outcome, while those from the North West province are least likely.';
    console.log(display)
  }
  if (selectedOption.toLocaleLowerCase().trim() === 'Histogram'.toLocaleLowerCase().trim()) {
    //Change value when dropdown is on 'Hist'
    display = 'hist';
    items = { heading: 'Histogram' }
    chartInfo = 'The ages of candidates with a positive outcome and those with a negative outcome seem to follow a similar distribution.';
    console.log(display)
  }
  if (selectedOption.toLocaleLowerCase().trim() === 'Bar Chart - Geography'.toLocaleLowerCase().trim()) {
    //Change value when dropdown is on 'Geo'
    display = 'geo'
    items = { heading: 'Bar Chart - Geography' }
    chartInfo = 'We see that people from "Urban" areas are most likely to get a positive outcome.';
    console.log(display)
  } 
  if (selectedOption.toLocaleLowerCase().trim() === 'Box Plot'.toLocaleLowerCase().trim()) {
    //Change value when dropdown is on 'box plot'
    display = 'box-plot'
    items = { heading: 'Box Plot' }
    chartInfo = 'The presence of many points below the first quartile suggests a left-skewed skewed distribution, with many outliers on the lower end. To get more details, we can use the pandas.DataFrame.describe() function..';
    console.log(display)
  } 
  
  var [imgURL,setImageURL] = useState('')


  useEffect(() => {
    // Replace 'YOUR_FILE_ID' with the actual file ID from your Google Drive
    const fileId = 'https://drive.google.com/file/d/1-P8Apec084SEc7x9MwX0PoS4cyxFEfo0/view?usp=drive_link';
    const clientId = '794003993201-uff34hnkefdicv11g4kdtako4jbm73di.apps.googleusercontent.com';
    const apiKey = 'AIzaSyD6h8g14NpALf-E2FNtzBzij2YWjkzdsZU';

    // Google Drive API endpoint
    const endpoint = `https://www.googleapis.com/drive/v3/files/${fileId}?key=${apiKey}`;

    // Fetch the image details from Google Drive
    fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${clientId}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Get the thumbnail link or download link depending on your requirements
        const thumbnailLink = data.thumbnailLink;
        const downloadLink = data.webContentLink;

        // Set the image URL to be displayed
        setImageURL(downloadLink || thumbnailLink);
        console.log('url', imgURL)
      })
      .catch((error) => {
        console.error('Error fetching image:', error);
      });
  }, []);

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
              <div className='card' style={{ width: '800px', height: '400px' }}>
                <div className='card-header'><p>{items.heading}</p></div>

                <div><div style={{ margin: '30px' }} className={display}></div></div>
                {/* <div><img src={imgURL} alt="Logo" style={{height:'350px',width:'680px', marginLeft:'62px'}}/></div> */}

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
