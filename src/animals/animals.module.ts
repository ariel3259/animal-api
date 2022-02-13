import { Module } from '@nestjs/common';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalsRepository } from './animals.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalsRepository])],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
