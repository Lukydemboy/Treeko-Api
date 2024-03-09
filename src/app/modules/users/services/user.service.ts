import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { In, Repository } from 'typeorm';
import { CompleteProfileDto, UpdateUserDto, UserDto } from '../dtos/user.dto';
import { NotFoundException } from '@nestjs/common';
import { AnimalEntity } from 'src/database/entities/animal.entity';

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AnimalEntity)
    private readonly animalsRepostory: Repository<AnimalEntity>,
  ) {}

  async findById(id: string): Promise<UserDto> {
    return this.userRepository
      .findOne({
        where: {
          id,
        },
      })
      .then((user) => {
        if (!user) throw new NotFoundException();

        return UserDto.from(user);
      });
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return this.userRepository
      .findOne({
        where: {
          username,
        },
      })
      .then((user) => {
        if (!user) throw new NotFoundException();

        return user;
      });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findByIds(userIds: string[]): Promise<UserEntity[]> {
    return this.userRepository.find({
      where: {
        id: In([...userIds]),
      },
    });
  }

  async emailExists(email: string): Promise<boolean> {
    return this.userRepository.exist({
      where: {
        email,
      },
    });
  }

  async completeProfile(
    userId: string,
    completeProfileDto: CompleteProfileDto,
  ) {
    return await this.userRepository
      .save({
        id: userId,
        ...completeProfileDto,
      })
      .then((userEntity) => {
        return UserDto.from(userEntity);
      });
  }

  async update(userId: string, data: UpdateUserDto): Promise<UserDto> {
    return await this.userRepository
      .update(userId, data)
      .then(() => this.findById(userId));
  }

  async archive(userId: string) {
    return await this.userRepository.softDelete(userId);
  }

  async getAnimals(userId: string) {
    return await this.userRepository
      .findOneOrFail({
        where: {
          id: userId,
        },
        relations: {
          animals: true,
        },
      })
      .then((user) => user.animals);
  }
}
