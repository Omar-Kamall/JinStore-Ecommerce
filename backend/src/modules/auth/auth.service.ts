import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  compareHashPassword,
  generateHashPassword,
} from '../../utils/hash.utils';
import { AppError } from '../../common/errors/app.error';
import { UserMapper } from '../users/user.mapper';
import { PinoLogger } from 'nestjs-pino';
import {
  ForgotPasswordDto,
  LoginAuthDto,
  ResetPasswordDto,
  VerifyOtpDto,
} from './entities/auth.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(AuthService.name);
  }

  async create(createAuthDto: CreateAuthDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createAuthDto.email },
    });
    if (existingUser) {
      this.logger.warn('Registration rejected: email already exists');
      throw new AppError('User already exists', HttpStatus.CONFLICT);
    }

    const hashPassword = await generateHashPassword(createAuthDto.password);
    if (!hashPassword) {
      this.logger.error('Password hashing failed');
      throw new AppError(
        'Internal server error try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const newUser = this.userRepository.create({
      ...createAuthDto,
      password: hashPassword,
    });
    const savedUser = await this.userRepository.save(newUser);
    if (!savedUser) {
      this.logger.warn('Sign In rejected: email not found');

      throw new AppError(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    this.logger.info('User registered successfully');

    return UserMapper.toResponse(savedUser);
  }

  async login(loginDto: LoginAuthDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      this.logger.warn('Login rejected: email not found');
      throw new AppError('Invalid email or password', HttpStatus.CONFLICT);
    }

    const isPasswordValid = await compareHashPassword(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      this.logger.warn('Login rejected: password wrong');
      throw new AppError('Invalid email or password', HttpStatus.CONFLICT);
    }

    this.logger.info('User logined successfully');

    return UserMapper.toResponse(user);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userRepository.findOne({
      where: { email: forgotPasswordDto.email },
    });
    if (!user) {
      this.logger.warn('Forget Password rejected: email not found');
      throw new AppError('Checked Your Email', HttpStatus.CONFLICT);
    }

    // send otp code

    this.logger.info('Changed Password successfully');

    return;
  }

  verifyResetOtp(verifyOtpDto: VerifyOtpDto, email: string) {
    // verify otp service
    return { verifyOtpDto, email };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto, email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      this.logger.warn('Forget Password rejected: email not found');
      throw new AppError('Checked Your Email', HttpStatus.CONFLICT);
    }

    const hashPassword = await generateHashPassword(resetPasswordDto.password);
    if (!hashPassword) {
      this.logger.error('Password hashing failed');
      throw new AppError(
        'Internal server error try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const changePassword = await this.userRepository.update(
      { email },
      { password: hashPassword },
    );
    if (changePassword.affected === 0) {
      this.logger.warn('Change password rejected: email not found');

      throw new AppError('User not found', HttpStatus.NOT_FOUND);
    }

    return UserMapper.toResponse(user);
  }
}
