import { Handler } from "./handler";

export interface ErrorHandler implements Handler {
  handler: 'error'
  /**The recommended HTTP status code. Can be either an integer or a string if placeholders are needed. Optional. Default is 500. */
  status_code?: number
  /**The error message. Optional. Default is no error message. */
  error?: string
}
