// controllers/artistsController.js
let dummyArtists = [
  { id: 1, name: 'Ayla Nomura', genre: 'Pop' },
  { id: 2, name: 'John Doe', genre: 'Rock' }
];

module.exports = {
  getArtists: (req, res) => res.json({ artists: dummyArtists })
};
