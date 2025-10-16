#!/bin/zsh

# Path to local Node
NODE_BIN="$HOME/Desktop/InkConnect_Portable/node/bin/node"
NPM_BIN="$HOME/Desktop/InkConnect_Portable/node/bin/npm"

# Check if Node exists
if [ ! -f "$NODE_BIN" ]; then
  echo "❌ Node.js not found in $NODE_BIN"
  echo "Please make sure Node is extracted to the node/bin folder."
  exit 1
fi

echo "✅ Node.js found: $($NODE_BIN -v)"
echo "✅ npm found: $($NPM_BIN -v)"

# Start backend
if [ -d "$HOME/Desktop/InkConnect_Portable/backend" ]; then
  echo "Starting backend..."
  cd "$HOME/Desktop/InkConnect_Portable/backend" || exit 1
  "$NODE_BIN" server.js >> "$HOME/Desktop/InkConnect_Portable/backend.log" 2>&1 &
  echo "Backend started."
else
  echo "❌ Backend folder not found at ~/Desktop/InkConnect_Portable/backend"
fi

# Start frontend
if [ -d "$HOME/Desktop/InkConnect_Portable/Frontend" ]; then
  echo "Starting frontend..."
  cd "$HOME/Desktop/InkConnect_Portable/Frontend" || exit 1
  "$NPM_BIN" run start >> "$HOME/Desktop/InkConnect_Portable/frontend.log" 2>&1 &
  echo "Frontend started."
else
  echo "❌ Frontend folder not found at ~/Desktop/InkConnect_Portable/Frontend"
fi

echo "🎉 InkConnect is running!"
