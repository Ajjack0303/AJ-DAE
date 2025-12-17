/* =========================================================
   InkConnect Backend Test Suite (ESM / Node 20 Compatible)
   ========================================================= */

import 'dotenv/config';
import fetch from 'node-fetch';
import colors from 'colors/safe.js';

/* -------------------- ENV VALIDATION -------------------- */

const REQUIRED_ENV = [
  'PORT',
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD',
  'ARTIST_EMAIL',
  'ARTIST_PASSWORD',
];

for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    console.error(colors.red(`❌ Missing required env var: ${key}`));
    process.exit(1);
  }
}

const PORT = process.env.PORT;
const BASE_URL = 'http://localhost:5000';

/* -------------------- HELPERS -------------------- */

const log = {
  info: (msg) => console.log(colors.cyan(msg)),
  success: (msg) => console.log(colors.green(msg)),
  warn: (msg) => console.log(colors.yellow(msg)),
  error: (msg) => console.log(colors.red(msg)),
};

async function loginUser(email, password, roleLabel) {
  log.info(`🔐 Logging in ${roleLabel}...`);

  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `${roleLabel} login failed (${res.status}): ${text}`
    );
  }

  const data = await res.json();

  if (!data.token) {
    throw new Error(`${roleLabel} login response missing token`);
  }

  log.success(`✅ ${roleLabel} authenticated`);
  return data.token;
}

async function testProtectedRoute(name, url, token) {
  log.info(`🔎 Testing ${name}`);

  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${name} failed (${res.status}): ${text}`);
  }

  log.success(`✅ ${name} OK`);
}

/* -------------------- TEST RUNNER -------------------- */

(async () => {
  try {
    console.log(colors.magenta('\n--- STARTING BACKEND TEST SUITE ---\n'));

    /* ---------- AUTH ---------- */

    const adminToken = await loginUser(
      process.env.ADMIN_EMAIL,
      process.env.ADMIN_PASSWORD,
      'ADMIN'
    );

    const artistToken = await loginUser(
      process.env.ARTIST_EMAIL,
      process.env.ARTIST_PASSWORD,
      'ARTIST'
    );

    /* ---------- PROTECTED ROUTES ---------- */

    await testProtectedRoute(
      'Admin: Get All Users',
      '/api/users',
      adminToken
    );

    await testProtectedRoute(
      'Artist: Get Own Profile',
      '/api/artists/me',
      artistToken
    );

    console.log(colors.green('\n🎉 ALL TESTS PASSED SUCCESSFULLY\n'));
  } catch (err) {
    console.error(colors.red('\n❌ TEST SUITE FAILED'));
    console.error(colors.red(err.message));
    process.exit(1);
  }
})();
