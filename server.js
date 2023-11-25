// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');  // Import the cors middleware
// const app = express();
// const PORT = 5000;

// // Use cors middleware
// app.use(cors());

// app.use(express.json());

// app.get('/getGoogleDriveFile', async (req, res) => {
//   const fileUrl = req.query.fileUrl;
//   // console.log('Testing..')
//   try {
//     const response = await axios.get(fileUrl);
//     res.send(response.data);
//     // res.json({response:response.data})
//     // console.log('file ', response.data)

//     //console.log('Testing..')
//   } catch (error) {
//     console.error('Error fetching Google Drive file:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//     console.log('error')
//   }
// });
 
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// // console.log('test1')

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());

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
