// backend/routes/utils.js
// Utility routes (e.g., file writing)

import express from "express";
import { writeFileContent } from "../utils/fileWriter.js";

const router = express.Router();

// POST /utils/write-file
router.post("/write-file", (req, res) => {
  const { filename, content } = req.body;

  try {
    writeFileContent(filename, content);
    res.json({ status: "File written successfully", filename });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
