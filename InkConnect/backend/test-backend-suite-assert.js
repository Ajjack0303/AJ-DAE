import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api/users';

async function safeFetch(url, options, retries = 1) {
  try {
    const res = await fetch(url, options);
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return { error: `Non-JSON response: ${text}` };
    }
  } catch (err) {
    if (retries > 0) {
      console.log(`Retrying ${url} due to error: ${err.message}`);
      return safeFetch(url, options, retries - 1);
    }
    return { error: err.message };
  }
}

async function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
  } else {
    console.error(`❌ FAIL: ${message}`);
  }
}

async function registerUser(name, email, password, role) {
  return safeFetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role })
  });
}

async function loginUser(email, password) {
  return safeFetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
}

async function getUsers(token) {
  return safeFetch(BASE_URL, { headers: { Authorization: `Bearer ${token}` } });
}

async function getUser(id, token) {
  return safeFetch(`${BASE_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}

async function updateUser(id, token, data) {
  return safeFetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  });
}

async function deleteUser(id, token) {
  return safeFetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
}

async function runTestSuite() {
  console.log('--- STARTING ASSERTION BACKEND TEST SUITE ---\n');

  const adminEmail = `admin+${Date.now()}@inkconnect.dev`;
  const artistEmail = `artist+${Date.now()}@inkconnect.dev`;

  const admin = await registerUser('Test Admin', adminEmail, 'adminpass', 'admin');
  assert(admin.id, 'Admin registration should succeed');

  const artist = await registerUser('Test Artist', artistEmail, 'artistpass', 'artist');
  assert(artist.id, 'Artist registration should succeed');

  const adminLogin = await loginUser(adminEmail, 'adminpass');
  assert(adminLogin.token, 'Admin login should return JWT');

  const artistLogin = await loginUser(artistEmail, 'artistpass');
  assert(artistLogin.token, 'Artist login should return JWT');

  const adminToken = adminLogin.token;
  const artistToken = artistLogin.token;

  // GET /users
  const allUsersAdmin = await getUsers(adminToken);
  assert(Array.isArray(allUsersAdmin), 'Admin can GET all users');

  const allUsersArtist = await getUsers(artistToken);
  assert(allUsersArtist.error === 'Admin access only', 'Artist cannot GET all users');

  // GET /users/:id
  const singleUser = await getUser(artist.id, adminToken);
  assert(singleUser.id === artist.id, 'Admin can GET single user');

  const artistGetAdmin = await getUser(admin.id, artistToken);
  assert(artistGetAdmin.id === admin.id, 'Artist can GET another user');

  // PUT /users/:id
  const updatedArtist = await updateUser(artist.id, artistToken, { name: 'Updated Artist' });
  assert(updatedArtist.name === 'Updated Artist', 'Artist can update own name');

  const failUpdate = await updateUser(admin.id, artistToken, { name: 'Hacked Admin' });
  assert(failUpdate.error, 'Artist cannot update admin');

  // DELETE /users/:id
  const deleteArtist = await deleteUser(artist.id, adminToken);
  assert(deleteArtist.message === 'User deleted', 'Admin can delete artist');

  const failDelete = await deleteUser(admin.id, artistToken);
  assert(failDelete.error, 'Artist cannot delete admin');

  console.log('\n--- ASSERTION BACKEND TEST SUITE COMPLETE ---');
}

runTestSuite().catch(console.error);
