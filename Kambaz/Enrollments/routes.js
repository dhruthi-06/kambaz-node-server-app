import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  app.get("/api/users/:userId/enrollments", (req, res) => {
    const { userId } = req.params;
    res.json(dao.findEnrollmentsForUser(userId));
  });

  // ⭐ enroll in course
  app.post("/api/users/:userId/enrollments/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    const newEnroll = dao.enrollUserInCourse(userId, courseId);
    res.json(newEnroll);
  });

  // ⭐ unenroll from course
  app.delete("/api/users/:userId/enrollments/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    const status = dao.unenrollUserFromCourse(userId, courseId);
    res.json(status);
  });
}
