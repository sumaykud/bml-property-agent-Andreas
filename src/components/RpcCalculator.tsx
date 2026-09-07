import { useMemo, useState, type CSSProperties } from 'react'
import type { Property } from '../data/properties'
import { calculateRpc, formatCompactIDR, formatIDR, formatNumber } from '../lib/format'
import { site, waLink } from '../lib/site'

/** Batas atas yang wajar untuk input rupiah, sekaligus penahan salah ketik. */
const MAX_INPUT = 1_000_000_000

/** Ambil angkanya saja dari ketikan pengguna, lalu batasi. */
const parseRupiah = (raw: string) => {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return 0
  return Math.min(MAX_INPUT, Number(digits))
}

export default function RpcCalculator({ property }: { property: Property }) {
  const [income, setIncome] = useState(10_000_000)
  const [rpcPercent, setRpcPercent] = useState(50)
  const [existing, setExisting] = useState(1_000_000)

  const result = useMemo(
    () => calculateRpc(income, rpcPercent, existing),
    [income, rpcPercent, existing],
  )

  const waMessage = [
    `Halo ${site.agent.name}, saya tertarik dengan ${property.title} (${property.area}).`,
    '',
    'Hasil simulasi RPC saya:',
    `Gaji bersih (THP): ${formatIDR(income)} / bulan`,
    `Persentase RPC: ${rpcPercent}%`,
    `Kapasitas maksimal: ${formatIDR(result.capacity)} / bulan`,
    `Cicilan berjalan: ${formatIDR(existing)} / bulan`,
    `Batas cicilan KPR: ${formatIDR(result.maxInstallment)} / bulan`,
    '',
    'Boleh dibantu untuk proses selanjutnya?',
  ].join('\n')

  return (
    <div className="panel">
      <h2>Simulasi RPC</h2>
      <p className="panel__sub">
        Repayment Capacity — batas cicilan yang umumnya disetujui bank berdasarkan
        penghasilan Anda.
      </p>

      <div className="field">
        <label className="field__label" htmlFor="income">
          <span>Gaji bersih (THP) per bulan</span>
        </label>
        <div className="input-money">
          <span aria-hidden="true">Rp</span>
          <input
            id="income"
            className="input"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={formatNumber(income)}
            onChange={(e) => setIncome(parseRupiah(e.target.value))}
          />
        </div>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="rpc">
          <span>Persentase RPC bank</span>
          <b>{rpcPercent}%</b>
        </label>
        <input
          id="rpc"
          type="range"
          min={20}
          max={60}
          step={1}
          value={rpcPercent}
          onChange={(e) => setRpcPercent(Number(e.target.value))}
          style={{ '--fill': `${((rpcPercent - 20) / 40) * 100}%` } as CSSProperties}
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="existing">
          <span>Cicilan berjalan per bulan</span>
        </label>
        <div className="input-money">
          <span aria-hidden="true">Rp</span>
          <input
            id="existing"
            className="input"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={formatNumber(existing)}
            onChange={(e) => setExisting(parseRupiah(e.target.value))}
          />
        </div>
        <p className="field__hint">Kredit motor, mobil, KTA, kartu kredit, dan sejenisnya.</p>
      </div>

      <div className="result">
        <ol className="steps">
          <li>
            <span>Kapasitas maksimal</span>
            <b>
              {formatCompactIDR(income)} × {rpcPercent}% ={' '}
              {formatCompactIDR(result.capacity)}
            </b>
          </li>
          <li>
            <span>Dikurangi cicilan berjalan</span>
            <b>
              {formatCompactIDR(result.capacity)} − {formatCompactIDR(existing)} ={' '}
              {formatCompactIDR(result.maxInstallment)}
            </b>
          </li>
        </ol>

        <p className="result__label">Batas maksimal cicilan KPR</p>
        <p className="result__value">{formatCompactIDR(result.maxInstallment)}</p>
        <p className="result__note">{formatIDR(result.maxInstallment)} per bulan</p>

        <div className="split">
          <div
            className="split__bar"
            role="img"
            aria-label={`Dari kapasitas ${formatIDR(result.capacity)}, cicilan berjalan memakai ${formatIDR(existing)} dan tersisa ${formatIDR(result.maxInstallment)} untuk KPR`}
          >
            <i
              className="split__bunga"
              style={{ width: `${result.usedShare * 100}%` }}
            />
            <i
              className="split__pokok"
              style={{ width: `${(1 - result.usedShare) * 100}%` }}
            />
          </div>
          <div className="split__legend">
            <span>
              <s className="split__bunga" aria-hidden="true" />
              Cicilan berjalan {formatCompactIDR(existing)}
            </span>
            <span>
              <s className="split__pokok" aria-hidden="true" />
              Sisa untuk KPR {formatCompactIDR(result.maxInstallment)}
            </span>
          </div>
        </div>

        {result.overCommitted && (
          <p className="notice" role="status">
            Cicilan berjalan sudah menghabiskan seluruh kapasitas. Lunasi atau turunkan
            cicilan yang ada dulu agar ada ruang untuk KPR baru.
          </p>
        )}
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
        Simulasi RPC hanya gambaran awal. Persentase RPC dan keputusan akhir berbeda
        tiap bank, dan masih dipengaruhi rekam jejak BI Checking, masa kerja, serta
        penilaian agunan.
      </p>
    </div>
  )
}
