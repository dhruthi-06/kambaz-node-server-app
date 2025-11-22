import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {

  const findAssignmentsForCourse = (courseId) => {
    return db.assignments.filter((a) => a.course === courseId);
  };

  const createAssignment = (assignment) => {
    const newAssignment = { ...assignment, _id: uuidv4() };
    db.assignments.push(newAssignment);
    return newAssignment;
  };

  const deleteAssignment = (assignmentId) => {
    db.assignments = db.assignments.filter((a) => a._id !== assignmentId);
    return true;
  };

  const updateAssignment = (assignmentId, updates) => {
    const found = db.assignments.find((a) => a._id === assignmentId);
    if (found) {
      Object.assign(found, updates);
      return found;
    }
    return null;
  };

  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}
