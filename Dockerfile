
FROM node:24-alpine

ENV NODE_ENV=production
ENV PORT=3000
ENV DOCKER=true

WORKDIR /app

COPY package.json ./
COPY app.js ./
COPY public ./public

EXPOSE 3000

USER node

CMD ["node", "app.js"]
