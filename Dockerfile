FROM node:20-bookworm

WORKDIR /app

COPY . .

RUN corepack enable && pnpm install

EXPOSE 5173 8000

CMD ["bash", "start.sh"]
