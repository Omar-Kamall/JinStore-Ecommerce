import { userResponseSchema } from './dto/user-response.schema';
import { UserEntity } from './entities/user.entity';

export class UserMapper {
  static toResponse(user: UserEntity) {
    return userResponseSchema.parse(user);
  }
}
