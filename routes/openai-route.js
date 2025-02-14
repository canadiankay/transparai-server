import express from "express";
import { processUserData } from "../controllers/data-controller.js";

const router = express.Router();

router.post("/", processUserData);

export default router;