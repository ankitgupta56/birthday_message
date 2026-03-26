#!/bin/bash
# ===== Database Management Script =====
# Run API commands to manage your birthday website database

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:5000"

echo -e "${BLUE}🎁 Birthday Website Database Manager${NC}"
echo "========================================"

# Check if server is running
check_server() {
    if curl -s "$BASE_URL/api/visits" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Server is running on $BASE_URL${NC}"
        return 0
    else
        echo -e "${YELLOW}⚠️ Server doesn't seem to be running on $BASE_URL${NC}"
        echo "Start it with: npm start"
        return 1
    fi
}

# Initialize with sample data
init_data() {
    echo -e "${BLUE}Initializing database with sample data...${NC}"
    curl -s "$BASE_URL/api/init-data" | grep -q success && \
        echo -e "${GREEN}✅ Database initialized!${NC}" || \
        echo -e "${YELLOW}Database already has data or already initialized${NC}"
}

# Get all love notes
get_love_notes() {
    echo -e "${BLUE}📝 All Love Notes:${NC}"
    curl -s "$BASE_URL/api/lovenotes" | python3 -m json.tool 2>/dev/null || \
    curl -s "$BASE_URL/api/lovenotes"
}

# Get random love note
get_random_note() {
    echo -e "${BLUE}❤️ Random Love Note:${NC}"
    curl -s "$BASE_URL/api/lovenote" | python3 -m json.tool 2>/dev/null || \
    curl -s "$BASE_URL/api/lovenote"
}

# Add a love note
add_love_note() {
    if [ -z "$1" ]; then
        echo "Usage: add_love_note 'Your message here' [emoji]"
        return
    fi

    local message="$1"
    local emoji="${2:-❤️}"

    echo -e "${BLUE}Adding love note...${NC}"
    curl -s -X POST "$BASE_URL/api/lovenote" \
        -H "Content-Type: application/json" \
        -d "{\"message\":\"$message\",\"emoji\":\"$emoji\"}" | \
        python3 -m json.tool 2>/dev/null || echo "Done"
}

# Get visit count
get_visits() {
    echo -e "${BLUE}👁️ Visit Count:${NC}"
    curl -s "$BASE_URL/api/visits"
}

# Get all memories
get_memories() {
    echo -e "${BLUE}📸 All Memories:${NC}"
    curl -s "$BASE_URL/api/memories" | python3 -m json.tool 2>/dev/null || \
    curl -s "$BASE_URL/api/memories"
}

# Add a memory
add_memory() {
    if [ -z "$1" ] || [ -z "$2" ]; then
        echo "Usage: add_memory 'Title' 'Message' [emoji]"
        return
    fi

    local title="$1"
    local message="$2"
    local image="${3:-📷}"

    echo -e "${BLUE}Adding memory...${NC}"
    curl -s -X POST "$BASE_URL/api/memory" \
        -H "Content-Type: application/json" \
        -d "{\"title\":\"$title\",\"message\":\"$message\",\"image\":\"$image\"}" | \
        python3 -m json.tool 2>/dev/null || echo "Done"
}

# Get all messages
get_messages() {
    echo -e "${BLUE}💌 All Messages:${NC}"
    curl -s "$BASE_URL/api/messages" | python3 -m json.tool 2>/dev/null || \
    curl -s "$BASE_URL/api/messages"
}

# Add a message
add_message() {
    if [ -z "$1" ]; then
        echo "Usage: add_message 'Your message here' [emoji]"
        return
    fi

    local message="$1"
    local emoji="${2:-💌}"

    echo -e "${BLUE}Adding message...${NC}"
    curl -s -X POST "$BASE_URL/api/message" \
        -H "Content-Type: application/json" \
        -d "{\"message\":\"$message\",\"emoji\":\"$emoji\"}" | \
        python3 -m json.tool 2>/dev/null || echo "Done"
}

# Get secret message
get_secret() {
    echo -e "${BLUE}🎁 Random Secret Message:${NC}"
    curl -s "$BASE_URL/api/secret" | python3 -m json.tool 2>/dev/null || \
    curl -s "$BASE_URL/api/secret"
}

# Add a secret message
add_secret() {
    if [ -z "$1" ]; then
        echo "Usage: add_secret 'Your secret message' [emoji]"
        return
    fi

    local message="$1"
    local emoji="${2:-🎁}"

    echo -e "${BLUE}Adding secret message...${NC}"
    curl -s -X POST "$BASE_URL/api/secret" \
        -H "Content-Type: application/json" \
        -d "{\"message\":\"$message\",\"emoji\":\"$emoji\"}" | \
        python3 -m json.tool 2>/dev/null || echo "Done"
}

# Display menu
show_menu() {
    echo ""
    echo -e "${YELLOW}Commands:${NC}"
    echo "  check                           - Check if server is running"
    echo "  init                            - Initialize database with sample data"
    echo "  notes                           - Get all love notes"
    echo "  random                          - Get random love note"
    echo "  add-note 'message' [emoji]      - Add a love note"
    echo "  visits                          - Get visit count"
    echo "  memories                        - Get all memories"
    echo "  add-memory 'title' 'msg' [emoji] - Add a memory"
    echo "  messages                        - Get all messages"
    echo "  add-msg 'message' [emoji]       - Add a message"
    echo "  secret                          - Get random secret"
    echo "  add-secret 'message' [emoji]    - Add a secret message"
    echo "  menu                            - Show this menu"
    echo ""
}

# Main
check_server || exit 1
show_menu

# Process commands
case "$1" in
    check) check_server ;;
    init) init_data ;;
    notes) get_love_notes ;;
    random) get_random_note ;;
    add-note) add_love_note "$2" "$3" ;;
    visits) get_visits ;;
    memories) get_memories ;;
    add-memory) add_memory "$2" "$3" "$4" ;;
    messages) get_messages ;;
    add-msg) add_message "$2" "$3" ;;
    secret) get_secret ;;
    add-secret) add_secret "$2" "$3" ;;
    menu) show_menu ;;
    *)
        if [ -n "$1" ]; then
            echo -e "${YELLOW}Unknown command: $1${NC}"
        fi
        show_menu
        ;;
esac
