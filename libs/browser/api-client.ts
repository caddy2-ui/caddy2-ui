import axios, { AxiosInstance } from "axios";
import { useMemo } from "react";
import { Config } from "~libs/caddy/Config";

export enum Action {
  /**对象是数组的话追加, 对象的话创建或替换 */
  POST = 'post',
  /**对象是数组的话追加, 对象的话创建 */
  PUT = 'put',
  /**替换 */
  PATCH = 'patch',
  DELETE = 'delete',
}

export const BaseURL = '/caddy2-api/config'
export const ServerBaseURL = BaseURL + '/apps/http/servers'

export const api = axios.create({
  baseURL: '/caddy2-api/config'
})

import { caddy2Config } from "./caddy2";
import copy from "fast-copy";
export const useUpdateConfig = (scopeInstace: AxiosInstance) => {
  const [config, setConfig] = caddy2Config.useContainer()
  const updateServer = useMemo(() => {
    return async <T = any, R = T>(
      dispath: (dispath: typeof setConfig, config: Config, data?: R) => Promise<any> | any,
      action: Action,
      path: string,
      data?: T,
    ) => {
      switch (action) {
        case Action.POST:
          await scopeInstace.post(path, data)
          break;
        case Action.PUT:
          await scopeInstace.put(path, data)
          break;
        case Action.PATCH:
          await scopeInstace.patch(path, data)
          break;
        case Action.DELETE:
          await scopeInstace.delete(path)
          path = path.replace(/\/[^\/]+(\/|)$/, '')
          break;
      }
      let d = await scopeInstace.get<R>(path).then(r => r.data)
      await dispath(setConfig, copy(config), d)
    }
  }, [config, setConfig, scopeInstace])
  return updateServer
}
