import { Config } from "~libs/caddy/Config";
import { getServers, Server as _Server } from "~pages/servers";

export type Server = _Server

export const getServer = (config: Config, which: string) => getServers(config)[which]

import { ServerBaseURL, useUpdateConfig, Action } from "~libs/browser/api-client";
import { useMemo, Dispatch, SetStateAction } from "react";
import axios from "axios";
export const useUpdateServer = (name: string) => {
  const instace = useMemo(() => {
    return axios.create({
      baseURL: ServerBaseURL + '/' + name,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }, [name])
  const update = useUpdateConfig(instace)
  return useMemo(() => {
    return <T = any>(
      _dispath: (server: Server, data?: T) => Server,
      action: Action,
      path: string,
      data?: T,
    ) => {
      const dispath = (dispath: Dispatch<SetStateAction<Config>>, config: Config, data?: any, ) => {
        config.apps.http.servers[name] = _dispath(config.apps.http.servers[name], data)
        dispath(config)
      }
      return update(dispath, action, path, data)
    }
  }, [update])
}
