import "dotenv/config";
import express from "express";
import cors from "cors";
import openAiRoute from "./routes/openai-route.js";

const PORT = process.env.PORT || 5050;
const { CORS_ORIGIN } = process.env;
const app = express();
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.use("/api/openai", openAiRoute);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
