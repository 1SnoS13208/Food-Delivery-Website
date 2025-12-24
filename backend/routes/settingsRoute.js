import express from "express";
import { getSettings, updateSettings } from "../controllers/settingsController.js";

const settingsRoute = express.Router();

settingsRoute.get("/get", getSettings);
settingsRoute.post("/update", updateSettings);

export default settingsRoute;