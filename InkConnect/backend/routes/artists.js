const express = require('express');
const router = express.Router();

let artists = [
  { id: 1, name: "AJ", style: "Tattoo" },
  { id: 2, name: "Taylor", style: "Digital Art" },
  { id: 3, name: "Jordan", style: "Illustration" }
];

router.get('/', (req, res) => {
  res.json(artists);
});

module.exports = router;
