import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from '@common/env/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableShutdownHooks()
  await app.listen(env.APP_PORT);
}
bootstrap();