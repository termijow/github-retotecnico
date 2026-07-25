# GitHub Reto Técnico

Buscador de perfiles de GitHub con diseño oscuro y minimalista  

## Stack
- **Frontend:** Next.js + TailwindCSS (Puerto 3000)
- **Backend:** NestJS (Puerto 3001)
- **Infra:** Docker, Traefik, Cloudflare Tunnels (parte de la configuración ya está hecha por el homelab)

## Despliegue
Ejecuta con el SDK desde el homelab:

```bash
cd ~/infra/infra-ai-sdk
./infra build github-retotecnico
```

## Desarrollo Local
```bash
# Backend
cd backend && npm i && npm run start:dev

# Frontend
cd frontend && npm i && npm run dev
```
