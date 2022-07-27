package main

import (
	"log"
	"net/http"

	"github.com/caddy2-ui/caddy2-ui/app"
)

func main() {

	if false {
		RunCaddy()
	}

	http.Handle("/", app.Handler())

	if err := http.ListenAndServe(":8000", nil); err != nil {
		log.Fatal(err)
	}
}
