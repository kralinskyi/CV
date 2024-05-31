import express from "express";

import authControllers from "../controllers/authControllers.js";

import {
  userSigninSchema,
  userSignupSchema,
  verifyCheckSchema,
} from "../schemas/usersSchemas.js";

import validateBody from "../decorators/validateBody.js";

import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSignupSchema),
  authControllers.signup
);

authRouter.post(
  "/login",
  validateBody(userSigninSchema),
  authControllers.signin
);

authRouter.get("/current", authenticate, authControllers.getCurrent);
authRouter.post(
  "/verify",
  validateBody(verifyCheckSchema),
  authControllers.resendVerifyEmail
);
authRouter.get("/verify/:verificationToken", authControllers.verifyEmail);
authRouter.post("/logout", authenticate, authControllers.signout);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);

export default authRouter;
