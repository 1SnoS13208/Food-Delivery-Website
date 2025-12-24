import express from "express";
import { addCategory, listCategory, removeCategory } from "../controllers/categoryController.js";
import multer from "multer";

const categoryRoute = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

categoryRoute.post("/add", upload.single("image"), addCategory);
categoryRoute.get("/list", listCategory);
categoryRoute.post("/remove", removeCategory);

export default categoryRoute;