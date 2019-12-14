import { Config } from "~libs/caddy/Config";

export type Certs = Config['apps']['tls']['certificates']

export const getCerts = (config: Config) => config.apps.tls.certificates
