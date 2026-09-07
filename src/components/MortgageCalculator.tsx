import { useMemo, useState, type CSSProperties } from 'react'
import type { Property } from '../data/properties'
import { calculateMortgage, formatCompactIDR, formatIDR } from '../lib/format'
import { site, waLink } from '../lib/site'

const TENORS = [5, 10, 15, 20, 25, 30]

export default function MortgageCalculator({ property }: { property: Property }) {
  const [dpPercent, setDpPercent] = useState(20)
  const [years, setYears] = useState(15)
  const [rate, setRate] = useState(7.5)

  const result = useMemo(
    () => calculateMortgage(property.price, dpPercent, years, rate),
    [property.price, dpPercent, years, rate],
  )

  const interestPct = Math.round(result.interestShare * 100)
  const principalPct = 100 - interestPct

  const waMessage = [
    `Halo ${site.agent.name}, saya tertarik dengan ${property.title} (${property.area}).`,
    '',
    `Harga: ${formatIDR(property.price)}`,
    `DP ${dpPercent}%: ${formatIDR(property.price - result.loan)}`,
    `Pinjaman: ${formatIDR(result.loan)}`,
    `Tenor: ${years} tahun · Bunga: ${String(rate).replace('.', ',')}% per tahun`,
    `Angsuran per bulan: ${formatIDR(Math.round(result.monthly))}`,
    '',
    'Boleh dibantu untuk proses selanjutnya?',
  ].join('\n')

  return (
    <div className="panel">
      <h2>Simulasi KPR</h2>

      <div className="field">
        <div className="field__label">
          <span>Harga properti</span>
        </div>
        <p className="field__static">{formatIDR(property.price)}</p>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="dp">
          <span>DP</span>
          <b>
            {dpPercent}% · {formatCompactIDR(property.price - result.loan)}
          </b>
        </label>
        <input
          id="dp"
          className="input"
          type="range"
          min={5}
          max={70}
          step={1}
          value={dpPercent}
          onChange={(e) => setDpPercent(Number(e.target.value))}
          style={{ '--fill': `${((dpPercent - 5) / 65) * 100}%` } as CSSProperties}
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="tenor">
          <span>Tenor</span>
        </label>
        <select
          id="tenor"
          className="input"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
        >
          {TENORS.map((t) => (
            <option key={t} value={t}>
              {t} tahun
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="rate">
          <span>Bunga per tahun</span>
        </label>
        <input
          id="rate"
          className="input"
          type="number"
          min={0}
          max={25}
          step={0.1}
          inputMode="decimal"
          value={rate}
          onChange={(e) => {
            const v = Number(e.target.value)
            setRate(Number.isFinite(v) ? Math.min(25, Math.max(0, v)) : 0)
          }}
        />
      </div>

      <div className="result">
        <p className="result__label">Angsuran per bulan</p>
        <p className="result__value">{formatCompactIDR(Math.round(result.monthly))}</p>
        <p className="result__note">{formatIDR(Math.round(result.monthly))}</p>

        <div className="split">
          <div
            className="split__bar"
            role="img"
            aria-label={`Komposisi total pembayaran: pokok ${principalPct} persen, bunga ${interestPct} persen`}
          >
            <i className="split__pokok" style={{ width: `${principalPct}%` }} />
            <i className="split__bunga" style={{ width: `${interestPct}%` }} />
          </div>
          <div className="split__legend">
            <span>
              <s className="split__pokok" aria-hidden="true" />
              Pokok {formatCompactIDR(result.loan)}
            </span>
            <span>
              <s className="split__bunga" aria-hidden="true" />
              Bunga {formatCompactIDR(Math.round(result.totalInterest))}
            </span>
          </div>
        </div>

        <p className="result__note">
          Total bayar {formatCompactIDR(Math.round(result.totalPaid))} selama {years * 12}{' '}
          bulan
        </p>
      </div>

      <div className="panel__actions" style={{ marginTop: 18 }}>
        <a
          className="btn btn--primary btn--block"
          href={waLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ajukan KPR
        </a>
        <a
          className="btn btn--ghost btn--block"
          href={waLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Kirim simulasi ke WA
        </a>
      </div>

      <p className="disclaimer">
        Simulasi memakai skema anuitas dan hanya sebagai gambaran. Angka final
        ditentukan bank penerbit, termasuk biaya provisi, asuransi, dan appraisal.
      </p>
    </div>
  )
}
