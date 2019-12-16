import { Logging } from "./logging";
import { LogSampling, CustomLog } from "./logs";
import { StandardLibLog } from "./sink";

export const schemas = [
  Logging,
  LogSampling,
  CustomLog,
  StandardLibLog,
]
