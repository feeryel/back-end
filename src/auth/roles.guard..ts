import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/modules/user/model/user.model';
import jwt_decode from 'jwt-decode';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('role', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = jwt_decode(request.headers.authorization) as User;

    const hasRole = roles.every((role) => user.role.includes(role));

    if (roles.length === 0 || hasRole) {
      return true;
    }

    throw new ForbiddenException('access denied');
  }
}
