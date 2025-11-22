import { v4 as uuidv4 } from "uuid";

export default function CoursesDao(db) {



  const findAllCourses = () => {
    return db.courses;
  };

  const findCoursesForEnrolledUser = (userId) => {
    const { courses, enrollments } = db;
    return courses.filter((course) =>
      enrollments.some(
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
    return true;
  };

  const updateCourse = (courseId, updates) => {
    db.courses = db.courses.map((c) =>
      c._id === courseId ? { ...c, ...updates } : c
    );
    return db.courses.find((c) => c._id === courseId);
  };

  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}
