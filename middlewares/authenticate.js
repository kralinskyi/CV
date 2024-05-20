import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { findUser } from "../services/authServices.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw HttpError(401, "Authorization header not found");

    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") throw HttpError(401, "Invalid token format");

    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await findUser({ _id: id });

    if (!user) throw HttpError(401, "Not authorized");

    if (user.token !== token) throw HttpError(401, "Invalid token");

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(HttpError(401, "Invalid token"));
    }
    if (error.name === "TokenExpiredError") {
      return next(HttpError(401, "Token expired"));
    }
    next(HttpError(401, error.message));
  }
};

export default authenticate;
