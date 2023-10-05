import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NextFunction, Request, Response } from 'express';
import { User } from '@users/entities/user.entity';

interface UserRequest extends Request {
  user: User;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: UserRequest, res: Response, next: NextFunction) {
    if (
      /^\/api\//.test(req.originalUrl) &&
      req.originalUrl != '/api/auth/log-in' &&
      !(req.originalUrl == '/api/users' && req.method == 'POST') &&
      !(req.originalUrl == '/api/users' && req.method == 'GET') &&
      !(req.originalUrl == '/api/users' && req.method == 'DELETE')
    ) {
      const bearerToken = req.headers.authorization as undefined | string;
      const token = !!bearerToken ? bearerToken.replace('Bearer ', '') : null;
      const user = await this.authService.logged(token);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401);
        res.end();
      }
    } else next();
  }
}
