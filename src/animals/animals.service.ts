import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimalsDto } from './animals.dto';
import { AnimalsRepository } from './animals.repository';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(AnimalsRepository)
    private readonly animalRepository: Repository<AnimalsRepository>,
  ) {}

  async GetAnimals(): Promise<AnimalsDto[]> {
    return await this.animalRepository.find();
  }

  async SaveAndModifiedAnimal(
    animal: AnimalsDto,
    method: string,
  ): Promise<object> {
    if (!animal.name || !animal.age || !animal.kind) {
      throw new BadRequestException('Incomplete data');
    }
    await this.animalRepository.save(animal);
    return {
      message: method === 'POST' ? 'Saved an animal' : 'Modified animal',
    };
  }

  async DeleteAnimal(id: number): Promise<object> {
    if (!id) {
      throw new BadRequestException('Incomplete data');
    }
    const animalToDelete: AnimalsDto = await this.animalRepository.findOne(id);
    if (!animalToDelete) {
      throw new BadRequestException('The animal does not exits');
    }
    await this.animalRepository.remove(animalToDelete);
    return { message: 'Removed an animal' };
  }
}
