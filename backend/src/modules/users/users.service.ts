import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PinoLogger } from 'nestjs-pino';
import { AppError } from '../../common/errors/app.error';
import { UserMapper } from './user.mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(UsersService.name);
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.userRepository.findAndCount({
      skip,
      take: limit,
    });

    const users = data.map((user) => UserMapper.toResponse(user));
    return {
      users,
      meta: { total, page, limit, lastPage: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      this.logger.warn('Get User rejected: user not found');
      throw new AppError('User Not Found', HttpStatus.CONFLICT);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      this.logger.warn('Update User rejected: user not found');
      throw new AppError('User Not Found', HttpStatus.CONFLICT);
    }

    const updateUser = await this.userRepository.update(id, updateUserDto);
    if (!updateUser.affected) {
      this.logger.warn('Update User rejected: user not updated');
      throw new AppError('User Not Updated', HttpStatus.NOT_FOUND);
    }

    return;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      this.logger.warn('Deleted User rejected: user not found');
      throw new AppError('User Not Found', HttpStatus.CONFLICT);
    }

    const deletedUser = await this.userRepository.delete(id);
    if (!deletedUser.affected) {
      this.logger.warn('Deleted User rejected: user not deleted');
      throw new AppError(
        'User Not Deleted Pleade Try Again',
        HttpStatus.CONFLICT,
      );
    }
    return;
  }
}
