import { SetMetadata } from '@nestjs/common';
import { UserRoles } from 'src/common/database/Enum';

export const ROLES_KEY = 'roles';
export const RolesDecorator = (...roles: UserRoles[]) => {
    return SetMetadata(ROLES_KEY, roles);
};