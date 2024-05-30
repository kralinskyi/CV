import { User } from "../models/user.js";

export const signup = async (data) => {
  return await User.create(data);
};

export const findUser = async (filter) => {
  return await User.findOne(filter);
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const updateUser = async (filter, data) => {
  return await User.findOneAndUpdate(filter, data, {
    returnDocument: "after",
  }).select("email subscription token");
};
