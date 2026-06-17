# DESIGN-SYSTEM.md — Sistema de Diseño aguteo-web

Fuente de verdad visual. Deriva del logo (multicolor pastel, tipografía burbuja,
bloques de juguete) y del mockup de home aprobado el 2026-06-09.
Toda violación a este documento es un bug, aunque "se vea bien".

## 1. Tokens (tailwind.config.ts — copiar exacto)

```ts
theme: {
  extend: {
    colors: {
      aqua:      '#7DD9D4',
      sky:       '#5BA8E8',
      lavender:  '#A98BE0',
      tangerine: '#F5A623',
      rose:      '#F2568C',
      coral:     '#F08080',
      butter:    '#EFD75B',
      blush:     '#F8C8D4',
      cream:     '#FFFDF8',
      ink:       '#4A4A5C',
      // Pares de contraste para fondos pastel (texto sobre fondo suave):
      'aqua-soft': '#E3F7F5',      'aqua-deep': '#136B66',
      'lavender-soft': '#EFE9FA',  'lavender-deep': '#5A3FA0',
      'tangerine-soft': '#FDF1DC', 'tangerine-deep': '#8F5A06',
      'rose-soft': '#FDEAF1',      'rose-deep': '#9C2C55',
      'sky-soft': '#E7F0FB',       'sky-deep': '#1F548F',
      'butter-soft': '#FBF5DB',    'butter-deep': '#755F05',
      'blush-soft': '#FDECF2',
      muted: '#8B8498',            // texto secundario
      line: '#F0E8E0',             // bordes sutiles
    },
    fontFamily: {
      display: ['var(--font-baloo)'],   // Baloo 2 — títulos, precios, botones
      sans: ['var(--font-nunito)'],     // Nunito — cuerpo
    },
    borderRadius: { card: '1rem', pill: '9999px' },
  }
}
```

## 2. Reglas duras (no negociables)

1. **PROHIBIDO hex fuera de tailwind.config para colores de DISEÑO.** Ningún `#xxx`
   hardcodeado en componentes para botones, fondos, textos, bordes. EXCEPCIÓN ÚNICA:
   el color semántico de categoría/etapa que viene de la API como hex (ver regla 3) se
   aplica con `style={{ color: cat.color_hex }}` o similar. Ese hex es DATO, no diseño:
   nace en la base de datos, no en el código. Test del grep de hex en src/ debe dar 0
   resultados salvo donde se consume `color_hex`/`color_token` de la API.
2. **`rose` es EXCLUSIVO de acciones de compra**: agregar al carrito, comprar,
   pagar, y links "ver todos" hacia productos. Nada más es rose. Si todo grita,
   nada se escucha. Esta regla NO se relaja por la excepción de la regla 1: el hex de
   la API es para fondos/acentos de categoría y etapa, jamás para un CTA de compra.
3. **Asignación fija de colores semánticos** (es navegación, no decoración).
   El color de cada categoría raíz y cada etapa vive en la BASE DE DATOS y llega por
   la API en el campo `color_token` (valor hex, ej. "#7DD9D4"). El front lo aplica
   directo con `style`, NO lo mapea ni lo reinterpreta. Decisión 2026-06-15: se guarda
   hex en `Category`/`AgeStage` en vez de token nombrado, por simplicidad.
   - Etapas: 0-3m, 3-6m, 6-12m, 12-24m → su hex viene de age_stages.color_token
   - Categorías raíz: su hex viene de categories.color_token
   - Los hijos de una categoría heredan el hex de su ancestro raíz (la API lo entrega resuelto).
   Paleta de referencia (la misma que define los tokens de marca abajo): aqua #7DD9D4,
   sky #5BA8E8, lavender #A98BE0, tangerine #F5A623, rose #F2568C, coral #F08080,
   butter #EFD75B, blush #F8C8D4. El front NO debe asumir estos valores: usa el que
   entregue la API. Pero sí valida que un CTA nunca reciba el hex de rose por error.
4. **Sobre fondo `*-soft` solo se usa texto `*-deep` del MISMO color** (contraste AA).
   Nunca texto pastel sobre fondo pastel.
