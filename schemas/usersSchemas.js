import Joi from "joi";

import { emailRegepxp } from "../constants/user-constants.js";

export const userSignupSchema = Joi.object({
  email: Joi.string().pattern(emailRegepxp).required(),
  password: Joi.string().min(6).required(),
}).error((err) => {
  return new Error("Помилка від Joi або іншої бібліотеки валідації");
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegepxp).required(),
  password: Joi.string().min(6).required(),
}).error((err) => {
  return new Error("Помилка від Joi або іншої бібліотеки валідації");
});

export const verifyCheckSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required().messages({
    "any.required": "missing required field email",
    "string.email": "Помилка від Joi або іншої бібліотеки валідації",
  }),
});
