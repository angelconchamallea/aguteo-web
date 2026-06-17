/** Formatea un entero CLP con separador de miles (punto) sin decimales. Ej: 12990 → "$12.990" */
export function formatCLP(amount: number): string {
  return '$' + amount.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}
