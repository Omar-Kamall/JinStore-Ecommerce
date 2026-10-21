import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../../common/decorators/roles/roles.decorator';
import { EUserRole } from '../../common/enums';
import { AuthGuard } from '../../common/Guards/auth/auth.guard';
import { RolesGuard } from '../../common/Guards/roles/roles.guard';
import { Message } from '../../common/decorators/message/message.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(EUserRole.ADMIN)
  @Message('Get Users Succssesfully')
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    return await this.usersService.findAll(page, limit);
  }

  @Get(':id')
  @Message('Get User Succssesfully')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @Message('Update Users Succssesfully')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Message('Deleted User Succssesfully')
  @Roles(EUserRole.ADMIN)
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
