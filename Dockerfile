FROM node:22-alpine

WORKDIR /app

RUN corepack enable

RUN corepack prepare pnpm@latest --activate

COPY . .

RUN pnpm install

RUN pnpm build

EXPOSE 3000

ENTRYPOINT ["pnpm", "start", "--"]

CMD []
