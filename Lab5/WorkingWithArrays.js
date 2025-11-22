// Lab5/WorkingWithArrays.js

let todos = [
  { id: 1, title: "Task 1", description: "desc 1", completed: false },
  { id: 2, title: "Task 2", description: "desc 2", completed: true },
  { id: 3, title: "Task 3", description: "desc 3", completed: false },
];

export default function WorkingWithArrays(app) {
  // ----------------------------
  // GET ALL TODOS / FILTERED
  // ----------------------------
  const getTodos = (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const want = completed === "true";
      return res.json(todos.filter((t) => t.completed === want));
    }
    res.json(todos);
  };

  // ----------------------------
  // GET TODO BY ID
  // ----------------------------
  const getTodoById = (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((t) => t.id === id);
    res.json(todo);
  };

  // ----------------------------
  // CREATE NEW TODO (GET)
  // ----------------------------
  const createNewTodo = (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Todo",
      description: "",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  };

  // ----------------------------
  // DELETE TODO (GET)
  // ----------------------------
  const removeTodo = (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex((t) => t.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
    }
    res.json(todos);
  };

  // ----------------------------
  // UPDATE TITLE (GET)
  // ----------------------------
  const updateTodoTitle = (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) todo.title = title;
    res.json(todos);
  };

  // ----------------------------
  // UPDATE DESCRIPTION (GET)
  // ----------------------------
  const updateTodoDescription = (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) todo.description = description;
    res.json(todos);
  };

  // ----------------------------
  // UPDATE COMPLETED (GET)
  // ----------------------------
  const updateTodoCompleted = (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) todo.completed = completed === "true";
    res.json(todos);
  };

  // ----------------------------
  // ROUTES (ORDER MATTERS)
  // ----------------------------
  app.get("/lab5/todos", getTodos);
  app.get("/lab5/todos/create", createNewTodo);
  app.get("/lab5/todos/:id/delete", removeTodo);
  app.get("/lab5/todos/:id/title/:title", updateTodoTitle);
  app.get("/lab5/todos/:id/description/:description", updateTodoDescription);
  app.get("/lab5/todos/:id/completed/:completed", updateTodoCompleted);
  app.get("/lab5/todos/:id", getTodoById);
}
