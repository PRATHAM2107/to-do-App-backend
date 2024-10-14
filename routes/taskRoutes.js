const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController"); // Adjust the path as necessary

const router = express.Router();

// GET all tasks
router.get("/", getTasks); // Changed from "/tasks" to "/" for cleaner URL

// POST a new task
router.post("/", createTask); // Changed from "/tasks" to "/" for cleaner URL

// PUT to update a task by ID
router.put("/:id", updateTask); // Changed from "/tasks/:id" to "/:id" for cleaner URL

// DELETE a task by ID
router.delete("/:id", deleteTask); // Changed from "/tasks/:id" to "/:id" for cleaner URL

module.exports = router;
