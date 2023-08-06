import { Module } from '@nestjs/common';
import { TaskModule } from './modules/task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'nest-typeorm',
      password: 'nest-typeorm',
      database: 'nest-typeorm',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
