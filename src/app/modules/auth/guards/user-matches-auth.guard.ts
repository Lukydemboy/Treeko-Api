import { JwtUser } from 'src/domain/types/jwt';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

/**
 *
 * Guard that checks if the authorized user is the same as the one that is provided in the template parameters.
 *
 * If the authenticated user has the role admin or support, he can access any user's resource.
 * If the authenticated user is not admin or support, he can only access his own resources.
 *
 * @returns boolean
 */
export class UserMatchesAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const params = request.params;
    const user = request?.user as JwtUser;

    if (!user) {
      Logger.warn(
        `User tried to access a route without being authenticated. ${request.method}: ${request.url}`,
      );

      throw new UnauthorizedException('You are not authenticated.');
    }

    if (user.id !== params.userId) {
      Logger.warn(
        `User ${user.id} tried to access a resource that is not his. ${
          request.method
        }: ${request.url}, Params: ${JSON.stringify(params)}`,
      );

      throw new ForbiddenException(
        'You are not authorized to access this resource.',
      );
    }

    return true;
  }
}
