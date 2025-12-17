import express from "express";

const router = express.Router();

// Example static items
const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

router.get("/", (req, res) => {
  res.json(items);
});

export default router;
