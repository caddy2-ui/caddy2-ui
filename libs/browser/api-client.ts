import axios from "axios";

export const servers = axios.create({
  baseURL: '/caddy2-api/config/apps/http/servers'
})

export const api = axios.create({
  baseURL: '/caddy2-api/config'
})

