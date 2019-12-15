import { Config } from "~libs/caddy/Config";
import { getServers, Server as _Server } from "~pages/servers";

export type Server = _Server

export const getServer = (config: Config, which: string) => getServers(config)[which]
