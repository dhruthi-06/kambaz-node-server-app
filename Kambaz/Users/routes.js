import UsersDao from "./dao.js";

export default function UserRoutes(app, db) {
  const dao = UsersDao(db);

  // ---------- SIGNIN ----------
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);

    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  // ---------- SIGNUP ----------
  const signup = async (req, res) => {
    const existing = await dao.findUserByUsername(req.body.username);
    if (existing) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }

    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  // ---------- PROFILE ----------
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  // ---------- SIGNOUT ----------
  const signout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  // ---------- FIND ALL USERS (with filters) ----------
  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;

    if (role) return res.json(await dao.findUsersByRole(role));
    if (name) return res.json(await dao.findUsersByPartialName(name));

    const users = await dao.findAllUsers();
    res.json(users);
  };

  // ---------- FIND USER BY ID ----------
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    if (user) res.json(user);
    else res.status(404).json({ message: "User not found" });
  };

  // ---------- CREATE USER ----------
  const createUser = async (req, res) => {
    const newUser = await dao.createUser(req.body);
    res.json(newUser);
  };

  // ---------- UPDATE USER ----------
  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const updates = req.body;

    await dao.updateUser(userId, updates);
    const updatedUser = await dao.findUserById(userId);

    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = updatedUser;
    }

    res.json(updatedUser);
  };

  // ---------- DELETE USER ----------
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  app.post("/api/users", createUser);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);

  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.post("/api/users", createUser);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
}
