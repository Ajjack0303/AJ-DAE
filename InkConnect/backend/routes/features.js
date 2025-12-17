import express from "express";
import prisma from "../prisma/client.js";

const router = express.Router();

// GET /features
router.get("/", async (req, res) => {
  try {
    const features = await prisma.feature.findMany();
    res.json(features);
  } catch (error) {
    console.error("Error fetching features:", error);
    res.status(500).json({ error: "Failed to fetch features" });
  }
});

export default router;
