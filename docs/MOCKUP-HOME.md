# MOCKUP-HOME.md — Referencia visual de la home (aguteo-web)

> ⚠️ CÓMO USAR ESTE ARCHIVO (leer antes de tocar nada)
>
> Este HTML es una REFERENCIA VISUAL de layout, jerarquía y composición de la home,
> aprobada el 2026-06-13. Define QUÉ se ve y en qué orden, NO cómo se programa.
>
> REGLAS AL IMPLEMENTAR (no negociables, ver DESIGN-SYSTEM.md):
> 1. NO copies los colores hex inline de este mockup. Usa los tokens de tailwind.config
>    (aqua, rose, blush, etc.). Los hex de aquí son solo para que se vea en el navegador.
> 2. NO copies los estilos inline. Reimplementa con clases de Tailwind y componentes React.
> 3. `rose` (#F2568C) es SOLO para CTAs de compra y contador de carrito. En el mockup
>    está usado así; respétalo.
> 4. Cada categoría y etapa usa su color_token, que viene de la API (mapa objeto, no if/else).
> 5. Mobile-first: este mockup está en desktop. Diseña primero a 390px y expande.
> 6. Las estrellas de rating: SOLO si rating !== null (en v1 la API da null → no se pintan).
> 7. Las marcas (Amma, etc.) y productos del mockup son EJEMPLO. Vienen de la API real.
>
> Estructura textual y reglas de cada bloque: ver DESIGN-SYSTEM.md sección 4 (Home).
> Este archivo es el complemento visual de esa especificación.

---

## HTML de referencia (renderizable en navegador para ver el objetivo)

```html

<!-- Topbar: 3 garantías sobre fondo ink -->
<div class="topbar">Envío gratis sobre $30.000 en RM · Pago seguro con Webpay · Atención de papás reales</div>

<!-- Header: logo multicolor + buscador + cuenta + carrito(rose badge) -->
<header>
  <div class="logo">Aguteo BABYS</div>
  <input class="search" placeholder="Busca pañales, compotas, pijamas…">
  <nav class="acciones">Cuenta · Carrito(3)</nav>
</header>

<!-- Barra de las 7 categorías raíz, cada una con su color_token -->
<nav class="categorias">
  Ropa Bebé(blush) · Alimentación(butter) · Cuidado e Higiene(aqua) ·
  Descanso y Baño(lavender) · Juguetes(tangerine) · Mamá(sky) · Packs y Regalos(coral)
</nav>

<!-- Hero compuesto: principal + 2 tarjetas (novedad/oferta) -->
<section class="hero">
  <div class="hero-main">
    <span class="badge-juguete">HECHO POR PAPÁS DE GEMELOS</span>
    <h1>Acompañamos cada etapa de tu <em class="rose">bebé</em></h1>
    <p>Todo lo que necesitas para los primeros 24 meses, a buen precio.</p>
    <button class="cta-rose">Comprar ahora</button>
    <button class="cta-secondary">Ver por etapa</button>
  </div>
  <aside class="hero-cards">
    <div class="card-novedad aqua-soft">NOVEDAD · Llegaron compotas Amma</div>
    <div class="card-oferta tangerine-soft">OFERTA · 2x1 en pañales seleccionados</div>
  </aside>
</section>

<!-- Tira de 3 garantías -->
<section class="garantias">
  Despacho a todo Chile (Starken/Chilexpress) · Compra protegida (Webpay Plus) ·
  Te acompañamos (guías por etapa)
</section>

<!-- Etapas del bebé: StageCards, color por etapa -->
<section class="etapas">
  <h2>¿Qué etapa vive tu bebé?</h2>
  <div class="grid-4">
    0–3m Recién llegado (aqua) · 3–6m Descubre el mundo (lavender) ·
    6–12m Primeras papillas (tangerine) · 12–24m Primeros pasos (rose)
  </div>
</section>

<!-- Categorías: 7 CategoryCards + "Ver todas", con conteo de subcat -->
<section class="categorias-grid">
  <h2>Explora por categoría</h2>
  <div class="grid-4">
    Ropa Bebé (3 subcat) · Alimentación (3) · Cuidado (3) · Descanso y Baño (5) ·
    Juguetes (4) · Mamá (4) · Packs (4) · Ver todas →
  </div>
</section>

<!-- Productos destacados: ProductCard completo -->
<section class="destacados">
  <h2>Favoritos de las mamás · Ver todos →</h2>
  <div class="grid-4">
    <!-- ProductCard: meta(CATEGORÍA·ETAPA) + nombre + rating(solo si !=null) +
         precio(tachado si oferta) + badge(NUEVO/-15%/POCAS UNIDADES) +
         corazón(decorativo v1) + botón + (rose) -->
    [Conjunto ositos · ROPA 0-6M · ★★★★★(24) · $12.990 · NUEVO]
    [Compota Amma · 6M+ · ★★★★☆(58) · $1.590 / $1.890 · -15%]
    [Toallitas x3 · CUIDADO · ★★★★★(112) · $4.490 · ♥]
    [Mordedor nube · JUGUETES 3-12M · ★★★★★(37) · $6.990 · POCAS UNIDADES]
  </div>
</section>

<!-- Banner oferta (ink) -->
<section class="banner-oferta ink">
  SEMANA DEL BEBÉ · Hasta 30% en alimentación y cuidado · [Ver ofertas (butter)]
</section>

<!-- Packs: 3 PackCards con precio tachado y % ahorro -->
<section class="packs">
  <h2>Packs que lo hacen fácil</h2>
  <div class="grid-3">
    [Pack Recién Nacido (coral) · bodies+gorrito+manta+mordedor · $24.990/$31.000 · AHORRA 20%]
    [Pack Alimentación (butter) · 6 compotas+2 jugos+babero · $14.490/$17.500 · AHORRA 17%]
    [Pack Mamá (sky) · cojín lactancia+crema+bolso · $29.990/$36.000 · AHORRA 17%]
  </div>
</section>

<!-- Mini-guía (aqua-soft) -->
<section class="miniguia aqua-soft">
  Mini-guía: tu bebé a los 6 meses · [Leer guía]
</section>

<!-- Franja de marcas (las reales vienen de la API) -->
<section class="marcas">Amma · Pi Mamá · BabyFresh · Cottonbaby · Aguteo</section>

<!-- Historia papás de gemelos (rose-soft) + newsletter -->
<section class="historia rose-soft">
  Somos papás de gemelos · [input correo] [Suscribirme (rose)]
</section>

<!-- Footer (ink): Tienda / Ayuda / Síguenos + sello Webpay -->
<footer class="ink">
  Aguteo Babys · Tienda · Ayuda · Síguenos(IG/WhatsApp/mail) ·
  © 2026 Hecho en Chile · Pago seguro con Webpay Plus
</footer>
```

---

## Nota sobre el HTML completo con estilos

La versión renderizable completa (con todos los estilos inline para ver el objetivo
en un navegador) se generó en la conversación de diseño. Si la quieres como archivo
aparte para abrir en el navegador, guárdala como `mockup-home-preview.html` en
recursos/ (NO en el repo de código). Este MOCKUP-HOME.md es la referencia estructural
que el agente debe seguir; el preview es solo para tu ojo humano.

*Aprobado: 2026-06-13. Complementa DESIGN-SYSTEM.md sección 4.*
