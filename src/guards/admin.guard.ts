import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/users/user.entity';

export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.currentUser);
    if (request.currentUser) {
      const currentUser = request.currentUser as User;
      if (currentUser.isAdmin) {
        return true;
      }
    }
    return false;
  }
}
