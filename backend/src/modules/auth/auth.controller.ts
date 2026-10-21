import {
  Controller,
  Post,
  Body,
  Patch,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Message } from '../../common/decorators/message/message.decorator';
import {
  ForgotPasswordDto,
  LoginAuthDto,
  ResetPasswordDto,
  VerifyAccountDto,
  VerifyOtpDto,
} from './entities/auth.schema';
import type { Request, Response } from 'express';
import { genrateToken } from '../../utils/token';
import { AuthGuard } from '../../common/Guards/auth/auth.guard';
import type { IReqUser } from '../../common/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Message('User registered successfully')
  async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.create(createAuthDto);
  }

  @Post('login')
  @Message('User logged in successfully')
  async login(@Body() loginDto: LoginAuthDto) {
    return await this.authService.login(loginDto);
  }

  @Post('forgot-password')
  @Message('Otp Sent successfully')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = genrateToken({ email: forgotPasswordDto.email }, '5m');
    res.cookie('forget-password-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prodMode',
      sameSite: 'strict',
      maxAge: 5 * 60 * 1000,
    });

    return await this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('verify-account')
  @Message('Otp Sent successfully')
  async verifyAccount(
    @Body() verifyAccountDto: VerifyAccountDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = genrateToken({ email: verifyAccountDto.email }, '5m');
    res.cookie('verify-account-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prodMode',
      sameSite: 'strict',
      maxAge: 300000,
    });

    return await this.authService.verifyAccount(verifyAccountDto);
  }

  @UseGuards(AuthGuard)
  @Post('verify-reset-otp')
  @Message('Otp Rigstered successfully')
  async verifyResetOtp(
    @Body() verifyOtpDto: VerifyOtpDto,
    @Req() req: IReqUser,
  ) {
    const email = req.user.email;
    return await this.authService.verifyResetOtp(verifyOtpDto, email);
  }

  @UseGuards(AuthGuard)
  @Patch('reset-password')
  @Message('Password reset successfully')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Req() req: IReqUser,
  ) {
    const email = req.user.email;
    return await this.authService.resetPassword(resetPasswordDto, email);
  }
}
