import multer from "multer";
import path from "path";
import HttpError from "../helpers/HttpError.js";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, callback) => {
    const { _id } = req.user;

    const fileName = `${_id}_${file.originalname}`;
    callback(null, fileName);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, callback) => {
  const extension = file.originalname.split(".").pop();

  if (extension === "exe") {
    return callback(HttpError(400, "exe is not allowed"));
  }

  callback(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
