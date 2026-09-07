const idr = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

const decimal = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 })

/** Rp 1.850.000.000 */
export const formatIDR = (value: number) => idr.format(value).replace(/ /g, ' ')

/** 1.850.000 */
export const formatNumber = (value: number) => decimal.format(value)

/** Rp 13,7 jt — bentuk ringkas untuk angka besar. */
export function formatCompactIDR(value: number): string {
  const oneShort = (n: number) =>
    new Intl.NumberFormat('id-ID', { maximumFractionDigits: 1 }).format(n)

  if (value >= 1_000_000_000) return `Rp ${oneShort(value / 1_000_000_000)} M`
  if (value >= 1_000_000) return `Rp ${oneShort(value / 1_000_000)} jt`
  if (value >= 1_000) return `Rp ${oneShort(value / 1_000)} rb`
  return `Rp ${decimal.format(value)}`
}

export interface RpcResult {
  /** Langkah 1 — THP x persentase RPC bank */
  capacity: number
  /** Langkah 2 — kapasitas dikurangi cicilan berjalan, tidak pernah negatif */
  maxInstallment: number
  /** Porsi kapasitas yang sudah terpakai cicilan berjalan (0-1) */
  usedShare: number
  /** Cicilan berjalan sudah menghabiskan seluruh kapasitas */
  overCommitted: boolean
}

/**
 * RPC (Repayment Capacity) — batas cicilan yang umumnya disetujui bank:
 *
 *   1. Kapasitas maksimal  = THP x persentase RPC
 *   2. Batas cicilan KPR   = kapasitas maksimal - cicilan berjalan
 *
 * Contoh: THP Rp 10.000.000, RPC 50%, cicilan berjalan Rp 1.000.000
 *   -> kapasitas Rp 5.000.000, batas cicilan KPR Rp 4.000.000 per bulan.
 */
export function calculateRpc(
  monthlyIncome: number,
  rpcPercent: number,
  existingInstallment: number,
): RpcResult {
  const income = Math.max(0, monthlyIncome)
  const existing = Math.max(0, existingInstallment)
  const capacity = Math.round(income * (rpcPercent / 100))
  const maxInstallment = Math.max(0, capacity - existing)

  return {
    capacity,
    maxInstallment,
    usedShare: capacity > 0 ? Math.min(1, existing / capacity) : 0,
    overCommitted: capacity > 0 && existing >= capacity,
  }
}
