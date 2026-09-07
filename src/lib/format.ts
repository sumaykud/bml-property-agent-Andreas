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

export interface MortgageResult {
  loan: number
  monthly: number
  totalPaid: number
  totalInterest: number
  interestShare: number
}

/**
 * Anuitas standar: M = P * i / (1 - (1 + i)^-n), dengan i bunga bulanan
 * dan n jumlah bulan. Bunga 0% ditangani terpisah agar tidak dibagi nol.
 */
export function calculateMortgage(
  price: number,
  downPaymentPercent: number,
  years: number,
  annualRatePercent: number,
): MortgageResult {
  const loan = Math.max(0, Math.round(price * (1 - downPaymentPercent / 100)))
  const months = Math.max(1, Math.round(years * 12))
  const monthlyRate = annualRatePercent / 100 / 12

  const monthly =
    monthlyRate === 0
      ? loan / months
      : (loan * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))

  const totalPaid = monthly * months
  const totalInterest = Math.max(0, totalPaid - loan)

  return {
    loan,
    monthly,
    totalPaid,
    totalInterest,
    interestShare: totalPaid > 0 ? totalInterest / totalPaid : 0,
  }
}
