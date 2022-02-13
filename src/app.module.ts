import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users/users.repository';
import { VerifyTokenMiddleware } from './verify-token.middleware';
import { AnimalsModule } from './animals/animals.module';
import { AnimalsRepository } from './animals/animals.repository';
@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'animal_db',
      entities: [UsersRepository, AnimalsRepository],
      synchronize: true,
    }),
    AnimalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyTokenMiddleware).forRoutes('api/animals');
  }
}
