#!/bin/bash

API_URL="http://localhost:5000/api"
TOKEN=""

echo "===================="
echo "Login Admin User"
echo "===================="

# Login and capture token
LOGIN_RESPONSE=$(curl -s -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@inkconnect.dev","password":"test123"}')

echo $LOGIN_RESPONSE | jq .

# Extract token
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
  echo "Login failed, cannot proceed with further tests."
  exit 1
fi

echo "Token obtained: $TOKEN"

echo "===================="
echo "Get All Artists"
echo "===================="

curl -s -H "Authorization: Bearer $TOKEN" $API_URL/artists | jq .

echo "===================="
echo "Get Artist by ID (1)"
echo "===================="

curl -s -H "Authorization: Bearer $TOKEN" $API_URL/artists/1 | jq .

echo "===================="
echo "Create New Artist"
echo "===================="

CREATE_ARTIST_RESPONSE=$(curl -s -X POST $API_URL/artists \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"New Artist","email":"new@inkconnect.dev"}')

echo $CREATE_ARTIST_RESPONSE | jq .

# Capture new artist ID
ARTIST_ID=$(echo $CREATE_ARTIST_RESPONSE | jq -r '.id')

echo "===================="
echo "Update Artist ($ARTIST_ID)"
echo "===================="

curl -s -X PUT $API_URL/artists/$ARTIST_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"bio":"Updated bio"}' | jq .

echo "===================="
echo "Delete Artist ($ARTIST_ID)"
echo "===================="

curl -s -X DELETE $API_URL/artists/$ARTIST_ID \
  -H "Authorization: Bearer $TOKEN" | jq .

echo "===================="
echo "Get All Portfolios"
echo "===================="

curl -s -H "Authorization: Bearer $TOKEN" $API_URL/portfolios | jq .

echo "===================="
echo "Create Portfolio (linked to Admin Artist)"
echo "===================="

# Admin artist ID (from seeding)
ADMIN_ARTIST_ID=1

curl -s -X POST $API_URL/portfolios \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Admin Portfolio\",\"description\":\"Sample portfolio\",\"artistId\":$ADMIN_ARTIST_ID}" | jq .

echo "===================="
echo "Get All Bookings"
echo "===================="

curl -s -H "Authorization: Bearer $TOKEN" $API_URL/bookings | jq .

echo "===================="
echo "Create Booking (linked to Admin Artist)"
echo "===================="

curl -s -X POST $API_URL/bookings \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"artistId\":$ADMIN_ARTIST_ID,\"clientName\":\"Client One\",\"date\":\"2025-12-10\",\"status\":\"pending\"}" | jq .

echo "===================="
echo "Get All Payments"
echo "===================="

curl -s -H "Authorization: Bearer $TOKEN" $API_URL/payments | jq .

echo "===================="
echo "Create Payment (linked to Booking ID 1)"
echo "===================="

curl -s -X POST $API_URL/payments \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"artistId\":$ADMIN_ARTIST_ID,\"bookingId\":1,\"amount\":150,\"status\":\"paid\"}" | jq .

echo "===================="
echo "All Done!"
echo "===================="
