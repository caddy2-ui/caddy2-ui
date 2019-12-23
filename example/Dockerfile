FROM alpine as Caddy2
RUN wget -O /usr/local/bin/caddy2 https://github.com/caddyserver/caddy/releases/download/v2.0.0-beta10/caddy2_beta10_linux_amd64
RUN chmod +x /usr/local/bin/caddy2

FROM node:12.2.0-alpine as PM2
WORKDIR /pm2
RUN yarn add pm2 --registry=https://registry.npm.taobao.org

FROM shynome/caddy2-ui
COPY --from=PM2 /pm2 /pm2
COPY --from=Caddy2 /usr/local/bin/caddy2 /usr/local/bin/caddy2
COPY . /app/example
CMD [ "/pm2/node_modules/.bin/pm2-runtime", "start", "example/app.config.js" ]
