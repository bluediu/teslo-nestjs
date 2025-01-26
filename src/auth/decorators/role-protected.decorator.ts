import { SetMetadata } from '@nestjs/common';
import { IValidRoles } from '../interfaces';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: IValidRoles[]) =>
  SetMetadata(META_ROLES, args);
