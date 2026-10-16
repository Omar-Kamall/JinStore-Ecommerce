import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  login(createAuthDto: CreateAuthDto) {
    return 'This action logs in the auth';
  }

  update(updateAuthDto: UpdateAuthDto) {
    return `This action updates the auth`;
  }
}
