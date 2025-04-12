const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const tf = require("@tensorflow/tfjs-node");
const path = require("path");
require("dotenv").config();
const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");

const app = express();
const PORT = 4000;

//middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

let model;
let isModelLoaded = false;

// Model path
const f_name = `/Users/daniel/Desktop/projects/employment_prediction/Server/tfjs_model/model.json`;
const file_path = `file://${f_name}`;

// Function for Loading the model
async function loadModel() {
  try {
    const model = await tf.loadGraphModel(`${file_path}`); //loadGraphModel

    console.log("model is loaded");

    return model;
  } catch (error) {
    console.log(`failed to load tf model - ${error}`);

    throw error;
  }
}

// tf.input({shape: [64,32,1]})
(async () => {
  try {
    // const modelPath = "file://" + path.join(__dirname, "tfjs_model", "model.json");
    // model = await tf.loadLayersModel(modelPath);

    // Loading the model
    model = await loadModel();
    console.log("Model loaded successfully! ", model);
    isModelLoaded = true; // Indicate model is loaded
  } catch (error) {
    console.error("Error loading model:", error);
    isModelLoaded = false; // Set flag to false in case of failure
  }
})();

// Prediction endpoint
app.post("/predict", async (req, res) => {
  if (!isModelLoaded) {
    return res.status(500).json({ error: "Model is not loaded yet." });
  }

  try {
    const inputData = req.body; // Get input JSON from request

    // Convert the input data to an array
    const inputArray = [
      inputData.Tenure,
      inputData.Matric,
      inputData.Degree,
      inputData.Diploma,
      inputData.Schoolquintile,
      inputData.Math,
      inputData.Mathlit,
      inputData.Additional_lang,
      inputData.Home_lang,
      inputData.Science,
      inputData.Female,
      inputData.Birthyear,
      inputData.Birthmonth,
      inputData.Geography_Suburb,
      inputData.Geography_Urban,
      inputData.Geography_nan,
      inputData.Province_Free_State,
      inputData.Province_Gauteng,
      inputData.Province_KwaZuluNatal,
      inputData.Province_Limpopo,
      inputData.Province_Mpumalanga,
      inputData.Province_North_West,
      inputData.Province_Northern_Cape,
      inputData.Province_Western_Cape,
      inputData.Status_wage_employed,
    ];

    // Convert input array to a tensor
    const inputTensor = tf.tensor([inputArray]);

    // Perform prediction
    const prediction = model.predict(inputTensor);
    const output = await prediction.data(); // Extract prediction results

    // Add the predicted target to the response
    inputData.predictedTarget = output[0] > 0.5 ? 1 : 0; // Classification threshold

    res.json(inputData); // Return all data including the prediction
  } catch (error) {
    res
      .status(500)
      .json({ error: "Prediction failed", details: error.toString() });
  }
});

// PostgreSQL Connection
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "prediction_db",
  password: process.env.DB_PASSWORD || "2025",
  port: process.env.DB_PORT || 5432,
});

//get data from google drive
app.get("/get-csv-data", async (req, res) => {
  try {
    const response = await fetch(
      "https://drive.google.com/uc?id=1bs9TrkxSQe_RBK_ATL12-8EQx7YUJluv"
    );
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error("Error fetching CSV data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 🔹 REGISTER USER
app.post("/register", async (req, res) => {
  const { username, email, password, registration_date, role, permission } =
    req.body;

  try {
    // Check if user exists
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password,registration_date, role, permission) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [username, email, hashedPassword, registration_date, role, permission]
    );

    res
      .status(200)
      .json({ message: "User registered successfully", user: newUser.rows[0] });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🔹 LOGIN USER
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
