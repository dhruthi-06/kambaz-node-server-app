import UsersDao from "./dao.js";

export default function UserRoutes(app, db) {
  const dao = UsersDao(db);   // ⭐ dao MUST be here or signin won't work

  // ------------------ CREATE USER ------------------
  const createUser = (req, res) => {
    const newUser = dao.createUser(req.body);
    req.session.currentUser = newUser;
    res.json(newUser);
  };

  // ------------------ SIGNUP ------------------
  const signup = (req, res) => {
    const { username } = req.body;

    const existing = dao.findUserByUsername(username);
    if (existing) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }

    const newUser = dao.createUser(req.body);
    req.session.currentUser = newUser;

    res.json(newUser);
  };

  // ------------------ SIGNIN ------------------
const signin = (req, res) => {
  console.log("SIGNIN BODY:", req.body);  // 👈 ADD THIS

  const { username, password } = req.body;
  const currentUser = dao.findUserByCredentials(username, password);

  if (currentUser) {
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  } else {
    res.status(401).json({ message: "User not found" });
  }
};

  // ------------------ PROFILE ------------------
  const profile = (req, res) => {
    const currentUser = req.session.currentUser;

    if (!currentUser) {
      res.status(401).json({ message: "Not signed in" });
      return;
    }

    res.json(currentUser);
  };

  // ------------------ UPDATE USER ------------------
  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const updates = req.body;

    dao.updateUser(userId, updates);
    const updatedUser = dao.findUserById(userId);

    req.session.currentUser = updatedUser; // ⭐ sync session
    res.json(updatedUser);
  };

  // ------------------ SIGNOUT ------------------
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  // ------------------ DELETE USER ------------------
  const deleteUser = (req, res) => {
    dao.deleteUser(req.params.userId);
    res.sendStatus(200);
  };

  // ------------------ FIND USERS ------------------
  const findAllUsers = (req, res) => {
    res.json(dao.findAllUsers());
  };

  const findUserById = (req, res) => {
    const user = dao.findUserById(req.params.userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  };

  // ------------------ ROUTES ------------------
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);

  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/profile", profile);
  app.post("/api/users/signout", signout);
}
