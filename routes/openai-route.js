import express from "express";
import { generateResponse } from "../controllers/openai.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const response = await generateResponse(req.body);

    res.send(response);
  } catch (error) {
    res.status(500).json({ error: "Server error generating packing list." });
  }
});

export default router;
