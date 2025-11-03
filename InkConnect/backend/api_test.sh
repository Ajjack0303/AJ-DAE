#!/bin/bash
# api_test.sh — Automated API testing for InkConnect backend
# Works on macOS zsh without jq

# -----------------------------
# CONFIG
# -----------------------------
BASE_URL="http://localhost:3000/api"
EMAIL="test@example.com"
PASSWORD="password123"
NEW_USER_EMAIL="newuser@example.com"
NEW_USER_PASSWORD="newpass"

# -----------------------------
# LOGIN
# -----------------------------
echo "Logging in as $EMAIL..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

# Extract token using sed
TOKEN=$(echo "$LOGIN_RESPONSE" | sed -E 's/.*"token":"([^"]+)".*/\1/')

if [ -z "$TOKEN" ]; then
  echo "❌ Login failed. Response: $LOGIN_RESPONSE"
  exit 1
else
  echo "✅ Logged in successfully. Token captured."
fi

# -----------------------------
# REGISTER NEW USER (PROTECTED)
# -----------------------------
echo "Registering new user: $NEW_USER_EMAIL..."
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$NEW_USER_EMAIL\",\"password\":\"$NEW_USER_PASSWORD\"}")

echo "Register response: $REGISTER_RESPONSE"

# -----------------------------
# FETCH ARTISTS (PROTECTED)
# -----------------------------
echo "Fetching all artists..."
ARTISTS_RESPONSE=$(curl -s -X GET "$BASE_URL/artists" \
  -H "Authorization: Bearer $TOKEN")

echo "Artists response: $ARTISTS_RESPONSE"

# -----------------------------
# FETCH BOOKINGS (PROTECTED)
# -----------------------------
echo "Fetching all bookings..."
BOOKINGS_RESPONSE=$(curl -s -X GET "$BASE_URL/bookings" \
  -H "Authorization: Bearer $TOKEN")

echo "Bookings response: $BOOKINGS_RESPONSE"

# -----------------------------
# CREATE BOOKING (PROTECTED)
# -----------------------------
echo "Creating a new booking..."
NEW_BOOKING_RESPONSE=$(curl -s -X POST "$BASE_URL/bookings" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"artistId":1,"date":"2025-11-10"}')

echo "New booking response: $NEW_BOOKING_RESPONSE"

# -----------------------------
# UPDATE BOOKING (PROTECTED)
# -----------------------------
echo "Updating booking ID 1..."
UPDATE_BOOKING_RESPONSE=$(curl -s -X PUT "$BASE_URL/bookings/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"date":"2025-11-15"}')

echo "Update booking response: $UPDATE_BOOKING_RESPONSE"

# -----------------------------
# DELETE BOOKING (PROTECTED)
# -----------------------------
echo "Deleting booking ID 2..."
DELETE_BOOKING_RESPONSE=$(curl -s -X DELETE "$BASE_URL/bookings/2" \
  -H "Authorization: Bearer $TOKEN")

echo "Delete booking response: $DELETE_BOOKING_RESPONSE"

# -----------------------------
# DONE
# -----------------------------
echo "✅ API test script completed."
