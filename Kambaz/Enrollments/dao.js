import model from "./model.js";

export default function EnrollmentsDao(db) {
  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((e) => e.course);
  }

  async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((e) => e.user);
  }

 async function enrollUserInCourse(userId, courseId) {
  return model.updateOne(
    { user: userId, course: courseId },
    {
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    },
    { upsert: true }  // 👈 prevents duplicate key crash
  );
}


  function unenrollUserFromCourse(userId, courseId) {
    return model.deleteOne({ user: userId, course: courseId });
  }

  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  return {
    findCoursesForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse
  };
}
