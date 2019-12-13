import { Handler } from "./handler";

export interface HTTPBasic {
  hash: {
    algorithm: 'bcrypt' | 'scrypt'
    N: number
    r: number
    p: number
    key_length: number
  }
  accounts: Array<{
    username: string,
    /**hashed_and_base64_encoded */
    password: string,
    /**base64_encoded */
    salt: string,
  }>
  realm: string
}

export interface AuthenticationHandler implements Handler {
  handler: 'authentication'
  /**A set of authentication providers. If none are specified, all requests will be unauthenticated. */
  providers: {
    http_basic: HTTPBasic
  }
}
