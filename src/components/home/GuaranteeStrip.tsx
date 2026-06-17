const ITEMS = [
  {
    icon: '🚚',
    title: 'Despacho a todo Chile',
    description: 'Gratis sobre $30.000 en RM vía Starken o Chilexpress.',
  },
  {
    icon: '🔒',
    title: 'Compra 100% protegida',
    description: 'Pagás con Webpay Plus, el estándar de seguridad en Chile.',
  },
  {
    icon: '📖',
    title: 'Te acompañamos',
    description: 'Guías por etapa escritas por papás, para papás.',
  },
]

export default function GuaranteeStrip() {
  return (
    <section className="px-4 py-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 rounded-card border border-line bg-white p-4"
            >
              <span className="text-2xl shrink-0">{item.icon}</span>
              <div>
                <p className="text-sm font-semibold font-sans text-ink">{item.title}</p>
                <p className="text-xs font-sans text-muted mt-0.5">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
