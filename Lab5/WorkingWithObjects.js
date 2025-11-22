let assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

let moduleObj = {
  id: "m101",
  name: "Intro to Node",
  description: "Basics of Node.js and Express",
  course: "CS5610",
};

export default function WorkingWithObjects(app) {

  // -----------------------------
  // ASSIGNMENT ROUTES
  // -----------------------------
  const getAssignment = (req, res) => {
    res.json(assignment);
  };

  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };

  const setAssignmentTitle = (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  };

  const setAssignmentScore = (req, res) => {
    const { score } = req.params;
    assignment.score = Number(score);
    res.json(assignment);
  };

  const setAssignmentCompleted = (req, res) => {
    const { completed } = req.params;
    assignment.completed = completed === "true";
    res.json(assignment);
  };

  app.get("/lab5/assignment", getAssignment);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
  app.get("/lab5/assignment/score/:score", setAssignmentScore);
  app.get("/lab5/assignment/completed/:completed", setAssignmentCompleted);


  // -----------------------------
  // MODULE ROUTES
  // -----------------------------
  const getModule = (req, res) => {
    res.json(moduleObj);
  };

  const getModuleName = (req, res) => {
    res.json(moduleObj.name);
  };

  const setModuleName = (req, res) => {
    const { newName } = req.params;
    moduleObj.name = newName;
    res.json(moduleObj);
  };

  const setModuleDescription = (req, res) => {
    const { desc } = req.params;    // FIXED PARAM NAME
    moduleObj.description = desc;
    res.json(moduleObj);
  };

  app.get("/lab5/module", getModule);
  app.get("/lab5/module/name", getModuleName);
  app.get("/lab5/module/name/:newName", setModuleName);
  app.get("/lab5/module/description/:desc", setModuleDescription);
}
