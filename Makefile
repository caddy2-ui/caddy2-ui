build:
	GOARCH=wasm GOOS=js go build -o web/app.wasm ./app/main
	go build
run: build
	./caddy2-ui
