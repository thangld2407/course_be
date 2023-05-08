import multer from "multer";
import _ from "lodash";
import path from "path";
import { ACCEPTED_TYPES } from "@/constant/acceptType";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../assets/uploads"));
  },
  filename: (req, file, cb) => {
    const extFile = path.extname(file.originalname);
    let currentDate = new Date().getTime();
    let randomFileName = _.random(100000);

    const fileName = `uploads-${randomFileName}-${currentDate}${extFile}`;
    cb(null, fileName);
  },

  fileFilter: (req, file, cb) => {
    // accepted document types pdf, doc, docx,
    if (ACCEPTED_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
