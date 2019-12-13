import { AdminConfig } from "./AdminConfig";
import { Logging } from "./Logging";
import { Server } from "./Server";
import { time } from "./go";

/**
 * Config is the top (or beginning) of the Caddy configuration structure.
 * Caddy config is expressed natively as a JSON document. If you prefer
 * not to work with JSON directly, there are [many config adapters](/docs/config-adapters)
 * available that can convert various inputs into Caddy JSON.
 *
 * Many parts of this config are extensible through the use of Caddy modules.
 * Fields which have a json.RawMessage type and which appear as dots (•••) in
 * the online docs can be fulfilled by modules in a certain module
 * namespace. The docs show which modules can be used in a given place.
 *
 * Whenever a module is used, its name must be given either inline as part of
 * the module, or as the key to the module's value. The docs will make it clear
 * which to use.
 *
 * Generally, all config settings are optional, as it is Caddy convention to
 * have good, documented default values. If a parameter is required, the docs
 * should say so.
 *
 * Go programs which are directly building a Config struct value should take
 * care to populate the JSON-encodable fields of the struct (i.e. the fields
 * with `json` struct tags) if employing the module lifecycle (e.g. Provision
 * method calls).
 */
export interface Config {
	admin?: AdminConfig
	logging?: Logging

	/**
	 * StorageRaw is a storage module that defines how/where Caddy
	 * stores assets (such as TLS certificates). By default, this is
	 * the local file system (`caddy.storage.file_system` module).
	 * If the `XDG_DATA_HOME` environment variable is set, then
	 * `$XDG_DATA_HOME/caddy` is the default folder. Otherwise,
	 * `$HOME/.local/share/caddy` is the default folder.
	 */
	storage?: any

	/**
	 * AppsRaw are the apps that Caddy will load and run. The
	 * app module name is the key, and the app's config is the
	 * associated value.
	 */
	apps?: {
		http: {
			/**The port to use for HTTP (optional; used for automatic HTTPS). */
			http_port?: number,
			/**The port to use for HTTPS (optional; used for automatic HTTPS). */
			https_port?: number,
			/**How long to allow servers to shut down gracefully before forcing them to stop. Duration values follow Go's time.Duration format, e.g. `"10s"` or `"1m30s"` */
			grace_period: string,
			/**Server configurations, keyed by unique names you choose. A server is a set of listeners and routes which make sense to group together. At this time, servers cannot have overlapping listeners. */
			servers: { [k: string]: Server }
		}
		tls: {}
	}

}