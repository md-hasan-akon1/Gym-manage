/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../errors/AppError';

import handleDuplicateError from '../errors/handleDuplicateError';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/handleZodError';

import handleCastError from '../errors/handelCastError';
import { TErrorDetails } from '../interface/error';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
 
  //setting default values
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorDetails: TErrorDetails = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorDetails;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorDetails;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorDetails;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorDetails;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorDetails = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorDetails = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  //ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
    err,
    stack: config.nodeEnv=== 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

//pattern
/*
success
message
errorDetails:[
  path:'',
  message:''
]
stack
*/