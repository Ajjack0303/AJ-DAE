import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api/users';

async function safeFetch(url, options) {
  try {
    const res = await fetch(url, options);
    const text = await res.text(); // get raw text first
    try {
      return JSON.parse(text); // attempt to parse JSON
    } catch {
      return { error: `Non-JSON response: ${text}` };
    }
  } catch (err) {
    return { error: err.message };
  }
}

async function main() {
  // 1️⃣ Register a new artist user
  const registerData = await safeFetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test User',
      email: `testuser+${Date.now()}@inkconnect.dev`,
      password: 'testpassword',
      role: 'artist'
    })
  });
  console.log('Registered User:', registerData);

  // 2️⃣ Login as Admin
  const loginData = await safeFetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@inkconnect.dev',
      password: 'testpassword'
    })
  });

  if (loginData.error) {
    console.error('Admin Login Failed:', loginData.error);
    return;
  }

  const adminToken = loginData.token;
  console.log('Admin Logged In:', loginData.user);

  // 3️⃣ GET all users (admin only)
  const users = await safeFetch(BASE_URL, {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  console.log('All Users (admin only):', users);

  // 4️⃣ GET single user (authenticated user)
  const getUser = await safeFetch(`${BASE_URL}/${registerData.id}`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  console.log('Single User Fetch:', getUser);

  // 5️⃣ Update user (authenticated user)
  const updatedUser = await safeFetch(`${BASE_URL}/${registerData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}` // can also test with the user's own token
    },
    body: JSON.stringify({ name: 'Updated Test User' })
  });
  console.log('Updated User:', updatedUser);

  // 6️⃣ Delete user (admin only)
  const deleteResult = await safeFetch(`${BASE_URL}/${registerData.id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  console.log('Deleted User:', deleteResult);

  // 7️⃣ Test non-admin access to GET all users
  const nonAdminLogin = await safeFetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: registerData.email,
      password: 'testpassword'
    })
  });

  const userToken = nonAdminLogin.token;
  const forbiddenAccess = await safeFetch(BASE_URL, {
    headers: { Authorization: `Bearer ${userToken}` }
  });
  console.log('Non-admin GET /users attempt:', forbiddenAccess);
}

main().catch(console.error);
