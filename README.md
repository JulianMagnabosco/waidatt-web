# Web para waidatt

## Despliegue on vps
```bash
git clone tu-repo.git
cd mi-proyecto
nano .env              # completar credenciales
nano Caddyfile         # poner tu dominio real
docker compose up -d --build
```

## Ver el compose
```bash
docker compose logs -f <caddy/back/front>
```