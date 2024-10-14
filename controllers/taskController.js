const Task = require("../models/Task"); // Adjust the path as necessary

// Create a new task
const createTask = async (req, res) => {
  try {
    console.log("Creating task with data:", req.body); // Log the request body

    const { title, description, dueDate, priority } = req.body;

    // Commented out duplicate check for debugging
    // const existingTask = await Task.findOne({ title });
    // if (existingTask) {
    //   return res
    //     .status(400)
    //     .json({ message: "Task with this title already exists." });
    // }

    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      completed: false,
    });

    await newTask.save();
    console.log("Task created successfully:", newTask); // Log created task
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error.message); // Log error message
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks from the database
    console.log("Fetched tasks from database:", tasks); // Log the tasks fetched
    res.status(200).json(tasks); // Return the tasks to the client
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority, completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, dueDate, priority, completed },
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating task", error: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(204).send(); // No content
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
};

// Export the controller functions
module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
