import { Config } from "~libs/caddy/Config";

export type Server = Config['apps']['http']['servers']['s']

export const getServers = (config: Config) => config.apps.http.servers
