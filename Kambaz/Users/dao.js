import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function UsersDao(db) {

  // CREATE USER
  const createUser = (user) => {
    // Strip incoming _id if any
    const { _id, ...userWithoutId } = user;

    const newUser = {
      ...userWithoutId,
      _id: uuidv4(),
    };

    return model.create(newUser);
  };

  const findAllUsers = () => model.find();

  const findUserById = (userId) => model.findById(userId);

  const findUserByUsername = (username) =>
    model.findOne({ username });

  const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });

  const updateUser = (userId, user) =>
    model.updateOne({ _id: userId }, { $set: user });

  const findUsersByRole = (role) => model.find({ role });

  const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i");
    return model.find({
      $or: [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
      ],
    });
  };

  const deleteUser = (userId) => model.findByIdAndDelete(userId);

  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    findUsersByRole,
    findUsersByPartialName,
    deleteUser,
  };
}
