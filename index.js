const express = require("express");
const server = express();

// Initial Data
const PROJECTS = [];

const MyMiddleware = (req, res, next) => {
  console.log("123");
  next();
};

// Built-in middleware to parse incoming requests with JSON payloads.
server.use(express.json());
// Custom middlewares
server.use((req, res, next) => MyMiddleware(req, res, next));

//POST - Create a Project
server.post("/projects/", (req, res) => {
  // Get post parameters
  const { id, title } = req.body;

  // Set project
  const project = {
    id: id,
    title: title,
    tasks: []
  };
  // Add new project
  PROJECTS.push(project);

  return res.json(project);
});

// Listen to the port 3000
server.listen(3000);
