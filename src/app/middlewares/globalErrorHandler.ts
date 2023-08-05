import { ErrorRequestHandler, Request, Response } from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleValidationError from '../../errors/handleValidationError';
import ApiError from '../../errors/ApiError';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import handleCastError from '../../errors/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response
  // next: NextFunction
) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? console.log('globalErrorHandler', { error })
    : console.error('global Error Handler', error);

  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplyfiedError = handleValidationError(error);
    statusCode = simplyfiedError.statusCode;
    message = simplyfiedError.message;
    errorMessages = simplyfiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplyfiedError = handleZodError(error);
    statusCode = simplyfiedError.statusCode;
    message = simplyfiedError.message;
    errorMessages = simplyfiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplyfiedError = handleCastError(error);
    statusCode = simplyfiedError.statusCode;
    message = simplyfiedError.message;
    errorMessages = simplyfiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};
export default globalErrorHandler;
