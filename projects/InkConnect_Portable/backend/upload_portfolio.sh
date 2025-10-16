#!/bin/zsh

# --- Artist login ---
echo "Logging in as artist..."
ARTIST_LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3000/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"inkmaster","password":"testpass1"}')

# Extract token using jq
ARTIST_TOKEN=$(echo $ARTIST_LOGIN_RESPONSE | jq -r '.token')

echo "Token retrieved: $ARTIST_TOKEN"

# --- Upload portfolio image ---
echo "Uploading portfolio..."
curl -X POST http://localhost:3000/portfolio \
  -H "Authorization: Bearer $ARTIST_TOKEN" \
  -F "title=My Tattoo Work" \
  -F "image=@/Users/ajjackson/Desktop/AJ-DAE/InkConnect/backend/test-image.jpg"

echo "\nPortfolio upload complete."
