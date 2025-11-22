import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  const findEnrollmentsForUser = (userId) => {
    return db.enrollments.filter((e) => e.user === userId);
  };

  const enrollUserInCourse = (userId, courseId) => {
    const exists = db.enrollments.find(
      (e) => e.user === userId && e.course === courseId
    );
    if (exists) return exists;

    const newEn = { _id: uuidv4(), user: userId, course: courseId };
    db.enrollments.push(newEn);
    return newEn;
  };

  const unenrollUserFromCourse = (userId, courseId) => {
    db.enrollments = db.enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
    return true;
  };

  return {
    findEnrollmentsForUser,
    enrollUserInCourse,
    unenrollUserFromCourse,
  };
}
