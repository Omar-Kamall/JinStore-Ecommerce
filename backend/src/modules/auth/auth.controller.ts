import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Message } from '../../common/decorators/message/message.decorator';
import {
  ForgotPasswordDto,
  LoginAuthDto,
  ResetPasswordDto,
  VerifyOtpDto,
} from './entities/auth.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Message('User registered successfully')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  @Message('User logged in successfully')
  login(@Body() loginDto: LoginAuthDto) {
    return this.authService.login(loginDto);
  }

  @Post('forgot-password')
  @Message('Otp Sent successfully')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('verify-reset-otp')
  @Message('Otp Rigstered successfully')
  verifyResetOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    const email = 'test@test.com';

    return this.authService.verifyResetOtp(verifyOtpDto, email);
  }

  @Patch('reset-password')
  @Message('Password reset successfully')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const email = 'test@test.com';
    return this.authService.resetPassword(resetPasswordDto, email);
  }
}
