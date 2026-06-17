# Aguteo Babys — aguteo-web (contexto para agentes)

Estás en el repo FRONTEND (Next.js + TypeScript + Tailwind: la tienda pública).
La fuente de verdad es `CLAUDE.md` en la raíz: léelo completo antes de escribir
código, junto con docs/DESIGN-SYSTEM.md y docs/API-SPEC.md.

Reglas que NUNCA se rompen (detalle en CLAUDE.md):
1. Este repo NUNCA calcula precios/stock/totales: muestra lo que responde la API.
2. CERO colores hex fuera de tailwind.config; rose exclusivo para CTAs de compra.
3. Prohibido localStorage/sessionStorage; carrito con Zustand + cookie.
4. Mobile-first literal (tráfico viene de Instagram); textos UI en español chileno.
5. Tipos TS espejo de API-SPEC.md; si falta un dato, se cambia la API primero.
6. No implementar features EXCLUIDAS de v1.
7. Los docs ganan a tu criterio: si crees que están mal, pregunta primero.