import { Handler } from "./handler";
import { Route } from "../Route";

export interface SubrouteHandler implements Handler {
  handler: 'subroute',
  /**The list of routes to compile and execute. */
  routes: Route[]
}
