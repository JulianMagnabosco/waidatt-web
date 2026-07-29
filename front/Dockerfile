# Etapa 1: build de Angular
# FROM node:22-alpine AS build

# WORKDIR /app
# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run build -- --configuration production

# # Etapa 2: servir con nginx
# FROM nginx:alpine

# COPY --from=build /app/dist/nombre-de-tu-proyecto /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

#---------NUEVO-----------------------------------------------------------------------
FROM node:24-alpine AS build
  
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build 

# Etapa final: solo dejamos los estáticos listos para copiar
FROM alpine:3.20
COPY --from=build /app/dist/webpage-waidatt/browser /dist
CMD ["true"]