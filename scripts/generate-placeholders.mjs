/**
 * Membuat berkas foto placeholder untuk setiap properti.
 *
 *   node scripts/generate-placeholders.mjs
 *
 * Hasilnya PNG berpalet (hanya beberapa warna) sehingga ukurannya kecil,
 * tapi dimensinya sudah persis seperti foto asli yang diharapkan — jadi
 * mengganti foto cukup dengan menimpa berkasnya, tanpa mengubah kode.
 *
 * Tidak butuh pustaka apa pun: PNG-nya ditulis langsung memakai zlib bawaan.
 */

import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/** Ukuran foto yang diharapkan. Diubah di sini kalau standarnya berubah. */
export const PHOTO_WIDTH = 1600
export const PHOTO_HEIGHT = 1200

// ---------------------------------------------------------------- PNG writer

const CRC_TABLE = (() => {
  const t = new Int32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c
  }
  return t
})()

const crc32 = (buf) => {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

const chunk = (type, data) => {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'latin1'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}

/** Menulis PNG berpalet 8-bit. `palette` berisi [r,g,b]. */
function encodePng(width, height, pixels, palette) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 3 // color type: indexed
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  const plte = Buffer.alloc(palette.length * 3)
  palette.forEach(([r, g, b], i) => {
    plte[i * 3] = r
    plte[i * 3 + 1] = g
    plte[i * 3 + 2] = b
  })

  // Satu byte filter (0 = None) di depan tiap baris.
  const raw = Buffer.alloc(height * (width + 1))
  for (let y = 0; y < height; y++) {
    raw[y * (width + 1)] = 0
    pixels.copy(raw, y * (width + 1) + 1, y * width, (y + 1) * width)
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('PLTE', plte),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

// ------------------------------------------------------------------ drawing

const makeCanvas = (w, h, fill = 0) => {
  const px = Buffer.alloc(w * h, fill)
  const set = (x, y, c) => {
    x = Math.round(x)
    y = Math.round(y)
    if (x < 0 || y < 0 || x >= w || y >= h) return
    px[y * w + x] = c
  }
  const rect = (x, y, rw, rh, c) => {
    for (let j = 0; j < rh; j++) for (let i = 0; i < rw; i++) set(x + i, y + j, c)
  }
  /** Garis Bresenham dengan ketebalan (kuas persegi). */
  const line = (x0, y0, x1, y1, c, thickness = 1) => {
    x0 = Math.round(x0); y0 = Math.round(y0)
    x1 = Math.round(x1); y1 = Math.round(y1)
    const dx = Math.abs(x1 - x0)
    const dy = -Math.abs(y1 - y0)
    const sx = x0 < x1 ? 1 : -1
    const sy = y0 < y1 ? 1 : -1
    let err = dx + dy
    const o = Math.floor(thickness / 2)
    for (;;) {
      rect(x0 - o, y0 - o, thickness, thickness, c)
      if (x0 === x1 && y0 === y1) break
      const e2 = 2 * err
      if (e2 >= dy) { err += dy; x0 += sx }
      if (e2 <= dx) { err += dx; y0 += sy }
    }
  }
  const box = (x, y, bw, bh, c, t = 1) => {
    line(x, y, x + bw, y, c, t)
    line(x + bw, y, x + bw, y + bh, c, t)
    line(x + bw, y + bh, x, y + bh, c, t)
    line(x, y + bh, x, y, c, t)
  }
  return { px, set, rect, line, box }
}

/** Font bitmap 5x7 seadanya — cukup untuk angka, "x", dan beberapa huruf. */
const GLYPHS = {
  '0': ['01110','10001','10011','10101','11001','10001','01110'],
  '1': ['00100','01100','00100','00100','00100','00100','01110'],
  '2': ['01110','10001','00001','00010','00100','01000','11111'],
  '3': ['11111','00010','00100','00010','00001','10001','01110'],
  '4': ['00010','00110','01010','10010','11111','00010','00010'],
  '5': ['11111','10000','11110','00001','00001','10001','01110'],
  '6': ['00110','01000','10000','11110','10001','10001','01110'],
  '7': ['11111','00001','00010','00100','01000','01000','01000'],
  '8': ['01110','10001','10001','01110','10001','10001','01110'],
  '9': ['01110','10001','10001','01111','00001','00010','01100'],
  x: ['00000','00000','10001','01010','00100','01010','10001'],
  ' ': ['00000','00000','00000','00000','00000','00000','00000'],
  F: ['11111','10000','10000','11110','10000','10000','10000'],
  O: ['01110','10001','10001','10001','10001','10001','01110'],
  T: ['11111','00100','00100','00100','00100','00100','00100'],
  '/': ['00001','00010','00010','00100','01000','01000','10000'],
}

const drawText = (canvas, text, x, y, scale, color) => {
  let cx = x
  for (const ch of String(text)) {
    const g = GLYPHS[ch] ?? GLYPHS[' ']
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 5; c++) {
        if (g[r][c] === '1') canvas.rect(cx + c * scale, y + r * scale, scale, scale, color)
      }
    }
    cx += 6 * scale
  }
  return cx - x
}

const textWidth = (text, scale) => String(text).length * 6 * scale - scale

// ------------------------------------------------------------------ palettes

/** Rona per properti, senada dengan placeholder SVG di aplikasi. */
const HUES = [214, 196, 226, 176, 206, 240]

const hslToRgb = (h, s, l) => {
  s /= 100; l /= 100
  const k = (n) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)]
}

// -------------------------------------------------------------- the artwork

