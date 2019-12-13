import { StandardLibLog } from './StandardLibLog'
import { CustomLog } from "./CustomLog";

/**
 * Logging facilitates logging within Caddy.
 *
 * By default, all logs at INFO level and higher are written to
 * standard error ("stderr" writer) in a human-readable format
 * ("console" encoder). The default log is called "default" and
 * you can customize it. You can also define additional logs.
 *
 * All defined logs accept all log entries by default, but you
 * can filter by level and module/logger names. A logger's name
 * is the same as the module's name, but a module may append to
 * logger names for more specificity. For example, you can
 * filter logs emitted only by HTTP handlers using the name
 * "http.handlers", because all HTTP handler module names have
 * that prefix.
 *
 * Caddy logs (except the sink) are mostly zero-allocation, so
 * they are very high-performing in terms of memory and CPU time.
 * Enabling sampling can further increase throughput on extremely
 * high-load servers.
 */
export interface Logging {
	/**
	 * Sink is the destination for all unstructured logs emitted
	 * from Go's standard library logger. These logs are common
	 * in dependencies that are not designed specifically for use
	 * in Caddy. Because it is global and unstructured, the sink
	 * lacks most advanced features and customizations.
	 */
	sink?: StandardLibLog

	/**
	 * Logs are your logs, keyed by an arbitrary name of your
	 * choosing. The default log can be customized by defining
	 * a log called "default". You can further define other logs
	 * and filter what kinds of entries they accept.
	 */
	logs?: { [k: string]: CustomLog }

}