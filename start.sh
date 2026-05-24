#!/bin/bash
# Start both BookLearn servers

echo "📚 Starting BookLearn..."

# Start Express server
cd server && node index.js &
SERVER_PID=$!
echo "✅ API server running on http://localhost:3001 (PID $SERVER_PID)"

# Start Vite dev server
cd ../client && npm run dev -- --port 5173 &
CLIENT_PID=$!
echo "✅ App running on http://localhost:5173 (PID $CLIENT_PID)"

echo ""
echo "Open http://localhost:5173 in your browser"
echo "Press Ctrl+C to stop both servers"

# Wait and clean up on exit
trap "kill $SERVER_PID $CLIENT_PID 2>/dev/null; echo 'Servers stopped.'" EXIT
wait
