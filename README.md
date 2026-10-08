# Apolo Media · Landing page

Landing page estática de Apolo Media (HTML + CSS + JS, sin dependencias).

## Estructura

- `index.html` – contenido de la landing
- `styles.css` – estilos
- `script.js` – menú móvil, animaciones, contadores y formulario (envía por WhatsApp)
- `favicon.svg` – ícono
- `vercel.json` – configuración de Vercel

## Personalizar

Edita `CONFIG` al inicio de `script.js` con el número de WhatsApp y correo reales.

## Desarrollo local

Abre `index.html` en el navegador o sirve la carpeta con `npx serve .`.

## Despliegue

Desplegado en Vercel. Cada push a la rama conectada genera un nuevo deploy.

## Despliegue automático (GitHub Actions)

`.github/workflows/deploy.yml` despliega a Vercel en cada push de cualquier colaborador:

- Push a la rama de producción (`PRODUCTION_BRANCH` en el workflow) → producción.
- Push a cualquier otra rama → preview con URL temporal.

Requiere el secreto `VERCEL_TOKEN` en *Settings → Secrets and variables → Actions* del repo.
Crea el token en https://vercel.com/account/settings/tokens con alcance en el equipo "apolo media".

## Auto-merge de ramas

`.github/workflows/automerge.yml` fusiona automáticamente cualquier rama (push o PR) en la rama de
producción y luego lanza el deploy. Las ramas de forks se ignoran. Si hay conflicto, el job falla y
comenta en el PR para que se resuelva a mano.
