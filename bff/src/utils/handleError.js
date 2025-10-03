import { HTTP_STATUS_CODES } from '../constants.js';
import SharedResponses from './SharedResponses.js';

export function handleError(res, error, defaultMessage) {
  return SharedResponses.ErrorResponse(
    res,
    error?.response?.status || HTTP_STATUS_CODES.ERROR,
    error?.response?.data || { message: defaultMessage },
    defaultMessage
  );
}