5. **Fondo de página siempre `cream`, nunca blanco puro. Texto principal `ink`,
   nunca negro puro.** Cards de producto: blancas con `border-line`.
6. **Radios: `rounded-card` en cards y bloques, `rounded-pill` en botones, inputs
   y chips.** Ningún otro radio existe.
7. **Tipografía: `font-display` solo en h1-h3, precios y botones. Todo lo demás
   `font-sans`.** Pesos: 700 títulos, 600 énfasis, 400 cuerpo.
8. **Mobile-first literal**: cada componente se escribe primero sin breakpoints
   (390px) y se expande con md:/lg:. El tráfico viene de Instagram.
9. **Textos UI en español chileno, cálidos**: "Agregar al carrito" no "Añadir";
   "¡Listo! Tu pedido va en camino" no "Orden procesada exitosamente".
   Nunca jerga técnica visible (error 422 → "Revisa los datos marcados").
10. **Imágenes con next/image siempre**, alt obligatorio, aspect-ratio fijo en
    cards (cuadrado 1:1) para que la grilla nunca salte.
11. **Skeletons, no spinners**, para cargas de contenido. Spinner solo en
    acciones de botón (agregando al carrito, pagando).
12. **PROHIBIDO localStorage/sessionStorage** para datos del carrito o checkout.
    Estado: Zustand en memoria + persistencia vía cookie (middleware/route handler).

## 3. Componentes base (contratos)

### Button
Variantes: `primary` (bg-rose, texto blanco, font-display, rounded-pill),
`secondary` (bg blanco, border-line, texto ink), `soft` (bg del color de contexto
-soft, texto -deep). Tamaños sm/md/lg. Estado loading con spinner inline.
Primary SOLO para acciones de compra (regla 2).

### Badge
Estilo bloque de juguete: cuadrado redondeado pequeño, `-rotate-2` o `rotate-3`
alternado, font-bold, fondo color semántico. Variantes: nuevo (butter),
descuento (coral, muestra "-X%"), etapa (color de la etapa), agotado (muted).

### ProductCard
Estructura fija: imagen 1:1 (fondo `*-soft` de su categoría raíz si no hay foto) +
badges superpuestos + ícono corazón (wishlist, decorativo en v1) arriba-derecha +
meta superior (CATEGORÍA · ETAPA en text-xs del color de la categoría) +
nombre (2 líneas máx, line-clamp-2, altura fija para que la grilla no salte) +
fila de rating + fila precio/acción.
- Rating: estrellas + (reviews_count). SOLO se renderiza si `rating !== null`
  (en v1 la API devuelve null → no se pinta nada, sin hueco). Ver Opción B en API-SPEC.
- Precio: font-display; si hay compare_at_price, tachado en muted al lado.
- Badges (estilo bloque, rotados): NUEVO (butter), -X% (coral), POCAS UNIDADES
  (blanco con texto de la categoría, abajo-izquierda) cuando stock < umbral.
- Acción: botón circular rose con ícono +. La card completa es link al detalle;
  el botón + y el corazón son acciones independientes (stopPropagation).

### StageCard / CategoryCard
StageCard: bloque `*-soft`, ícono + nombre `*-deep` + tagline. Grid 2x2 en
mobile, 4 columnas en desktop. CategoryCard: horizontal, ícono + nombre + conteo
de subcategorías ("3 subcat." / "4 packs"). Grid de las 7 categorías raíz + una
card "Ver todas". El color sale del color_token del nodo raíz (mapa objeto).

### PriceTag
Único componente que formatea precios. CLP con separador de miles con punto,
sin decimales: $12.990. Función única formatCLP() en lib/format.ts — prohibido
formatear precios en otro lugar.

### Header / Footer
Header: logo (texto multicolor según logo real o SVG), buscador pill, Cuenta,
carrito con contador rose. El ícono de corazón (wishlist) aparece en ProductCards
como decorativo en v1 (sin lógica de guardado hasta v2). Sticky en scroll con
fondo cream/95 + backdrop-blur.
Footer (fondo ink): columnas Tienda / Ayuda / Síguenos, sello "Pago seguro Webpay
Plus", "Hecho en Chile", RRSS (Instagram, WhatsApp, mail).

