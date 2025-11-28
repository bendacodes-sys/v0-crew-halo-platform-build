# Despliegue en Render

Este proyecto está configurado para desplegarse en Render.

## Pasos para desplegar

### Opción 1: Usando render.yaml (Recomendado)

1. **Conecta tu repositorio a Render:**
   - Ve a [Render Dashboard](https://dashboard.render.com)
   - Haz clic en "New +" → "Web Service"
   - Conecta tu repositorio de GitHub/GitLab/Bitbucket

2. **Render detectará automáticamente el archivo `render.yaml`:**
   - El servicio se configurará automáticamente
   - Build Command: `pnpm install && pnpm build`
   - Start Command: `pnpm start`

3. **Variables de entorno:**
   - `NODE_ENV` se establece automáticamente como `production`
   - Render asignará automáticamente el `PORT`

### Opción 2: Configuración manual

Si prefieres configurar manualmente:

1. **Tipo de servicio:** Web Service
2. **Entorno:** Node
3. **Build Command:** `pnpm install && pnpm build`
4. **Start Command:** `pnpm start`
5. **Plan:** Starter (puedes cambiar según tus necesidades)

## Requisitos

- **Node.js:** Render detectará automáticamente la versión desde `package.json`
- **Package Manager:** pnpm (asegúrate de tener `pnpm-lock.yaml` en el repo)

## Notas importantes

- Render usa automáticamente el puerto asignado, Next.js lo detecta desde `process.env.PORT`
- El health check está configurado en la ruta `/`
- Las imágenes están configuradas como `unoptimized: true` en `next.config.mjs` (adecuado para Render)

## Troubleshooting

Si encuentras problemas:

1. **Build falla:** Verifica los logs en Render Dashboard
2. **Puerto:** Next.js usa automáticamente `PORT` de las variables de entorno
3. **Dependencias:** Asegúrate de que `pnpm-lock.yaml` esté en el repositorio

## Costos

- **Plan Starter:** Gratis (con limitaciones)
- **Plan Standard:** $7/mes por servicio
- Consulta [Render Pricing](https://render.com/pricing) para más detalles


