const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // change this if your MySQL username is different
  password: '', // change this if your MySQL password is different
  database: 'dashtap',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Route to handle driver registration
app.post('/api/drivers', (req, res) => {
  const {
    firstName,
    lastName,
    email,
    mobileNumber,
    address,
    drivingLicenseNumber,
    userNic,
    gender,
    language,
    townsNearYou,
    vehicleClasses,
    hasDrivingExperience,
    yearsOfExperience,
  } = req.body;

  const sql = `INSERT INTO drivers (first_name, last_name, email, mobile_number, address, driving_license_number, user_nic, gender, language, towns_near_you, vehicle_classes, has_driving_experience, years_of_experience) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  db.query(sql, [firstName, lastName, email, mobileNumber, address, drivingLicenseNumber, userNic, gender, language, townsNearYou.join(', '), JSON.stringify(vehicleClasses), hasDrivingExperience, yearsOfExperience], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database insertion failed' });
    }
    res.status(201).json({ message: 'Driver registered successfully', driverId: results.insertId });
  });
});

// Server listening
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});