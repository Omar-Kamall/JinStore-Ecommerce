import { SetMetadata } from '@nestjs/common';
import { EUserRole } from '../../enums';

export const Roles = (...args: EUserRole[]) => SetMetadata('roles', args);
