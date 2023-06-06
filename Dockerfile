FROM node:18-alpine as dev

ARG TZ="Etc/GMT"

ENV TZ ${TZ}

WORKDIR /app

RUN apk add --no-cache --update \
  util-linux \
  git \
  python3 \
  py3-pip \
  make \
  bash \
  g++ \
  tzdata \
  && npm install -g pnpm

COPY package.json pnpm-lock.yaml /app/

RUN pnpm install --frozen-lockfile

COPY . /app

CMD ["pnpm", "dev"]

# starting point for production image
FROM node:10-alpine as prod

WORKDIR /app

COPY --from=dev /app /app

RUN pnpm build

CMD ["pnpm", "start"]
