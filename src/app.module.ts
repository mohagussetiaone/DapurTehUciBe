import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleModule } from './module/module.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'rosie.db.elephantsql.com',
      port: 5432,
      username: 'mxezcfns',
      password: 'tgqu4jLNaiKhmMmCwZTvz_CiXVDGyRUX',
      database: 'mxezcfns',
      entities: ['dist/output/entities/*.js'],
      synchronize: false,
      autoLoadEntities: true,
    }),
    ModuleModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
