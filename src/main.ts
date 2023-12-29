import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  // Menambahkan opsi limit untuk mengatasi masalah ukuran payload
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  // Mengaktifkan Cors
  app.enableCors();
  await app.listen(port, () => console.log(`Server running on port ` + port));
}

bootstrap();
