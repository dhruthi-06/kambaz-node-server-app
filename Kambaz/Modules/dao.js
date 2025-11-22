import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {
  const findModulesForCourse = (courseId) => {
    return db.modules.filter((m) => m.course === courseId);
  };

  const createModule = (module) => {
    const newModule = { ...module, _id: uuidv4() };
    db.modules = [...db.modules, newModule];
    return newModule;
  };

  const deleteModule = (moduleId) => {
    db.modules = db.modules.filter((m) => m._id !== moduleId);
    return true;
  };

  const updateModule = (moduleId, moduleUpdates) => {
    const module = db.modules.find((m) => m._id === moduleId);
    Object.assign(module, moduleUpdates);
    return module;
  };

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}
