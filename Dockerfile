FROM node:12.2.0-alpine as BASE
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories \ 
  && apk add --no-cache ca-certificates \
  && npm config set registry https://registry.npm.taobao.org

FROM BASE as BUILD-BASE
RUN apk add --no-cache git build-base
COPY yarn.lock /app/yarn.lock

FROM BASE as PACK
COPY . /app
WORKDIR /app
RUN mv $(npm pack) npm-pack.tgz \
  && node -pe '(d=`dependencies`,JSON.stringify({[d]:require(`./package.json`)[d]},null,2))' >pkg-deps.json \
  && node -pe '(d=`dependencies`,dd=`devDependencies`,p=`./package.json`,JSON.stringify({[d]:require(p)[d],[dd]:require(p)[dd]},null,2))' >pkg-dev-deps.json 

FROM BUILD-BASE as PROD-modules
ENV NODE_ENV=production
COPY --from=PACK /app/pkg-deps.json /app/package.json
RUN cd /app && yarn install --production

FROM BUILD-BASE as BUILD-modules
COPY --from=PROD-modules /app/node_modules /app/node_modules
COPY --from=PACK /app/pkg-dev-deps.json /app/package.json
RUN cd /app && yarn install

FROM BUILD-BASE as BUILD
COPY --from=PACK /app/npm-pack.tgz /tmp/npm-pack.tgz
RUN tar -xzf /tmp/npm-pack.tgz -C /tmp 
COPY --from=BUILD-modules /app/node_modules /tmp/package/node_modules
RUN cd /tmp/package \
  && yarn next build \
  && rm -rf node_modules .next/cache 

FROM BASE
# 运行依赖
RUN apk add --no-cache openssh 
ENV NODE_ENV=production
COPY --from=PROD-modules /app/node_modules /app/node_modules
COPY --from=BUILD /tmp/package /app
WORKDIR /app
CMD [ "npm","run","start" ]
