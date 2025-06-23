const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const connectDB = require('./config/db');
const errorMiddleware = require('./Middlewares/ErrorMiddleware');
const cookieParser = require('cookie-parser');
const router = require('./Routes/authRoutes');
const passport = require('passport');
const noteRouter = require('./Routes/noteRoutes'); // Import note 
const profileRouter = require('./Routes/profileRoutes'); // Import profile routes
require('./config/googleStrategy'); // Ensure this is imported to initialize Google Strategy
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: true, // Update to match your frontend port
  credentials: true, // Allow cookies to be sent with requests
}));

app.get('/test', (req, res) => {
  res.send('Welcome to the Note App API');
})
app.use(passport.initialize());
app.use('/api/auth', router);
app.use('/api', noteRouter); // Use noteRouter for all /api routes
app.use('/api', profileRouter); // Use profileRouter for all /api routes
app.use(errorMiddleware);

connectDB();
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
})