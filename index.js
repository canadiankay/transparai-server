import express from "express";
const app = express();
import "dotenv/config";
import cors from "cors";

app.use(express.json());

app.use(cors());
const { CORS_ORIGIN } = process.env.CORS_ORIGIN;
app.use(cors({ origin: CORS_ORIGIN }));

const PORT = process.env.PORT || 5050;

app.get("/", (req, res) => {
  res.send("Welcome to our industry project API!");
});

app.listen(PORT, () => {
  console.log(`Im listening on port ${PORT}`);
});
