const express = require('express');
const router = express.Router();

let portfolio = [
  { id: 1, title: "Dragon Tattoo", description: "Full sleeve dragon tattoo design" },
  { id: 2, title: "Abstract Portrait", description: "Digital portrait with abstract elements" },
  { id: 3, title: "Graffiti Mural", description: "Street art mural project" }
];

router.get('/', (req, res) => {
  res.json(portfolio);
});

router.post('/upload', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) return res.status(400).json({ message: "Missing title or description" });

  const newProject = { id: portfolio.length + 1, title, description };
  portfolio.push(newProject);
  res.json({ message: "Project uploaded successfully!", project: newProject });
});

module.exports = router;
