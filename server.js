require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/Task"); // Import the Task model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // For parsing application/json

// Connect to MongoDB using the connection string from environment variables
const connectionString = process.env.MONGO_URI; // Use environment variable for connection string

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// API Endpoints

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks from the database
    res.json(tasks); // Return tasks as JSON
  } catch (err) {
    console.error("Error fetching tasks:", err); // Log error details
    res.status(500).json({ message: err.message }); // Return error message
  }
});

// Add a new task
app.post("/tasks", async (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  // Log the request payload for debugging
  console.log("Received payload:", req.body);

  const newTask = new Task({
    title,
    description,
    dueDate,
    priority,
    completed: false, // Include completed in the task creation
  });

  try {
    const savedTask = await newTask.save(); // Save new task to the database
    res.status(201).json(savedTask); // Return saved task as JSON
  } catch (err) {
    console.error("Error saving task:", err); // Log the error
    res.status(400).json({ message: err.message }); // Return error message
  }
});

// Update a task
app.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated task
    });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" }); // Handle task not found
    }
    res.json(updatedTask); // Return updated task as JSON
  } catch (err) {
    console.error("Error updating task:", err); // Log error details
    res.status(400).json({ message: err.message }); // Return error message
  }
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id); // Delete task by ID
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" }); // Handle task not found
    }
    res.status(204).send(); // No content to return
  } catch (err) {
    console.error("Error deleting task:", err); // Log error details
    res.status(400).json({ message: err.message }); // Return error message
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
