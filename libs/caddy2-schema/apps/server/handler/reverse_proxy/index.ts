import { ReverseProxy } from "./reverse_proxy";
import { FastCGITransport, HTTPTransport } from "./transport";

export const schemas = [
  ReverseProxy,
  FastCGITransport, HTTPTransport,
]
