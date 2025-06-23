import express from "express";
import redisClient from "../cache.js";
import { fetchWeatherFromAPI } from "../services/weatherService.js";

const router = express.Router();

router.get("/:city", async (req, res) => {
  const city = req.params.city.toLowerCase();
  const cacheKey = `weather:${city}`;

  try {
    // Try getting cached data
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.json({ source: "cache", data: JSON.parse(cached) });
    }

    // Fetch from API
    const data = await fetchWeatherFromAPI(city);

    // Store in Redis for 12 hours (43200 seconds)
    await redisClient.setEx(cacheKey, 43200, JSON.stringify(data));

    return res.json({ source: "api", data });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

export default router;
