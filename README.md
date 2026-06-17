# aguteo-web

Frontend de **Aguteo Babys** — la tienda que ven los clientes.
Ecommerce chileno de productos para bebés de 0 a 24 meses. Consume la API de `aguteo-api`.

## Stack

Next.js 14+ (App Router) · TypeScript · Tailwind CSS · Zustand (carrito).
Deploy: Vercel.

## Empieza por acá (orden de lectura para humanos y agentes de IA)

1. **CLAUDE.md** — qué es este repo, qué te toca, qué NO te toca, convenciones.
2. **docs/DESIGN-SYSTEM.md** — identidad visual, tokens, componentes, microcopy. Es ley.
3. **docs/API-SPEC.md** — contrato de la API que consumes (copia espejo del backend).

Estado del proyecto y próximo hito: ver **ESTADO.md**.
Prompts para trabajar con IA: ver **PROMPTS.md** y **PROMPTS-CONSTRUCCION.md**.

## Arranque local

```bash
npm install
cp .env.example .env.local        # definir NEXT_PUBLIC_API_URL=http://localhost
npm run dev
```
Requiere el backend (aguteo-api) corriendo en Sail para datos reales.

## Reglas de oro (detalle en CLAUDE.md y DESIGN-SYSTEM.md)

- Este repo NUNCA calcula precios/totales: muestra lo que responde la API.
- CERO colores hex fuera de tailwind.config; `rose` solo para CTAs de compra.
- Prohibido localStorage/sessionStorage: carrito con Zustand + cookie.
- Mobile-first literal (el tráfico viene de Instagram).
- Textos en español chileno cálido (microcopy oficial en DESIGN-SYSTEM.md).
