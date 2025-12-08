import { v4 as uuidv4 } from "uuid";
import CourseModel from "../Courses/model.js";

export default function ModulesDao(db) {

  // Retrieve all modules embedded inside a course
  async function findModulesForCourse(courseId) {
    const course = await CourseModel.findById(courseId);
    if (!course) {
      throw new Error(`Course not found: ${courseId}`);
    }
    return course.modules;
  }

  // Insert a new module into the course.modules array
  async function createModule(courseId, module) {
    const newModule = { ...module, _id: uuidv4() };

    await CourseModel.updateOne(
      { _id: courseId },
      { $push: { modules: newModule } }
    );

    return newModule;
  }

  // Remove a module from the embedded modules array
  async function deleteModule(courseId, moduleId) {
    const status = await CourseModel.updateOne(
      { _id: courseId },
      { $pull: { modules: { _id: moduleId } } }
    );
    return status;
  }

  // Update a module embedded inside the course document
  async function updateModule(courseId, moduleId, moduleUpdates) {
    const course = await CourseModel.findById(courseId);
    if (!course) {
      throw new Error(`Course not found: ${courseId}`);
    }

    const foundModule = course.modules.id(moduleId);
    if (!foundModule) {
      throw new Error(`Module not found: ${moduleId}`);
    }

    Object.assign(foundModule, moduleUpdates);
    await course.save();
    return foundModule;
  }

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}
