import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api/users';

async function safeFetch(url, options) {
  try {
    const res = await fetch(url, options);
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return { error: `Non-JSON response: ${text}` };
    }
  } catch (err) {
    return { error: err.message };
  }
}

async function registerUser(name, email, password, role) {
  return await safeFetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role })
  });
}

async function loginUser(email, password) {
  return await safeFetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
}

async function getUsers(token) {
  return await safeFetch(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

async function getUser(id, token) {
  return await safeFetch(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

async function updateUser(id, token, data) {
  return await safeFetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
}

async function deleteUser(id, token) {
  return await safeFetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
}

async function runTestSuite() {
  console.log('--- STARTING BACKEND TEST SUITE ---\n');

  // 1️⃣ Register Admin & Artist
  const adminEmail = `admin+${Date.now()}@inkconnect.dev`;
  const admin = await registerUser('Test Admin', adminEmail, 'adminpass', 'admin');
  console.log('Registered Admin:', admin);

  const artistEmail = `artist+${Date.now()}@inkconnect.dev`;
  const artist = await registerUser('Test Artist', artistEmail, 'artistpass', 'artist');
  console.log('Registered Artist:', artist);

  // 2️⃣ Login Admin & Artist
  const adminLogin = await loginUser(adminEmail, 'adminpass');
  console.log('Admin Login:', adminLogin.user?.name || adminLogin);

  const artistLogin = await loginUser(artistEmail, 'artistpass');
  console.log('Artist Login:', artistLogin.user?.name || artistLogin);

  const adminToken = adminLogin.token;
  const artistToken = artistLogin.token;

  // 3️⃣ Admin GET all users
  const allUsersAdmin = await getUsers(adminToken);
  console.log('Admin GET /users:', allUsersAdmin);

  // 4️⃣ Artist GET all users (should fail)
  const allUsersArtist = await getUsers(artistToken);
  console.log('Artist GET /users (should fail):', allUsersArtist);

  // 5️⃣ GET single user (any authenticated user)
  const getArtistByAdmin = await getUser(artist.id, adminToken);
  console.log('Admin GET single artist:', getArtistByAdmin);

  const getAdminByArtist = await getUser(admin.id, artistToken);
  console.log('Artist GET admin (own token):', getAdminByArtist);

  // 6️⃣ Update user
  const updatedArtist = await updateUser(artist.id, artistToken, { name: 'Updated Artist' });
  console.log('Artist updates own name:', updatedArtist);

  const updateAdminByArtist = await updateUser(admin.id, artistToken, { name: 'Hacked Admin' });
  console.log('Artist tries to update admin:', updateAdminByArtist);

  // 7️⃣ Delete user
  const deleteArtistByAdmin = await deleteUser(artist.id, adminToken);
  console.log('Admin deletes artist:', deleteArtistByAdmin);

  const deleteAdminByArtist = await deleteUser(admin.id, artistToken);
  console.log('Artist tries to delete admin (should fail):', deleteAdminByArtist);

  console.log('\n--- BACKEND TEST SUITE COMPLETE ---');
}

runTestSuite().catch(console.error);
