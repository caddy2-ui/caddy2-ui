import { Handler } from "./handler";

export interface VarsHandler implements Handler {
  handler: 'vars'
  [k: string]: string
}
