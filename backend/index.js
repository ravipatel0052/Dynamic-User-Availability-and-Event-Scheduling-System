const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./models/User");
const PORT = 4000;

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB

mongoose.connect('mongodb://localhost:27017/userlog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



// Route: Register
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.json({ error_message: "User already exists!" });
    }
    
    const newUser = new User({ username, email, password });
    await newUser.save();
    
    res.json({ message: "Account created successfully!" });
  } catch (err) {
    res.status(500).json({ error_message: "Server error" });
  }
});

// Route: Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.json({ error_message: "Incorrect credentials" });
    }
    
    res.json({
      message: "Login successfully",
      data: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error_message: "Server error" });
  }
});

// Route: Create Schedule
app.post("/schedule/create", async (req, res) => {
  const { userId, timezone, schedule } = req.body;
  
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ error_message: "User not found" });
    }
    
    user.timezone = timezone;
    user.schedule = schedule;
    await user.save();
    
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ error_message: "Server error" });
  }
});

// Route: Get Schedule by User ID
app.get("/schedules/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.json({ error_message: "User not found" });
    }
    
    res.json({
      message: "Schedules successfully retrieved!",
      schedules: user.schedule,
      username: user.username,
      timezone: user.timezone,
    });
  } catch (err) {
    res.status(500).json({ error_message: "Server error" });
  }
});

// Route: Get Schedule by Username
app.post("/schedules/:username", async (req, res) => {
  const { username } = req.params;
  
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ error_message: "User doesn't exist" });
    }
    
    const filteredArray = user.schedule.filter(sch => sch.startTime !== "");
    res.json({
      message: "Schedules successfully retrieved!",
      schedules: filteredArray,
      timezone: user.timezone,
      receiverEmail: user.email,
    });
  } catch (err) {
    res.status(500).json({ error_message: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
