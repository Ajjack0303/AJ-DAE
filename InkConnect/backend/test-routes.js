import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api/users';

async function main() {
  // 1️⃣ Register a new artist user
  const registerRes = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test User',
      email: `testuser+${Date.now()}@inkconnect.dev`,
      password: 'testpassword',
      role: 'artist'
    })
  });
  const newUser = await registerRes.json();
  console.log('Registered User:', newUser);

  // 2️⃣ Login as Admin
  const loginRes = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@inkconnect.dev',
      password: 'testpassword'
    })
  });
  const loginData = await loginRes.json();
  const adminToken = loginData.token;
  console.log('Admin Login:', loginData.user);

  // 3️⃣ Test GET all users (admin only)
  const usersRes = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  const users = await usersRes.json();
  console.log('All Users:', users);

  // 4️⃣ Test PUT user (authenticated user)
  const updateRes = await fetch(`${BASE_URL}/${newUser.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}` // you can also test with the user's own token
    },
    body: JSON.stringify({ name: 'Updated Test User' })
  });
  const updatedUser = await updateRes.json();
  console.log('Updated User:', updatedUser);

  // 5️⃣ Test DELETE user (admin only)
  const deleteRes = await fetch(`${BASE_URL}/${newUser.id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  const deleteResult = await deleteRes.json();
  console.log('Deleted User:', deleteResult);
}

main().catch(console.error);
