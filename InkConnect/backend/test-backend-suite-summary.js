import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api/users';

const results = [];

async function safeFetch(url, options, retries = 1) {
  try {
    const res = await fetch(url, options);
    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = { error: `Non-JSON response: ${text}`, status: res.status };
    }
    json.status = res.status;
    return json;
  } catch (err) {
    if (retries > 0) return safeFetch(url, options, retries - 1);
    return { error: err.message };
  }
}

async function addResult(route, expected, actual, status) {
  results.push({ route, expected, actual, status });
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
  console.log('--- STARTING BACKEND TEST SUITE ---\n');

  const adminEmail = `admin+${Date.now()}@inkconnect.dev`;
  const artistEmail = `artist+${Date.now()}@inkconnect.dev`;

  const admin = await registerUser('Test Admin', adminEmail, 'adminpass', 'admin');
  const artist = await registerUser('Test Artist', artistEmail, 'artistpass', 'artist');

  const adminLogin = await loginUser(adminEmail, 'adminpass');
  const artistLogin = await loginUser(artistEmail, 'artistpass');

  const adminToken = adminLogin.token;
  const artistToken = artistLogin.token;

  // GET /users
  let res = await getUsers(adminToken);
  await addResult('GET /users (admin)', 'Allowed', res.error ? 'Denied' : 'Allowed', res.status);

  res = await getUsers(artistToken);
  await addResult('GET /users (artist)', 'Denied', res.error ? 'Denied' : 'Allowed', res.status);

  // GET /users/:id
  res = await getUser(artist.id, adminToken);
  await addResult(`GET /users/${artist.id} (admin)`, 'Allowed', res.error ? 'Denied' : 'Allowed', res.status);

  res = await getUser(admin.id, artistToken);
  await addResult(`GET /users/${admin.id} (artist)`, 'Allowed', res.error ? 'Denied' : 'Allowed', res.status);

  // PUT /users/:id
  res = await updateUser(artist.id, artistToken, { name: 'Updated Artist' });
  await addResult(`PUT /users/${artist.id} (artist)`, 'Allowed', res.error ? 'Denied' : 'Allowed', res.status);

  res = await updateUser(admin.id, artistToken, { name: 'Hacked Admin' });
  await addResult(`PUT /users/${admin.id} (artist)`, 'Denied', res.error ? 'Denied' : 'Allowed', res.status);

  // DELETE /users/:id
  res = await deleteUser(artist.id, adminToken);
  await addResult(`DELETE /users/${artist.id} (admin)`, 'Allowed', res.error ? 'Denied' : 'Allowed', res.status);

  res = await deleteUser(admin.id, artistToken);
  await addResult(`DELETE /users/${admin.id} (artist)`, 'Denied', res.error ? 'Denied' : 'Allowed', res.status);

  // Print summary
  console.log('\n--- TEST SUMMARY ---');
  console.table(results.map(r => ({
    Route: r.route,
    Expected: r.expected,
    Result: r.actual,
    Status: r.status
  })));

  console.log('\n--- TEST SUITE COMPLETE ---');
}

runTestSuite().catch(console.error);
