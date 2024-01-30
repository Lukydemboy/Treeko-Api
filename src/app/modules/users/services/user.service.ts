import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { In, Repository } from 'typeorm';
import { UpdateUserDto } from '../dtos/user.dto';
import { NotFoundException } from '@nestjs/common';

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findById(id: string): Promise<UserEntity> {
    return this.userRepository
      .findOne({
        where: {
          id,
        },
      })
      .then((user) => {
        if (!user) throw new NotFoundException();

        return user;
      });
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return this.userRepository
      .findOne({
        relations: ['favoriteTeam', 'groups'],
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

  async update(userId: string, data: UpdateUserDto): Promise<UserEntity> {
    return await this.userRepository
      .update(userId, data)
      .then(() => this.findById(userId));
  }

  async archive(userId: string) {
    return await this.userRepository.softDelete(userId);
  }

  async updatePushToken(userId: string, pushToken: string) {
    return await this.userRepository.update(userId, { pushToken });
  }
}
