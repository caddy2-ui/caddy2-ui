package app

import "github.com/maxence-charriere/go-app/v9/pkg/app"

type Home struct {
	app.Compo
}

func (h *Home) OnPreRender(ctx app.Context) {
	ctx.Page().SetTitle("caddy2 ui")
}

func (h *Home) Render() app.UI {
	return app.Div().Body(
		app.Text("new caddy2 ui"),
	)
}
