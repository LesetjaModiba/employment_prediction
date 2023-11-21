// const express = require('express');
// const axios = require('axios');
// const app = express();
// const PORT = 5000;

// app.use(express.json());

// app.get('/getGoogleDriveFile', async (req, res) => {
//   const fileUrl = req.query.fileUrl;
//   try {
//     const response = await axios.get(fileUrl);
//     res.send(response.data);
//   } catch (error) {
//     console.error('Error fetching Google Drive file:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const axios = require('axios');
const cors = require('cors');  // Import the cors middleware
const app = express();
const PORT = 5000;

// Use cors middleware
app.use(cors());

app.use(express.json());

app.get('/getGoogleDriveFile', async (req, res) => {
  const fileUrl = req.query.fileUrl;
  try {
    const response = await axios.get(fileUrl);
    res.send(response.data);
    console.log('file ', response.data)
  } catch (error) {
    console.error('Error fetching Google Drive file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
