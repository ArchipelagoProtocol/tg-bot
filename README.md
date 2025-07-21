# Telegram Bot
## 🚀 Features

### 📚 Knowledge Base Features
- `/use <code>` - Connect to knowledge base
- `/unlink <code>` - Disconnect from knowledge base
- Ask directly - Answer questions based on the knowledge base

### 📢 Broadcast Features
- `/register <code>` - Register to receive broadcasts
- `/unregister <code>` - Unregister from broadcasts

### 💬 Group Support
- `/Pulse <question>` - Use knowledge base features in groups

## 🛠️ Installation and Configuration

### 1. Environment Variable Configuration

Create a `.env` file:

```env
NODE_ENV=development
API_URL=http://localhost:3000/v1
TELEGRAM_BOT_API_KEY=your-api-key
APP_PORT=3001
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Service

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

## 🔧 Bot Setup

### 1. Create a Telegram Bot

1. Search for `@BotFather` in Telegram
2. Send the `/newbot` command
3. Set the bot name and username
4. Get the bot token

### 2. Configure Webhook

```bash
# Set Webhook URL
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-domain.com/telegram/webhook",
    "allowed_updates": ["message"]
  }'
```

## 📖 Usage Flow

### 1. Create Knowledge Base Agent

```bash
# Create knowledge base agent
curl -X POST "http://localhost:3000/v1/agents" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Knowledge Base",
    "type": "telegram_kb",
    "config": {}
  }'
```

### 2. Get Registration Code

```bash
# Get registration code
curl -X POST "http://localhost:3000/v1/telegram/code" \
  -H "Content-Type: application/json" \
  -d '{
    "agentId": "your-agent-id"
  }'
```

### 3. Connect in Telegram

1. Search for your bot username
2. Send `/use <code>` to connect to the agent
3. Upload documents to the knowledge base (via API)
4. Send questions directly to get answers

## 🔌 API Integration

### Environment Variable Description

- `API_URL` - Main API address
- `TELEGRAM_BOT_API_KEY` - API key for bot request authentication
- `TELEGRAM_BOT_TOKEN` - Telegram Bot Token
- `APP_PORT` - Bot service port

### Communication with Main API

The bot service will send the following requests to the main API:

1. **Register Chat**
   ```
   POST /telegram/register
   {
     "chatId": "123456789",
     "chatType": "private",
     "code": "ABC123"
   }
   ```

2. **Query Knowledge Base**
   ```
   POST /telegram/knowledge/query
   {
     "agentId": "agent-id",
     "question": "What is artificial intelligence?",
     "chatId": "123456789"
   }
   ```

3. **Get Connection Status**
   ```
   GET /telegram/connections
   ```

## 🧪 Testing

```bash
# Run tests
npm test

# Run E2E tests
npm run test:e2e

# Run test coverage
npm run test:cov
```

## 📁 Project Structure

```
src/
├── common/           # Common modules
│   ├── env/         # Environment configuration
│   ├── guards/      # Guards
│   └── exceptions/  # Exception handling
├── modules/         # Feature modules
│   ├── telegram/    # Telegram Bot module
│   └── api/         # API module
└── main.ts          # Application entry point
```

## 🔒 Security Notes

1. **API Key Verification** - All requests require a valid API key
2. **Registration Code Verification** - Registration codes are time-limited and unique
3. **Chat Association** - Each chat can only be associated with one agent

## 🚨 Troubleshooting

### Common Issues

1. **Bot Not Responding**
   - Check if the bot token is correct
   - Ensure the webhook URL is accessible
   - Check service logs

2. **Connection Failed**
   - Check if the registration code is valid
   - Ensure the API service is running
   - Verify API key configuration

3. **Knowledge Base Query Failed**
   - Ensure you are connected to an agent
   - Check if the knowledge base has content
   - Verify Qdrant service status

### View Logs

```bash
# View service logs
npm run dev 2>&1 | tee bot.log
```

## 📞 Support

If you have any issues, please check:

1. Environment variable configuration
2. API service status
3. Telegram Bot setup
4. Network connection

## 📄 License

UNLICENSED - Private project 