import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nJwt = require('njwt');
    if (!req.headers.authorization) {
      res.status(400).json({ message: 'No token, no access' });
      return;
    }
    nJwt.verify(req.headers.authorization, 'loremloremlorem', function (err) {
      if (err) {
        res.status(400).json({ message: 'Invalid token, no access' }); // Token has expired, has been tampered with, etc
        return;
      } else {
        next();
      }
    });
  }
}
