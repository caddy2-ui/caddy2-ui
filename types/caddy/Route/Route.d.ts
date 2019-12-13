import { Matcher } from "./Matcher";
import { Handler } from "../Handler";

/**
 * <https://github.com/caddyserver/caddy/wiki/v2:-Documentation#httpserversroutes>
 */
export interface Route {
	/**If this route belongs to a group, specify its name here. Groups are used for mutual exclusion. Only the first matching route from a group is compiled into the composite route. (Think like radio buttons on an HTML form.) Groups can be used to implement "else" and "else-if" logic with matchers. */
	group?: string
	/**The "if" statement of the route. This specifies an ordered list of matcher sets. */
	match?: Matcher[],
	/**The "then" statement of the route. This specifies an ordered list of handlers to chain together. Handlers are chained from first to last, so requests flow from the first handler to the last. */
	handle?: Handler[],
	/**If true, no additional routes will be considered. */
	terminal?: boolean
}
