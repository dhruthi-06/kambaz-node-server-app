// Lab5/WorkingWithArrays.js

let todos = [
  { id: 1, title: "Task 1", description: "desc 1", completed: false },
  { id: 2, title: "Task 2", description: "desc 2", completed: true },
  { id: 3, title: "Task 3", description: "desc 3", completed: false },
];

export default function WorkingWithArrays(app) {
  // ---------------------------------------------------------
  // GET ALL TODOS  /lab5/todos
  // ---------------------------------------------------------
  const getTodos = (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const want = completed === "true";
      return res.json(todos.filter((t) => t.completed === want));
    }
    res.json(todos);
  };

  // ---------------------------------------------------------
  // GET TODO BY ID /lab5/todos/:id
  // ---------------------------------------------------------
  const getTodoById = (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((t) => t.id === id);
    res.json(todo);
  };

  // ---------------------------------------------------------
  // OLD CREATE ROUTE (GET) /lab5/todos/create
  // ---------------------------------------------------------
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

  // ---------------------------------------------------------
  // OLD DELETE ROUTE (GET) /lab5/todos/:id/delete
  // ---------------------------------------------------------
  const removeTodo = (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex((t) => t.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
    }
    res.json(todos);
  };

  // ---------------------------------------------------------
  // OLD UPDATE ROUTES (GET)
  // ---------------------------------------------------------
  const updateTodoTitle = (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) todo.title = title;
    res.json(todos);
  };

  const updateTodoDescription = (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) todo.description = description;
    res.json(todos);
  };

  const updateTodoCompleted = (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) todo.completed = completed === "true";
    res.json(todos);
  };

  // =========================================================
  // NEW ROUTES (REQUIRED BY LAB 5)
  // =========================================================

  // ---------------------------------------------------------
  // NEW CREATE ROUTE (POST) /lab5/todos
  // ---------------------------------------------------------
  const postNewTodo = (req, res) => {
    const newTodo = { ...req.body, id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo);
  };

  // ---------------------------------------------------------
  // NEW DELETE ROUTE (DELETE) /lab5/todos/:id
  // ---------------------------------------------------------
  const deleteTodo = (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === parseInt(id));

    if (index === -1) {
      return res
        .status(404)
        .json({ message: `Unable to delete Todo with ID ${id}` });
    }

    todos.splice(index, 1);
    res.sendStatus(200);
  };

  // ---------------------------------------------------------
  // NEW UPDATE ROUTE (PUT) /lab5/todos/:id
  // ---------------------------------------------------------
  const updateTodo = (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === parseInt(id));

    if (index === -1) {
      return res
        .status(404)
        .json({ message: `Unable to update Todo with ID ${id}` });
    }

    todos = todos.map((t) =>
      t.id === parseInt(id) ? { ...t, ...req.body } : t
    );

    res.sendStatus(200);
  };

  // =========================================================
  // ROUTES (ORDER MATTERS)
  // =========================================================

  // -------- OLD GET ROUTES (KEEP) --------
  app.get("/lab5/todos", getTodos);
  app.get("/lab5/todos/create", createNewTodo);
  app.get("/lab5/todos/:id/delete", removeTodo);
  app.get("/lab5/todos/:id/title/:title", updateTodoTitle);
  app.get("/lab5/todos/:id/description/:description", updateTodoDescription);
  app.get("/lab5/todos/:id/completed/:completed", updateTodoCompleted);
  app.get("/lab5/todos/:id", getTodoById);

  // -------- NEW POST / PUT / DELETE ROUTES --------
  app.post("/lab5/todos", postNewTodo);
  app.delete("/lab5/todos/:id", deleteTodo);
  app.put("/lab5/todos/:id", updateTodo);
}
