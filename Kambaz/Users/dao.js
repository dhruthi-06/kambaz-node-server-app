import { v4 as uuidv4 } from "uuid";

export default function UsersDao(db) {

  // Always reference the REAL array
  const getUsers = () => db.users;

  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    db.users.push(newUser);             // write directly to db.users
    return newUser;
  };

  const findAllUsers = () => db.users;

  const findUserById = (userId) =>
    db.users.find((u) => u._id === userId);

  const findUserByUsername = (username) =>
    db.users.find((u) => u.username === username);

  const findUserByCredentials = (username, password) =>
    db.users.find(
      (u) => u.username === username && u.password === password
    );

  const updateUser = (userId, updates) => {
    const index = db.users.findIndex((u) => u._id === userId);

    if (index === -1) return null;

    db.users[index] = {
      ...db.users[index],
      ...updates,
    };

    return db.users[index];
  };

  const deleteUser = (userId) => {
    db.users = db.users.filter((u) => u._id !== userId);
    return true;
  };

  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
  };
}
