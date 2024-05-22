import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import gravatar from "gravatar";
import Jimp from "jimp";
import path from "path";
import fs from "fs/promises";

import * as authServices from "../services/authServices.js";

const { JWT_SECRET } = process.env;

const avatarsPath = path.resolve("public", "avatars");

const generateToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await authServices.findUser({ email });

  if (existingUser) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await authServices.signup({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({ user: newUser });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw HttpError(401, "Email or password is invalid");
  }

  const token = generateToken(user._id);
  await authServices.updateUser({ _id: user._id }, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
};

const signout = async (req, res) => {
  await authServices.updateUser({ _id: req.user._id }, { token: "" });

  res.status(204).json();
};

const updateAvatar = async (req, res) => {
  if (!req.file) throw HttpError(400, "The file was not found");

  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const image = await Jimp.read(tempUpload);
  await image.resize(250, 250).writeAsync(tempUpload);

  const uniquePrefix = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsPath, uniquePrefix);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", uniquePrefix);

  await authServices.updateUser({ _id }, { avatarURL });

  res.json({ avatarURL });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
