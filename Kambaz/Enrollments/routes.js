import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  // --- ENROLL a user into a course ---
  const enrollUserInCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);

    const { courseId } = req.params;

    const enrollment = await dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(enrollment);
  };

  // --- UNENROLL a user ---
  const unenrollUserFromCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);

    const { courseId } = req.params;

    const status = await dao.unenrollUserFromCourse(currentUser._id, courseId);
    res.json(status);
  };

  // --- FIND ENROLLMENTS FOR USER ---
  const findEnrollmentsForUser = async (req, res) => {
    let { userId } = req.params;

    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) return res.sendStatus(401);
      userId = currentUser._id;
    }

    const enrollments = await dao.findCoursesForUser(userId);
    res.json(enrollments);
  };

  // --- FIND ENROLLMENTS FOR COURSE ---
  const findEnrollmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const users = await dao.findUsersForCourse(courseId);
    res.json(users);
  };

  // --- REGISTER ROUTES ---
  app.post("/api/courses/:courseId/enrollments", enrollUserInCourse);
  app.delete("/api/courses/:courseId/enrollments", unenrollUserFromCourse);

  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.get("/api/courses/:courseId/enrollments", findEnrollmentsForCourse);
}
