import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";

import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";

const app = express();

// ⭐ MUST COME FIRST
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL || "http://localhost:3000",
}));

// ⭐ SESSION SETUP (must be before routes)
app.use(session({
  secret: process.env.SESSION_SECRET || "kambaz-secret",
  resave: false,
  saveUninitialized: false,
}));

// ⭐ JSON parser
app.use(express.json());

// ⭐ ROUTES
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db); 
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app, db); 
Hello(app);
Lab5(app);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server running on port 4000");
});
