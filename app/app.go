package app

import (
	"github.com/maxence-charriere/go-app/v9/pkg/app"
)



func init() {
	app.Route("/", &Home{})
}

func Handler() *app.Handler {
	return &app.Handler{
		Name: "caddy2 ui",
	}
}
