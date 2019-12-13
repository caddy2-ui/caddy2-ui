import { Handler } from "./handler";

export interface RequestBodyHandler implements Handler {
  handler: 'request_body'
  /**The maximum number of bytes to allow reading from the body by a later handler. */
  max_size: number
}
