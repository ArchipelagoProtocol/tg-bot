import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { HttpModule } from '@nestjs/axios';

import { TelegramBotListener } from './telegram-bot.listener';
import { env } from '@common/env/env';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({
        token: env.TELEGRAM_BOT_TOKEN,
      }),
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
      headers: {
        'x-api-key': env.TELEGRAM_BOT_API_KEY,
      }
    }),
  ],
  providers: [
    TelegramBotListener,
  ],
})
export class TelegramModule {}
