
import mongoose from 'mongoose';
import { TErrorDetails, TGenericErrorResponse } from '../interface/error';



const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorDetails: TErrorDetails = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorDetails,
  };
};

export default handleCastError;
