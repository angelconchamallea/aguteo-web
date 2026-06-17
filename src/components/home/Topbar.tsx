const GUARANTEES = [
  'Envío gratis sobre $30.000 en RM',
  'Pago seguro con Webpay',
  'Atención de papás reales',
]

export default function Topbar() {
  return (
    <div className="bg-ink text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-2">
        {/* Mobile: solo la primera garantía */}
        <p className="text-center text-xs font-sans sm:hidden">{GUARANTEES[0]}</p>
        {/* sm+: las 3 separadas por · */}
        <p className="hidden text-center text-xs font-sans sm:block">
          {GUARANTEES.join(' · ')}
        </p>
      </div>
    </div>
  )
}
