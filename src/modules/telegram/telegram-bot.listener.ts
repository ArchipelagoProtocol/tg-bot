import { Update, Ctx, Start, Command, On } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import axios from 'axios';
import { env } from '@common/env/env';
import { Injectable } from '@nestjs/common';

interface ChatAssociation {
  chatId: string;
  agentId: string;
  isActive: boolean;
}

@Injectable()
@Update()
export class TelegramBotListener {
  @Start()
  async onStart(@Ctx() ctx: Context) {
    const welcomeMessage = `🤖 Welcome to the Telegram Bot!

Here are some things I can help you with:

📚 **Knowledge Base Commands:**
• /use <code> - Connect to a knowledge base
• /unlink <code> - Disconnect from knowledge base

📢 **Broadcast Commands:**
• /register <code> - Register to receive broadcasts
• /unregister <code> - Unregister from broadcasts

💡 **How to use:**

1. Create an agent and get a registration code
2. Use /use <code> to connect to the agent
3. Upload documents to the knowledge base via API
4. Ask questions directly - I'll answer based on your knowledge base

**Examples:**
• /use ABC123
• What is artificial intelligence?
• How does machine learning work?

Use /help for more information.`;

    await ctx.reply(welcomeMessage);
  }

  @Command('help')
  async onHelp(@Ctx() ctx: Context) {
    const helpMessage = `🤖 Telegram Bot Commands:

📚 **Knowledge Base Commands:**
• /use <code> - Connect to a knowledge base
• /unlink <code> - Disconnect from knowledge base

📢 **Broadcast Commands:**
• /register <code> - Register to receive broadcasts
• /unregister <code> - Unregister from broadcasts

💡 **Usage Instructions:**
1. Create an agent and get a registration code
2. Use /use <code> to connect to the agent
3. Upload documents to the knowledge base via API
4. Ask questions directly - I'll answer based on your knowledge base

**Examples:**
• /use ABC123
• What is artificial intelligence?
• How does machine learning work?`;

    await ctx.reply(helpMessage);
  }

