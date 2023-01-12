import { User } from '../entities/user.entity';
import {
  Injectable,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    console.log(user);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['id', 'name', 'email', 'profile'],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    delete user.password;

    if (!user) throw new NotFoundException();

    return user;
  }

  async findByEmail(email: string, returnPassword?: boolean): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    // Used just to auth verification, return password property.
    if (!returnPassword) delete user.password;

    if (!user) throw new NotFoundException();

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException();

    await this.userRepository.update(id, { ...updateUserDto });

    return this.userRepository.create({ ...user, ...updateUserDto });
  }

  async remove(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException();

    await this.userRepository.delete(id);

    return `O usuário com id ${id} foi deletado com sucesso!`;
  }
}
