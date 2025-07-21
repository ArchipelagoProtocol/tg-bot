import { EnvSchema } from '@common/env/env';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvModule } from './common/env/env.module';
import { TelegramModule } from './modules/telegram/telegram.module';
import { ApiModule } from './modules/api/api.modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validate: (config) => EnvSchema.parse(config),
    }),
    EnvModule,
    TelegramModule,
    ApiModule,
  ],
})
export class AppModule {}