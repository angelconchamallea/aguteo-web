# CLAUDE.md — aguteo-web (Frontend Next.js)

> Contexto para agentes de IA. `AGENTS.md` espeja este archivo (Codex).
> Documentos obligatorios antes de codear: docs/DESIGN-SYSTEM.md y docs/API-SPEC.md.
> Última actualización: 2026-06-09

## 0. ESTÁS AQUÍ: el frontend

ESTE repo es `aguteo-web`. Tu trabajo: la tienda que ven los clientes.
NO escribes lógica de negocio, ni precios, ni admin, ni base de datos.

## 1. Mapa del sistema completo

**Aguteo Babys** es un ecommerce chileno de productos para bebés de 0 a 24 meses
(7 categorías: Ropa Bebé, Alimentación, Cuidado e Higiene, Descanso y Baño,
Juguetes, Mamá, Packs y Regalos), fundado por papás de gemelos. Diferenciador: navegación
y mini-guías **por etapa del bebé** que derivan a productos. Mercado: Chile,
CLP, español. El público llega principalmente desde Instagram → **mobile-first
es literal, no eslogan**.

El sistema son DOS repos que se comunican SOLO por la API REST:

```
┌──────────────────────────┐   API REST (docs/API-SPEC.md)   ┌─────────────────────────┐
│ aguteo-web (ESTE repo)   │ ───────────────────────────────▶│ aguteo-api (OTRO repo)  │
│ Next.js 14+ App Router   │                                 │ Laravel 11 + PostgreSQL │
│ TypeScript + Tailwind    │                                 │ Filament (admin)        │
│ Deploy: Vercel           │                                 │ Webpay Plus             │
└──────────────────────────┘                                 │ Deploy: Vultr Santiago  │
                                                              └─────────────────────────┘
```

## 2. Responsabilidades de ESTE repo

- Tienda pública: home, catálogo /tienda con filtros, detalle de producto,
  carrito, checkout, mini-guías, páginas de resultado de pago.
- Identidad visual según docs/DESIGN-SYSTEM.md — es ley, no sugerencia.
  Tokens en tailwind.config; CERO hex fuera de ahí.
- Tipos TypeScript espejo de docs/API-SPEC.md (src/types/api.ts) y cliente API
  tipado (src/lib/api.ts).
- SEO: metadata, OG, sitemap. Performance: ISR (catálogo revalidate 300s),
  next/image, Lighthouse mobile > 90.
- Checkout: recopila datos, valida formato, llama POST /orders y redirige a
  Webpay con el token que responde la API.

## 3. Fronteras: lo que NO haces aquí

- NUNCA calculas precios, descuentos, totales ni stock: muestras lo que la API
  responde. Si necesitas un dato que la API no entrega, el cambio se hace en
  aguteo-api y en API-SPEC.md primero — no lo simules ni lo derives en el front.
- NO hay panel de administración aquí (es Filament en el otro repo).
- NO tocas la base de datos ni hablas con Transbank directamente.
- PROHIBIDO localStorage/sessionStorage (regla del proyecto): carrito con
  Zustand + persistencia en cookie.
- NO implementas features del listado EXCLUIDO (sección 6).

## 4. Convenciones de código

- Código, componentes, variables: inglés. TODO texto visible: español chileno
  cálido (microcopy oficial en DESIGN-SYSTEM.md sección 5 — usar tal cual).
- App Router: Server Components por defecto; "use client" solo con interacción real.
- Categorías como árbol jerárquico: la navegación usa GET /categories (árbol completo)
  y GET /categories/{slug} (nodo + breadcrumb). El filtro de productos por categoría
  incluye automáticamente toda la rama descendiente. Sin concepto de "sección" separada.
- color_token viene siempre del nodo raíz (en la respuesta de /categories y en el
  campo `category.color_token` de los productos). Mapearlo con objeto, jamás if/else.
- Mobile-first: cada componente se escribe a 390px primero, luego md:/lg:.
- Skeletons para cargas de contenido; spinner solo dentro de botones de acción.
- Reglas visuales innegociables (detalle en DESIGN-SYSTEM.md):
  rose #F2568C EXCLUSIVO para CTAs de compra · color_token por categoría raíz fijo
  (viene de la API, mapear con objeto no con if/else) · fondo cream, texto ink,
  nunca blanco/negro puros · rounded-card y rounded-pill, ningún otro radio · Baloo 2
  títulos, Nunito cuerpo.
- Filtros del catálogo como searchParams → URLs compartibles.
- Commits: Conventional Commits.

## 5. Entornos

- Local: `npm run dev` (sin Docker). `NEXT_PUBLIC_API_URL` apunta al Sail del
  otro repo (http://localhost).
- Producción: Vercel. Revalidación on-demand vía /api/revalidate con secret.

## 6. Alcance v1 — EXCLUIDO (no implementar aunque parezca fácil)

Reviews, wishlist, login/registro de usuarios, comparador, multi-moneda,
multi-idioma, app móvil, dark mode.

## 7. Si los docs y tu criterio chocan

Los docs ganan. Si crees que un doc está mal, dilo explícitamente y espera
confirmación humana antes de desviarte. No "mejores" silenciosamente.
