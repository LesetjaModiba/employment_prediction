const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
//get data from google drive
app.get('/get-csv-data', async (req, res) => {
  try {
    const response = await fetch('https://drive.google.com/uc?id=1bs9TrkxSQe_RBK_ATL12-8EQx7YUJluv');
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error('Error fetching CSV data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
