import { v4 as uuidv4 } from "uuid";

export default function CoursesDao(db) {
  const findAllCourses = () => db.courses;

  const findCoursesForEnrolledUser = (userId) => {
    return db.courses.filter((course) =>
      db.enrollments.some(
        (en) => en.user === userId && en.course === course._id
      )
    );
  };

  const createCourse = (course) => {
    const newCourse = { ...course, _id: uuidv4() };
    db.courses.push(newCourse);
    return newCourse;
  };

  const deleteCourse = (courseId) => {
    db.courses = db.courses.filter((c) => c._id !== courseId);
    db.enrollments = db.enrollments.filter((e) => e.course !== courseId);
    return true;
  };

  const updateCourse = (courseId, updates) => {
    const course = db.courses.find((c) => c._id === courseId);
    Object.assign(course, updates);
    return course;
  };

  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}
