import { HttpException, HttpStatus } from '@nestjs/common';

export class AppError extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(
      {
        statusCode,
        message,
        stack:
          process.env.NODE_ENV === 'devmode' ? new Error().stack : undefined,
      },
      statusCode,
    );
  }
}
