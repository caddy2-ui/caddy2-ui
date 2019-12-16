import { App } from "./apps";
import { HTTP } from "./http";
import { schemas as Servers } from "./server";

export const schemas = [
  App,
  HTTP,
  ...Servers,
]
