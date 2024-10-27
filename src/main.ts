import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import Configurator from "./utils/configurator/configurator";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await Configurator.init(app)
      .addDefaultPipes()
      .start((port) => {
        console.log(`Сервер запущен на порту: ${port}`);
      });
}

bootstrap();
