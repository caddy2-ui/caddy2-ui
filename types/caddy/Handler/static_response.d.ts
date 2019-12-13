import { Handler } from "./handler";

export interface StaticResponseHandler implements Handler {
  handler: 'static_response'
  /**The HTTP status code to respond with. Can be an integer or, if needing to use a placeholder, a string. */
  status_code?: number,
  /**Header fields to set on the response. */
  headers?: { [Field: string]: string[] },
  /**The response body. */
  body?: string,
  /**If true, the server will close the client's connection after writing the response. */
  close?: boolean
}
