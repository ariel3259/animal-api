import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { AnimalsDto } from './animals.dto';
import { AnimalsService } from './animals.service';

@Controller('api/animals')
export class AnimalsController {
  constructor(private readonly animalService: AnimalsService) {}

  @Get()
  async GetAllAnimals(): Promise<AnimalsDto[]> {
    return this.animalService.GetAnimals();
  }

  @Post()
  async SaveAnimal(
    @Body() animal: AnimalsDto,
    @Req() req: Request,
  ): Promise<object> {
    console.log(req.method);
    return await this.animalService.SaveAndModifiedAnimal(animal, req.method);
  }

  @Put()
  async ModifiedAnimal(
    @Body() animal: AnimalsDto,
    @Req() req: Request,
  ): Promise<object> {
    return await this.animalService.SaveAndModifiedAnimal(animal, req.method);
  }

  @Delete(':id')
  async DeleteAnimal(@Param() id: number): Promise<object> {
    return await this.animalService.DeleteAnimal(id);
  }
}
