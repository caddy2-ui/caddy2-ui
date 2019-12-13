// Route consists of a set of rules for matching HTTP requests,
// a list of handlers to execute, and optional flow control
// parameters which customize the handling of HTTP requests
// in a highly flexible and performant manner.
export interface Route {
	// Group is an optional name for a group to which this
	// route belongs. If a route belongs to a group, only
	// the first matching route in the group will be used.
	Group string `json:"group,omitempty"`

	// The matcher sets which will be used to qualify this
	// route for a request. Essentially the "if" statement
	// of this route. Each matcher set is OR'ed, but matchers
	// within a set are AND'ed together.
	MatcherSetsRaw RawMatcherSets `json:"match,omitempty" caddy:"namespace=http.matchers"`

	// The list of handlers for this route. Upon matching a request, they are chained
	// together in a middleware fashion: requests flow from the first handler to the last
	// (top of the list to the bottom), with the possibility that any handler could stop
	// the chain and/or return an error. Responses flow back through the chain (bottom of
	// the list to the top) as they are written out to the client.
	//
	// Not all handlers call the next handler in the chain. For example, the reverse_proxy
	// handler always sends a request upstream or returns an error. Thus, configuring
	// handlers after reverse_proxy in the same route is illogical, since they would never
	// be executed. You will want to put handlers which originate the response at the very
	// end of your route(s). The documentation for a module should state whether it invokes
	// the next handler, but sometimes it is common sense.
	//
	// Some handlers manipulate the response. Remember that requests flow down the list, and
	// responses flow up the list.
	//
	// For example, if you wanted to use both `templates` and `encode` handlers, you would
	// need to put `templates` after `encode` in your route, because responses flow up.
	// Thus, `templates` will be able to parse and execute the plain-text response as a
	// template, and then return it up to the `encode` handler which will then compress it
	// into a binary format.
	//
	// If `templates` came before `encode`, then `encode` would write a compressed,
	// binary-encoded response to `templates` which would not be able to parse the response
	// properly.
	//
	// The correct order, then, is this:
	//
	//     [
	//         {"handler": "encode"},
	//         {"handler": "templates"},
	//         {"handler": "file_server"}
	//     ]
	//
	// The request flows ⬇️ DOWN (`encode` -> `templates` -> `file_server`).
	//
	// 1. First, `encode` will choose how to `encode` the response and wrap the response.
	// 2. Then, `templates` will wrap the response with a buffer.
	// 3. Finally, `file_server` will originate the content from a file.
	//
	// The response flows ⬆️ UP (`file_server` -> `templates` -> `encode`):
	//
	// 1. First, `file_server` will write the file to the response.
	// 2. That write will be buffered and then executed by `templates`.
	// 3. Lastly, the write from `templates` will flow into `encode` which will compress the stream.
	//
	// If you think of routes in this way, it will be easy and even fun to solve the puzzle of writing correct routes.
	HandlersRaw []json.RawMessage `json:"handle,omitempty" caddy:"namespace=http.handlers inline_key=handler"`

	// If true, no more routes will be executed after this one, even if they matched.
	Terminal bool `json:"terminal,omitempty"`

}