FROM bitnami/node:10
LABEL maintainer="Miguel Martinez <miguel@bitnami.com>"

COPY . /app
WORKDIR /app

RUN npm install

CMD ["node", "server.js"]
