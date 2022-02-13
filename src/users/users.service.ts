import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: Repository<UsersRepository>,
  ) {}

  async Register(user: UsersDto): Promise<object> {
    const bcrypt = await import('bcrypt');
    if (
      !user.name ||
      !user.lastName ||
      !user.country ||
      !user.state ||
      !user.city ||
      !user.email ||
      !user.password
    ) {
      throw new BadRequestException('Incomplete data');
    }
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email,
      )
    ) {
      throw new BadRequestException('Invalid email');
    }
    const salt: string = await bcrypt.genSalt(8);
    user.password = await bcrypt.hash(user.password, salt);
    try {
      await this.usersRepository.save(user);
      return { message: 'congratulations, your account has been created' };
    } catch (err) {
      console.log(err);
      throw new BadRequestException('That account already exists');
    }
  }

  async Auth(user: UsersDto): Promise<object> {
    const bcrypt = await import('bcrypt');
    const nJwt = await import('njwt');
    if (!user.email || !user.password) {
      throw new BadRequestException('Incomplete data');
    }
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email,
      )
    ) {
      throw new BadRequestException('Invalid email');
    }
    const verifyUser: UsersDto = await this.usersRepository.findOne({
      email: user.email,
    });
    if (!verifyUser) {
      throw new BadRequestException('Incomplete data');
    }
    if (!(await bcrypt.compare(user.password, verifyUser.password))) {
      throw new BadRequestException('Wrong password');
    }
    const claims = {
      iss: 'http://localhost:8000/',
      sub: verifyUser.id,
    };
    const jwt = nJwt.create(claims, 'loremloremlorem');
    console.log(jwt);
    jwt.setExpiration(new Date().setMinutes(30));
    return {
      message: `Welcome ${verifyUser.name} ${verifyUser.lastName}`,
      token: jwt.compact(),
    };
  }
}