function renderPhoto({ hue, type, index, total }) {
  const W = PHOTO_WIDTH
  const H = PHOTO_HEIGHT

  const palette = [
    hslToRgb(hue, 60, 95), // 0 latar
    hslToRgb(hue, 34, 62), // 1 garis
    hslToRgb(hue, 24, 78), // 2 garis tipis
    hslToRgb(hue, 20, 45), // 3 teks
  ]

  const c = makeCanvas(W, H, 0)
  const cx = W / 2
  const t = Math.round(W / 300) // ketebalan garis skala

  if (type === 'apartemen') {
    const bw = W * 0.34
    const bh = H * 0.52
    const bx = cx - bw / 2
    const by = H * 0.20
    c.box(bx, by, bw, bh, 1, t)
    // menara pendamping
    c.box(bx + bw, by + bh * 0.32, bw * 0.46, bh * 0.68, 1, t)
    // jendela
    const cols = 4, rows = 5
    for (let r = 0; r < rows; r++) {
      for (let col = 0; col < cols; col++) {
        const ww = bw / (cols * 2.1)
        const wh = bh / (rows * 2.4)
        c.box(bx + bw * 0.12 + col * (bw * 0.76) / (cols - 1) - ww / 2,
              by + bh * 0.12 + r * (bh * 0.72) / (rows - 1) - wh / 2, ww, wh, 2, t)
      }
    }
  } else {
    const bw = W * 0.42
    const bh = H * 0.30
    const bx = cx - bw / 2
    const by = H * 0.44
    // atap
    c.line(bx - bw * 0.10, by, cx, by - bh * 0.78, 1, t)
    c.line(cx, by - bh * 0.78, bx + bw + bw * 0.10, by, 1, t)
    // dinding
    c.line(bx, by, bx, by + bh, 1, t)
    c.line(bx + bw, by, bx + bw, by + bh, 1, t)
    // pintu & jendela
    c.box(cx - bw * 0.11, by + bh * 0.34, bw * 0.22, bh * 0.66, 2, t)
    c.box(bx + bw * 0.12, by + bh * 0.28, bw * 0.17, bh * 0.30, 2, t)
    c.box(bx + bw * 0.71, by + bh * 0.28, bw * 0.17, bh * 0.30, 2, t)
  }

  // garis tanah
  c.line(W * 0.16, H * 0.745, W * 0.84, H * 0.745, 1, t)

  // label dimensi + nomor foto
  const label = `${PHOTO_WIDTH}x${PHOTO_HEIGHT}`
  const s1 = Math.round(W / 260)
  drawText(c, label, cx - textWidth(label, s1) / 2, H * 0.80, s1, 3)

  const counter = `FOTO ${index}/${total}`
  const s2 = Math.round(W / 340)
  drawText(c, counter, cx - textWidth(counter, s2) / 2, H * 0.865, s2, 3)

  return encodePng(W, H, c.px, palette)
}

// ------------------------------------------------------------------- runner

// Baca daftar properti langsung dari sumber datanya agar tidak pernah beda.
const src = fs.readFileSync(path.join(ROOT, 'src/data/properties.ts'), 'utf8')
const entries = [...src.matchAll(
  /slug:\s*'([^']+)'[\s\S]*?type:\s*'(rumah|apartemen)'[\s\S]*?photoCount:\s*(\d+)[\s\S]*?tone:\s*(\d+)/g,
)].map((m) => ({ slug: m[1], type: m[2], photoCount: Number(m[3]), tone: Number(m[4]) }))

if (!entries.length) {
  console.error('Tidak ada properti terbaca dari src/data/properties.ts')
  process.exit(1)
}

/**
 * Foto asli dari kamera/agen hampir selalu JPEG, dan berkas placeholder harus
 * bernama sama persis agar cukup ditimpa tanpa menyentuh kode. Jadi PNG hasil
 * render di atas dikonversi ke .jpg memakai ffmpeg bila tersedia.
 */
const hasFfmpeg = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' }).status === 0
if (!hasFfmpeg) {
  console.warn(
    'ffmpeg tidak ditemukan — placeholder ditulis sebagai .png.\n' +
      'Aplikasi mencari .jpg, jadi pasang ffmpeg lalu jalankan ulang skrip ini.\n',
  )
}

let written = 0
let bytes = 0

for (const p of entries) {
  const dir = path.join(ROOT, 'public/images/properties', p.slug)
  fs.mkdirSync(dir, { recursive: true })

  for (let i = 1; i <= p.photoCount; i++) {
    const stem = path.join(dir, String(i).padStart(2, '0'))
    const png = renderPhoto({
      hue: HUES[(p.tone + i - 1) % HUES.length],
      type: p.type,
      index: i,
      total: p.photoCount,
    })

    if (hasFfmpeg) {
      const tmp = `${stem}.tmp.png`
      fs.writeFileSync(tmp, png)
      const r = spawnSync(
        'ffmpeg',
        ['-v', 'error', '-i', tmp, '-q:v', '8', '-y', `${stem}.jpg`],
        { stdio: 'inherit' },
      )
      fs.rmSync(tmp, { force: true })
      if (r.status !== 0) {
        console.error(`Gagal mengonversi ${stem}.jpg`)
        process.exit(1)
      }
      bytes += fs.statSync(`${stem}.jpg`).size
    } else {
      fs.writeFileSync(`${stem}.png`, png)
      bytes += png.length
    }
    written++
  }
  console.log(`${p.slug.padEnd(28)} ${p.photoCount} foto`)
}

console.log(`\n${written} berkas, total ${(bytes / 1024).toFixed(0)} kB`)
console.log(`Ukuran tiap foto: ${PHOTO_WIDTH} x ${PHOTO_HEIGHT} px`)
