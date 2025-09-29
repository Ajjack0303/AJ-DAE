// Frontend/main.js
const artistNameEl = document.getElementById('artistName');
const statusEl = document.getElementById('status');
const artistListEl = document.getElementById('artistList');
const portfolioListEl = document.getElementById('portfolioList');

const fetchArtistsBtn = document.getElementById('fetchArtistsBtn');
const fetchPortfolioBtn = document.getElementById('fetchPortfolioBtn');
const uploadBtn = document.getElementById('uploadBtn');

// ✅ New JWT token generated via generateToken.js
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFsaWNlIiwicm9sZSI6ImFydGlzdCIsImlhdCI6MTc1OTE3MDExNiwiZXhwIjoxNzU5MjEzMzE2fQ.65_muoAiteQ6XkdjVBJi7pRUMBucWtw4WuqVuxOm6HE';

// Display a welcome message
artistNameEl.textContent = 'Welcome, InkConnect Artist!';

// Fetch Artists
fetchArtistsBtn.addEventListener('click', async () => {
  try {
    const res = await fetch('http://localhost:3000/api/artists', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch artists');
    const data = await res.json();
    artistListEl.innerHTML = '';
    data.forEach(artist => {
      const li = document.createElement('li');
      li.textContent = `${artist.username} (${artist.email})`;
      artistListEl.appendChild(li);
    });
    statusEl.textContent = 'Artists loaded successfully!';
    statusEl.style.color = 'green';
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Error loading artists.';
    statusEl.style.color = 'red';
  }
});

// Fetch Portfolio
fetchPortfolioBtn.addEventListener('click', async () => {
  try {
    const res = await fetch('http://localhost:3000/api/portfolio', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch portfolio');
    const data = await res.json();
    portfolioListEl.innerHTML = '';
    data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.title} — ${item.description}`;
      portfolioListEl.appendChild(li);
    });
    statusEl.textContent = 'Portfolio loaded successfully!';
    statusEl.style.color = 'green';
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Error loading portfolio.';
    statusEl.style.color = 'red';
  }
});

// Upload Button (Demo)
uploadBtn.addEventListener('click', () => {
  statusEl.textContent = 'Upload simulated (demo).';
  statusEl.style.color = 'blue';
});
