#!/usr/bin/env bash
# Tests /api/chat with the exact body format DefaultChatTransport sends.
# Usage: ./test-chat.sh [url]
# Loops until a streaming text response is received or 10 attempts fail.

URL="${1:-https://humane-constitution.vercel.app}/api/chat"
MAX=10

# UIMessage format sent by DefaultChatTransport (v6)
BODY=$(cat <<'EOF'
{
  "id": "test-chat-id",
  "messages": [
    {
      "id": "msg-1",
      "role": "user",
      "parts": [{ "type": "text", "text": "What is the Twelve Pillar Protocol?" }],
      "metadata": {}
    }
  ],
  "trigger": "submit-message",
  "messageId": "msg-1"
}
EOF
)

for i in $(seq 1 $MAX); do
  echo "--- attempt $i/$MAX ---"
  RESPONSE=$(curl -s -X POST "$URL" \
    -H "Content-Type: application/json" \
    -d "$BODY" \
    --max-time 30 2>&1)

  if echo "$RESPONSE" | grep -q '"type":"text-delta"'; then
    echo "✅ PASS — streaming text received"
    echo "$RESPONSE" | grep '"delta"' | head -3
    exit 0
  fi

  echo "❌ Response:"
  echo "$RESPONSE" | head -10
  echo ""

  if [ $i -lt $MAX ]; then
    echo "waiting 5s before retry..."
    sleep 5
  fi
done

echo "❌ FAILED after $MAX attempts"
exit 1
