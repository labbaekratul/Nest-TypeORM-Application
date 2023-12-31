import {
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const errorHandler = (
  statusCode: number,
  exception = true,
  message = '',
) => {
  switch (statusCode) {
    case 401:
      if (exception)
        throw new UnauthorizedException({
          message: 'Invalid Authentication',
        });
      throw new UnauthorizedException({
        message: 'Unauthorized',
      });
    case 403:
      throw new HttpException({ message: 'Invalid credentials' }, statusCode);
    case 404:
      throw new NotFoundException(`Record with ${message} not found`);
    case 406:
      throw new HttpException({ message: 'Not Acceptable' }, statusCode);
    case 409:
      throw new HttpException(
        { message: `Recode '${message}' already used` },
        statusCode,
      );
    default:
      throw new HttpException({ message }, 500);
  }
};
