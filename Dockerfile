# ---------- Stage 1: сборка ----------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# VITE_API_BASE не задаём: в prod-режиме config.js отдаст "",
# и fetch будет ходить на относительный /api/... через nginx.
RUN npm run build

# ---------- Stage 2: раздача ----------
FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
