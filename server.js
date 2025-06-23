import express from "express";
import dotenv from "dotenv";
import weatherRoute from "./routes/weather.js";
import { weatherLimiter } from "./utils/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/weather", weatherLimiter, weatherRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
