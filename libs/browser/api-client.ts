import axios, { AxiosInstance } from "axios";
import { useMemo } from "react";
import { Config } from "~libs/caddy/Config";

export const enum Action {
  /**对象是数组的话追加, 对象的话创建或替换 */
  POST = 'post',
  /**对象是数组的话追加, 对象的话创建 */
  PUT = 'put',
  /**替换 */
  PATCH = 'patch',
  DELETE = 'delete',
}

export const servers = axios.create({
  baseURL: '/caddy2-api/config/apps/http/servers'
})

export const api = axios.create({
  baseURL: '/caddy2-api/config'
})

import { caddy2Config } from "./caddy2";
export const useUpdateConfig = (scopeInstace: AxiosInstance) => {
  const [config, setConfig] = caddy2Config.useContainer()
  const updateServer = useMemo(() => {
    return async (
      action: Action,
      path: string,
      dispath: (dispath: typeof setConfig, config: Config, data: any, ) => void | Promise<void>,
      data?: any,
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
          break;
      }
      let d = await scopeInstace.get(path).then(r => r.data)
      await dispath(setConfig, config, d)
    }
  }, [config, setConfig])
  return updateServer
}