## 4. Estructura de páginas

### Home (orden fijo, aprobado en mockup MOCKUP-HOME.md — 2026-06-13)
1. **Topbar** (ink): 3 garantías — envío gratis sobre $30.000 RM · pago Webpay ·
   atención de papás reales.
2. **Header**: logo multicolor + buscador pill (con placeholder de ejemplo de
   productos) + Cuenta + Carrito con contador rose. Sticky con cream/95 + blur.
3. **Barra de categorías**: las 7 raíces como pills, cada una con su color_token.
4. **Hero compuesto**: bloque principal (badge "papás de gemelos" rotado, H1 con
   "bebé" en rose, 2 CTAs) + 2 tarjetas apiladas a la derecha (NOVEDAD aqua-soft /
   OFERTA tangerine-soft).
5. **Tira de garantías** (3 cards): despacho a todo Chile · compra protegida Webpay ·
   te acompañamos con guías.
6. **"¿Qué etapa vive tu bebé?"** (StageCards, grid 2x2 mobile / 4 desktop).
7. **"Explora por categoría"** (CategoryCards: 7 raíces + "Ver todas").
8. **"Favoritos de las mamás"** (featured, grid 2/2/4) con ProductCard completo.
9. **Banner de oferta** (ink, "Semana del bebé", CTA butter).
10. **"Packs que lo hacen fácil"** (3 PackCards con precio tachado y % ahorro).
11. **Bloque mini-guía** (aqua-soft).
12. **Franja de marcas** (logos/nombres en gris — Amma y las reales).
13. **Bloque historia "papás de gemelos"** (rose-soft) + newsletter integrado.
14. **Footer** (ink): columnas Tienda/Ayuda/Síguenos + sello Webpay + "Hecho en Chile".

El mockup HTML de referencia vive en docs/MOCKUP-HOME.md. Es referencia VISUAL de
layout y jerarquía, NO código a copiar: reimplementar con tokens de Tailwind y
componentes React, jamás con los hex inline del mockup.

### PackCard (categoría Packs y Regalos)
Bloque `*-soft` de coral/butter/sky según el pack, ícono grande, nombre, lista de
qué incluye (1 línea, text-xs), y fila de precio: precio del pack + precio original
tachado + badge "AHORRA X%". En v1 el pack es producto simple (ver MODELO-DATOS.md);
el desglose de contenido va en la descripción.

### Listado /tienda
Filtros como searchParams (URLs compartibles). Mobile: botón "Filtrar" abre
bottom sheet. Desktop: sidebar izquierda. Chips de filtros activos removibles.
Grid: 2 cols mobile / 3 md / 4 lg. Empty state ilustrado y cálido con CTA a
limpiar filtros.

### Detalle /producto/[slug]
Mobile: galería swipe arriba, info abajo, barra inferior fija con precio +
"Agregar al carrito" (siempre visible). Selector de talla: pills, agotadas
deshabilitadas con strikethrough. Stock bajo (<5): "¡Quedan pocas unidades!"
en coral. Sección "Te puede servir" (misma etapa) y guía relacionada si existe.

### Checkout
Una sola página, secuencia vertical: contacto → dirección (select región filtra
comunas) → envío (radio según comuna, muestra free_from si aplica) → cupón
(input + validar) → resumen → botón "Pagar con Webpay" (logo Webpay visible:
genera confianza en Chile). Errores inline bajo cada campo, en español cálido.

## 5. Microcopy de marca (usar tal cual)

- Carrito vacío: "Tu carrito está vacío 🍼 ¡Vamos a llenarlo de cositas lindas!"
- Agregado al carrito (toast): "¡Agregado! 🧸"
- Compra exitosa: "¡Gracias por tu compra! Tu pedido AGB-XXXX va en camino a
  acompañar a tu bebé."
- Pago fallido: "Algo pasó con el pago y no se completó. No te preocupes, no se
  hizo ningún cobro. ¿Lo intentamos de nuevo?"
- 404: "Ups, esta página se escondió como en el jugo de las escondidas 👶"
- Stock agotado: "Se agotó por ahora 💛"
