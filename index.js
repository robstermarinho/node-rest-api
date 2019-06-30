const express = require("express");
const server = express();
const PROJECTS = [];
const CONFIG = {
  number_of_requests: 0
};

// Custom Middleware to check if the project exists
const CheckProjectIDExists = (req, res, next) => {
  const { id } = req.params;
  if (!PROJECTS[id]) {
    return res.status(400).json({
      error: "Project id does not exist."
    });
  }
  return next();
};

const CheckNewProjectExists = (req, res, next) => {
  const { id } = req.body;
  if (PROJECTS[id]) {
    return res.status(400).json({
      error: `Project id ${id} already exists.`
    });
  }
  return next();
};

// Built-in middleware to parse incoming requests with JSON payloads.
server.use(express.json());
// Custom Global Middleware
server.use((request, response, next) => {
  CONFIG.number_of_requests += 1;
  //Log the requessts
  console.log(
    `REQUEST ${CONFIG.number_of_requests}: ${request.method} - ${request.url}`
  );
  //Continue the next request
  next();
});

// GET - Listing all projects
server.get("/projects/", (req, res) => {
  return res.json(PROJECTS);
});

//POST - Create a Project
server.post("/projects/", CheckNewProjectExists, (req, res) => {
  // Get post parameters
  const { id, title } = req.body;

  // Set project
  const project = {
    id: id,
    title: title,
    tasks: []
  };

  PROJECTS[id] = project;
  return res.json(project);
});

// PUT - Update Title - Change project title
server.put("/projects/:id/", CheckProjectIDExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  PROJECTS[id].title = title;
  return res.json(PROJECTS[id]);
});

server.delete("/projects/:id/", CheckProjectIDExists, (req, res) => {
  const { id } = req.params;
  PROJECTS.splice(id, 1);
  return res.json(PROJECTS);
});

server.post("/projects/:id/tasks/", CheckProjectIDExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  PROJECTS[id].tasks.push(title);
  return res.json(PROJECTS[id]);
});

// Listen to the port 3000
server.listen(3000);
