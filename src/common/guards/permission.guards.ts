import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }
  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const permission = this.reflector.get<string[]>('permission', context.getHandler());
    console.log('persmission: ', permission);

    if (!permission) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('user: ', user.rols);

    const hasRole = () =>
      !!user.rols.find(role => !!permission.find(item => item === role.name));
    return hasRole()


  }






}

