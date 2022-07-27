package main

import (
	webapp "github.com/caddy2-ui/caddy2-ui/app"
	"github.com/maxence-charriere/go-app/v9/pkg/app"
)

func main() {
	webapp.Handler()
	app.RunWhenOnBrowser()
}