  @Command('use')
  async onUse(@Ctx() ctx: Context) {
    console.log('onUse', ctx);
    const message = ctx.message;
    if (!message || !('text' in message)) {
      await ctx.reply('❌ Invalid message format.');
      return;
    }

    const args = message.text.split(' ').slice(1);
    const code = args[0];

    if (!code) {
      await ctx.reply('❌ Usage: /use <code>\n\nPlease provide a registration code.');
      return;
    }

    try {
      const response = await axios.post(`${env.API_URL}/telegram/register`, {
        chatId: ctx.chat?.id.toString(),
        chatType: ctx.chat?.type || 'private',
        code: code,
      }, {
        headers: {
          'x-api-key': env.TELEGRAM_BOT_API_KEY,
        }
      });

      if (response.data.success) {
        await ctx.reply('✅ Successfully connected to knowledge base!\n\nNow you can ask questions and I\'ll answer based on your knowledge base.');
      } else {
        await ctx.reply(`❌ Connection failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Failed to register chat:', error);
      await ctx.reply('❌ Failed to connect. Please check your registration code and try again.');
    }
  }

  @Command('unlink')
  async onUnlink(@Ctx() ctx: Context) {
    const message = ctx.message;
    if (!message || !('text' in message)) {
      await ctx.reply('❌ Invalid message format.');
      return;
    }

    const args = message.text.split(' ').slice(1);
    const code = args[0];

    if (!code) {
      await ctx.reply('❌ Usage: /unlink <code>\n\nPlease provide a registration code.');
      return;
    }

    try {
      const response = await axios.post(`${env.API_URL}/telegram/unregister`, {
        chatId: ctx.chat?.id.toString(),
        code: code,
      }, {
        headers: {
          'x-api-key': env.TELEGRAM_BOT_API_KEY,
        }
      });

      if (response.data.success) {
        await ctx.reply('✅ Successfully disconnected from knowledge base.');
      } else {
        await ctx.reply(`❌ Disconnection failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Failed to unregister chat:', error);
      await ctx.reply('❌ Failed to disconnect. Please check your registration code and try again.');
    }
  }

  @Command('register')
  async onRegister(@Ctx() ctx: Context) {
    const message = ctx.message;
    if (!message || !('text' in message)) {
      await ctx.reply('❌ Invalid message format.');
      return;
    }

    const args = message.text.split(' ').slice(1);
    const code = args[0];

    if (!code) {
      await ctx.reply('❌ Usage: /register <code>\n\nPlease provide a broadcast registration code.');
      return;
    }

    try {
      const response = await axios.post(`${env.API_URL}/telegram/register`, {
        chatId: ctx.chat?.id.toString(),
        chatType: ctx.chat?.type || 'private',
        code: code,
      }, {
        headers: {
          'x-api-key': env.TELEGRAM_BOT_API_KEY,
        }
      });

      if (response.data.success) {
        await ctx.reply('✅ Successfully registered for broadcasts!\n\nThis chat will now receive broadcast messages from the agent.');
      } else {
        await ctx.reply(`❌ Registration failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Failed to register for broadcasts:', error);
      await ctx.reply('❌ Failed to register. Please check your registration code and try again.');
    }
  }

  @Command('unregister')
  async onUnregister(@Ctx() ctx: Context) {
    const message = ctx.message;
    if (!message || !('text' in message)) {
      await ctx.reply('❌ Invalid message format.');
      return;
    }

    const args = message.text.split(' ').slice(1);
    const code = args[0];

    if (!code) {
      await ctx.reply('❌ Usage: /unregister <code>\n\nPlease provide a broadcast registration code.');
      return;
    }

    try {
      const response = await axios.post(`${env.API_URL}/telegram/unregister`, {
        chatId: ctx.chat?.id.toString(),
        code: code,
      }, {
        headers: {
          'x-api-key': env.TELEGRAM_BOT_API_KEY,
        }
      });

      if (response.data.success) {
        await ctx.reply('✅ Successfully unregistered from broadcasts.');
      } else {
        await ctx.reply(`❌ Unregistration failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Failed to unregister from broadcasts:', error);
      await ctx.reply('❌ Failed to unregister. Please check your registration code and try again.');
    }
  }

  @Command(/PULSE/i)
  async handleGroupMessage(@Ctx() ctx: Context) {
    return this.onMessage(ctx);
  }

  @On('text')
  async onMessage(@Ctx() ctx: Context) {
    const message = ctx.message;
    const userMessage = message && 'text' in message ? message.text : undefined;
    
    // Handle commands
    if (userMessage?.startsWith('/')) {
      return; // Commands are handled by specific command handlers
    }

    // Handle group messages with /Pulse prefix
    let messageWithoutPulse = userMessage?.replace(/^\/?PULSE\s*/i, '').trim();

    if (!messageWithoutPulse) {
      await ctx.reply("Please provide a message to process.");
      return;
    }

    try {
      // First, check if this chat is connected to a knowledge base
      const connectionsResponse = await axios.get(`${env.API_URL}/telegram/connections`, {
        headers: {
          'x-api-key': env.TELEGRAM_BOT_API_KEY,
        }
      });

      const connections = connectionsResponse.data.connections;
      const activeConnection = connections.find(
        (conn: any) => conn.chatId === ctx.chat?.id.toString() && conn.isActive
      );

      if (!activeConnection) {
        await ctx.reply('❌ You are not connected to any knowledge base.\n\nPlease use /use <code> to connect to a knowledge base first.');
        return;
      }

      // Forward message to knowledge base API
      const response = await axios.post(`${env.API_URL}/telegram/knowledge/query`, {
        agentId: activeConnection.agentId,
        question: messageWithoutPulse,
        chatId: ctx.chat?.id.toString(),
      }, {
        headers: {
          'x-api-key': env.TELEGRAM_BOT_API_KEY,
        }
      });

      if (response.data.success) {
        await ctx.reply(response.data.data.answer);
      } else {
        await ctx.reply('❌ Failed to get answer from knowledge base. Please try again.');
      }

    } catch (error) {
      console.error('Failed to process message:', error);
      await ctx.reply('❌ Something went wrong processing your message. Please try again.');
    }
  }
}
