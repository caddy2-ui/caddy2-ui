FROM alpine as Caddy2
RUN wget -O /usr/local/bin/caddy2 https://github.com/caddyserver/caddy/releases/download/v2.0.0-beta10/caddy2_beta10_linux_amd64
RUN chmod +x /usr/local/bin/caddy2

FROM shynome/caddy2-ui
RUN yarn global add pm2
COPY --from=Caddy2 /usr/local/bin/caddy2 /usr/local/bin/caddy2
COPY . /app/example
CMD [ "pm2-runtime", "start", "example/app.config.js" ]
