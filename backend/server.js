const express = require('express');

const connectDB = require('./config/db');

const dotenv = require('dotenv');

const cors = require('cors');

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

