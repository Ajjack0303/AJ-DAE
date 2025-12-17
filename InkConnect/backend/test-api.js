// backend/test-api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/users';

async function runTests() {
  try {
    // --- Admin Login ---
    const loginRes = await axios.post(`${BASE_URL}/login`, {
      email: 'admin@inkconnect.dev',
      password: 'testpassword',
    });
    const adminToken = loginRes.data.token;
    console.log('Admin Login:', loginRes.data);

    // --- Create Unique Test User ---
    const timestamp = Date.now();
    const newUserRes = await axios.post(
      `${BASE_URL}/register`,
      {
        name: 'Test User',
        email: `testuser+${timestamp}@inkconnect.dev`,
        password: 'testpassword',
        role: 'artist',
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    const testUser = newUserRes.data;
    console.log('Created User:', testUser);

    // --- Get All Users ---
    const usersRes = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log('All Users:', usersRes.data);

    // --- Update Test User ---
    const updatedRes = await axios.put(
      `${BASE_URL}/${testUser.id}`,
      { name: 'Updated Test User' },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    console.log('Updated User:', updatedRes.data);

    // --- Delete Test User ---
    const deleteRes = await axios.delete(`${BASE_URL}/${testUser.id}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log('Deleted User:', deleteRes.data);

  } catch (error) {
    if (error.response) {
      console.error('Error Response:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

runTests();
