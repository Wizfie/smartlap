const fs = require('fs');
const path = require('path');
const prisma = require('../src/config/prisma');

const imgDir = path.join(__dirname, '../../frontend/public/images/laptops');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

// 1. Kumpulan Template Visual Gambar SVG Lokal
const svgStyles = [
  { key: 'asus-zenbook', brand: 'ASUS', model: 'Zenbook OLED', c1: '#1e293b', c2: '#0f172a', acc: '#3b82f6', s1: '#0f172a', s2: '#2563eb', s3: '#06b6d4', text: '#93c5fd' },
  { key: 'asus-vivobook', brand: 'ASUS', model: 'Vivobook', c1: '#334155', c2: '#1e293b', acc: '#f97316', s1: '#1e293b', s2: '#ea580c', s3: '#fbbf24', text: '#fed7aa' },
  { key: 'asus-tuf', brand: 'TUF GAMING', model: 'TUF Gaming A15', c1: '#27272a', c2: '#18181b', acc: '#f59e0b', s1: '#18181b', s2: '#b45309', s3: '#fbbf24', text: '#fde68a', isGaming: true },
  { key: 'asus-rog', brand: 'ROG', model: 'Zephyrus / Strix', c1: '#18181b', c2: '#09090b', acc: '#8b5cf6', s1: '#2e1065', s2: '#7c3aed', s3: '#ec4899', text: '#c4b5fd', isGaming: true },
  { key: 'asus-expertbook', brand: 'ASUS', model: 'ExpertBook', c1: '#1e293b', c2: '#0f172a', acc: '#0284c7', s1: '#0f172a', s2: '#0369a1', s3: '#38bdf8', text: '#bae6fd' },
  { key: 'lenovo-yoga', brand: 'Lenovo', model: 'Yoga Slim', c1: '#334155', c2: '#1e293b', acc: '#0d9488', s1: '#134e4a', s2: '#0d9488', s3: '#5eead4', text: '#99f6e4' },
  { key: 'lenovo-ideapad', brand: 'Lenovo', model: 'IdeaPad Slim', c1: '#94a3b8', c2: '#64748b', acc: '#3b82f6', s1: '#1e3a8a', s2: '#3b82f6', s3: '#93c5fd', text: '#dbeafe' },
  { key: 'lenovo-legion', brand: 'LEGION', model: 'Legion Pro / Slim', c1: '#1c1917', c2: '#0c0a09', acc: '#06b6d4', s1: '#083344', s2: '#0284c7', s3: '#a855f7', text: '#38bdf8', isGaming: true },
  { key: 'lenovo-loq', brand: 'LOQ', model: 'Lenovo LOQ Gaming', c1: '#27272a', c2: '#18181b', acc: '#3b82f6', s1: '#172554', s2: '#2563eb', s3: '#60a5fa', text: '#93c5fd', isGaming: true },
  { key: 'lenovo-thinkpad', brand: 'ThinkPad', model: 'ThinkPad Classic', c1: '#1c1917', c2: '#0c0a09', acc: '#dc2626', s1: '#0c0a09', s2: '#292524', s3: '#57534e', text: '#ef4444', isThinkpad: true },
  { key: 'apple-air-spacegray', brand: 'Apple', model: 'MacBook Air', c1: '#475569', c2: '#334155', acc: '#94a3b8', s1: '#1e1b4b', s2: '#4338ca', s3: '#f43f5e', text: '#f8fafc', hasNotch: true },
  { key: 'apple-air-midnight', brand: 'Apple', model: 'MacBook Air Midnight', c1: '#1e2230', c2: '#0b0f19', acc: '#60a5fa', s1: '#0f172a', s2: '#1e3a8a', s3: '#38bdf8', text: '#e0e7ff', hasNotch: true },
  { key: 'apple-pro-spaceblack', brand: 'Apple', model: 'MacBook Pro M3 Max', c1: '#18181b', c2: '#09090b', acc: '#a855f7', s1: '#0f172a', s2: '#475569', s3: '#94a3b8', text: '#f8fafc', hasNotch: true },
  { key: 'acer-swift', brand: 'acer', model: 'Swift Go / X', c1: '#cbd5e1', c2: '#94a3b8', acc: '#10b981', s1: '#064e3b', s2: '#059669', s3: '#34d399', text: '#a7f3d0' },
  { key: 'acer-aspire', brand: 'acer', model: 'Aspire 3 / 5', c1: '#64748b', c2: '#475569', acc: '#0284c7', s1: '#082f49', s2: '#0284c7', s3: '#7dd3fc', text: '#bae6fd' },
  { key: 'acer-nitro', brand: 'NITRO', model: 'Nitro V Gaming', c1: '#1e1b4b', c2: '#0f172a', acc: '#ef4444', s1: '#450a0a', s2: '#b91c1c', s3: '#f97316', text: '#fca5a5', isGaming: true },
  { key: 'acer-predator', brand: 'PREDATOR', model: 'Helios 16', c1: '#09090b', c2: '#030712', acc: '#06b6d4', s1: '#083344', s2: '#0891b2', s3: '#22d3ee', text: '#67e8f9', isGaming: true },
  { key: 'hp-pavilion', brand: 'hp', model: 'Pavilion Aero / 14', c1: '#e2e8f0', c2: '#cbd5e1', acc: '#0284c7', s1: '#0c4a6e', s2: '#0284c7', s3: '#38bdf8', text: '#bae6fd' },
  { key: 'hp-envy', brand: 'hp', model: 'Envy x360', c1: '#334155', c2: '#1e293b', acc: '#a855f7', s1: '#3b0764', s2: '#7e22ce', s3: '#c084fc', text: '#e9d5ff' },
  { key: 'hp-victus', brand: 'VICTUS', model: 'Victus Gaming', c1: '#27272a', c2: '#18181b', acc: '#3b82f6', s1: '#172554', s2: '#1d4ed8', s3: '#60a5fa', text: '#93c5fd', isGaming: true },
  { key: 'hp-omen', brand: 'OMEN', model: 'Omen 16 Max', c1: '#09090b', c2: '#000000', acc: '#ef4444', s1: '#450a0a', s2: '#dc2626', s3: '#fb7185', text: '#fda4af', isGaming: true },
  { key: 'dell-xps', brand: 'DELL', model: 'XPS 13 / 15', c1: '#e2e8f0', c2: '#94a3b8', acc: '#0284c7', s1: '#0f172a', s2: '#0369a1', s3: '#38bdf8', text: '#0284c7' },
  { key: 'dell-inspiron', brand: 'DELL', model: 'Inspiron 14', c1: '#cbd5e1', c2: '#94a3b8', acc: '#475569', s1: '#1e293b', s2: '#475569', s3: '#94a3b8', text: '#cbd5e1' },
  { key: 'dell-alienware', brand: 'ALIENWARE', model: 'm16 R2 Gaming', c1: '#0f172a', c2: '#020617', acc: '#06b6d4', s1: '#042f2e', s2: '#0d9488', s3: '#2dd4bf', text: '#5eead4', isGaming: true },
  { key: 'msi-modern', brand: 'MSI', model: 'Modern 14 / 15', c1: '#1e293b', c2: '#0f172a', acc: '#ec4899', s1: '#500724', s2: '#be185d', s3: '#f472b6', text: '#fbcfe8' },
  { key: 'msi-katana', brand: 'MSI', model: 'Katana Gaming', c1: '#18181b', c2: '#09090b', acc: '#dc2626', s1: '#450a0a', s2: '#b91c1c', s3: '#ef4444', text: '#fca5a5', isGaming: true },
  { key: 'msi-stealth', brand: 'MSI', model: 'Stealth Studio', c1: '#09090b', c2: '#000000', acc: '#eab308', s1: '#422006', s2: '#ca8a04', s3: '#fde047', text: '#fef08a', isGaming: true },
  { key: 'axioo-pongo', brand: 'AXIOO', model: 'Pongo 760 Gaming', c1: '#18181b', c2: '#09090b', acc: '#ef4444', s1: '#450a0a', s2: '#dc2626', s3: '#f97316', text: '#fca5a5', isGaming: true },
  { key: 'axioo-hype', brand: 'AXIOO', model: 'MyBook Hype 5', c1: '#475569', c2: '#334155', acc: '#3b82f6', s1: '#1e293b', s2: '#2563eb', s3: '#60a5fa', text: '#93c5fd' },
  { key: 'advan-workplus', brand: 'ADVAN', model: 'Workplus AI', c1: '#475569', c2: '#1e293b', acc: '#06b6d4', s1: '#083344', s2: '#0891b2', s3: '#67e8f9', text: '#a5f3fc' },
  { key: 'advan-soulmate', brand: 'ADVAN', model: 'Soulmate Celeron', c1: '#94a3b8', c2: '#64748b', acc: '#10b981', s1: '#064e3b', s2: '#059669', s3: '#6ee7b7', text: '#a7f3d0' },
  { key: 'huawei-matebook', brand: 'HUAWEI', model: 'MateBook D14 / D16', c1: '#cbd5e1', c2: '#94a3b8', acc: '#f43f5e', s1: '#1e1b4b', s2: '#4338ca', s3: '#f43f5e', text: '#fda4af' }
];

function buildSVG(s) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
  <defs>
    <filter id="shadow_${s.key}" x="-10%" y="-10%" width="120%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#0f172a" flood-opacity="0.25"/>
    </filter>
    <linearGradient id="chassisGrad_${s.key}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${s.c1}"/>
      <stop offset="100%" stop-color="${s.c2}"/>
    </linearGradient>
    <linearGradient id="baseGrad_${s.key}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${s.c1}"/>
      <stop offset="60%" stop-color="${s.c2}"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
    <linearGradient id="screenWall_${s.key}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${s.s1}"/>
      <stop offset="50%" stop-color="${s.s2}"/>
      <stop offset="100%" stop-color="${s.s3}"/>
    </linearGradient>
    <linearGradient id="glassReflection_${s.key}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.16"/>
      <stop offset="40%" stop-color="#ffffff" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="kbGlow_${s.key}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${s.acc}" stop-opacity="0.6"/>
      <stop offset="50%" stop-color="${s.text}" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="${s.acc}" stop-opacity="0.6"/>
    </linearGradient>
  </defs>

  <ellipse cx="300" cy="385" rx="230" ry="16" fill="#0f172a" opacity="0.2" filter="blur(6px)"/>

  <g filter="url(#shadow_${s.key})">
    <rect x="85" y="35" width="430" height="260" rx="14" fill="url(#chassisGrad_${s.key})" stroke="#334155" stroke-width="1.5"/>
    <rect x="92" y="42" width="416" height="246" rx="8" fill="#09090b"/>
    <circle cx="300" cy="48" r="2.5" fill="#1e293b"/>
    <circle cx="300" cy="48" r="1.2" fill="#0284c7"/>
    ${s.hasNotch ? `
    <path d="M 276 42 L 324 42 A 4 4 0 0 1 328 46 L 328 54 A 4 4 0 0 1 324 58 L 276 58 A 4 4 0 0 1 272 54 L 272 46 A 4 4 0 0 1 276 42 Z" fill="#09090b"/>
    <circle cx="300" cy="50" r="2" fill="#1e293b"/>
    <circle cx="300" cy="50" r="1" fill="#38bdf8"/>
    ` : ''}
    <rect x="96" y="54" width="408" height="224" rx="4" fill="url(#screenWall_${s.key})"/>
    <g opacity="0.35">
      <circle cx="200" cy="140" r="80" fill="#ffffff" filter="blur(30px)"/>
      <circle cx="400" cy="180" r="90" fill="${s.acc}" filter="blur(40px)"/>
      <path d="M 96 220 Q 250 120 504 180 L 504 278 L 96 278 Z" fill="#000000" opacity="0.4"/>
      <path d="M 96 240 Q 320 160 504 220 L 504 278 L 96 278 Z" fill="#ffffff" opacity="0.15"/>
    </g>
    <path d="M 96 54 L 260 54 L 140 278 L 96 278 Z" fill="url(#glassReflection_${s.key})"/>
    <text x="300" y="284" font-family="'Open Sans', sans-serif" font-size="7.5" font-weight="800" fill="${s.text}" text-anchor="middle" letter-spacing="1.5" opacity="0.85">
      ${s.brand.toUpperCase()}
    </text>
  </g>

  <rect x="180" y="294" width="240" height="7" rx="3" fill="#0f172a" stroke="#334155" stroke-width="0.8"/>

  <g>
    <polygon points="50,370 550,370 514,298 86,298" fill="url(#baseGrad_${s.key})" stroke="#475569" stroke-width="1.2"/>
    <rect x="50" y="370" width="500" height="8" rx="3" fill="#09090b" stroke="#334155" stroke-width="0.8"/>
    <rect x="270" y="370" width="60" height="3" rx="1.5" fill="#334155"/>
    <polygon points="108,348 492,348 474,304 126,304" fill="#09090b" opacity="0.8" stroke="#1e293b" stroke-width="0.8"/>

    <rect x="132" y="306" width="336" height="5" rx="1" fill="#1e293b" opacity="0.9"/>
    <rect x="128" y="313" width="344" height="6" rx="1" fill="#1e293b" opacity="0.9"/>
    <rect x="124" y="321" width="352" height="6.5" rx="1" fill="#1e293b" opacity="0.9"/>
    <rect x="120" y="329.5" width="360" height="7" rx="1" fill="#1e293b" opacity="0.9"/>
    <rect x="116" y="338.5" width="368" height="7.5" rx="1" fill="#1e293b" opacity="0.9"/>

    ${s.isGaming ? `
    <rect x="115" y="347" width="370" height="2" fill="url(#kbGlow_${s.key})" opacity="0.9"/>
    <rect x="148" y="321" width="24" height="6.5" rx="1" fill="${s.acc}" opacity="0.8"/>
    ` : ''}

    ${s.isThinkpad ? `
    <circle cx="300" cy="328" r="2.8" fill="#ef4444" stroke="#7f1d1d" stroke-width="0.5"/>
    ` : ''}

    <rect x="250" y="352" width="100" height="20" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.8" opacity="0.85"/>
    <line x1="300" y1="368" x2="300" y2="371" stroke="#64748b" stroke-width="0.8"/>
  </g>

  <g transform="translate(480, 20)">
    <rect x="0" y="0" width="105" height="24" rx="6" fill="#0f172a" fill-opacity="0.85" stroke="#334155" stroke-width="1"/>
    <text x="52" y="16" font-family="'Open Sans', sans-serif" font-size="9" font-weight="700" fill="#f8fafc" text-anchor="middle">
      ${s.model}
    </text>
  </g>
</svg>`;
}

// Generate all SVG files
svgStyles.forEach(s => {
  const filePath = path.join(imgDir, `${s.key}.svg`);
  fs.writeFileSync(filePath, buildSVG(s), 'utf8');
});
console.log(`✓ Berhasil menyiapkan ${svgStyles.length} varian visual gambar SVG di folder lokal.`);

// Helper untuk memilih gambar lokal berdasarkan brand & seri laptop
function resolveImage(brand, model) {
  const b = brand.toLowerCase();
  const m = model.toLowerCase();

  if (b.includes('apple')) {
    if (m.includes('pro')) return '/images/laptops/apple-pro-spaceblack.svg';
    if (m.includes('midnight')) return '/images/laptops/apple-air-midnight.svg';
    return '/images/laptops/apple-air-spacegray.svg';
  }
  if (b.includes('asus')) {
    if (m.includes('rog') || m.includes('zephyrus') || m.includes('strix')) return '/images/laptops/asus-rog.svg';
    if (m.includes('tuf')) return '/images/laptops/asus-tuf.svg';
    if (m.includes('zenbook')) return '/images/laptops/asus-zenbook.svg';
    if (m.includes('expertbook')) return '/images/laptops/asus-expertbook.svg';
    return '/images/laptops/asus-vivobook.svg';
  }
  if (b.includes('lenovo')) {
    if (m.includes('thinkpad')) return '/images/laptops/lenovo-thinkpad.svg';
    if (m.includes('legion')) return '/images/laptops/lenovo-legion.svg';
    if (m.includes('loq')) return '/images/laptops/lenovo-loq.svg';
    if (m.includes('yoga')) return '/images/laptops/lenovo-yoga.svg';
    return '/images/laptops/lenovo-ideapad.svg';
  }
  if (b.includes('acer')) {
    if (m.includes('predator') || m.includes('helios')) return '/images/laptops/acer-predator.svg';
    if (m.includes('nitro')) return '/images/laptops/acer-nitro.svg';
    if (m.includes('swift')) return '/images/laptops/acer-swift.svg';
    return '/images/laptops/acer-aspire.svg';
  }
  if (b.includes('hp')) {
    if (m.includes('omen')) return '/images/laptops/hp-omen.svg';
    if (m.includes('victus')) return '/images/laptops/hp-victus.svg';
    if (m.includes('envy') || m.includes('spectre')) return '/images/laptops/hp-envy.svg';
    return '/images/laptops/hp-pavilion.svg';
  }
  if (b.includes('dell')) {
    if (m.includes('alienware')) return '/images/laptops/dell-alienware.svg';
    if (m.includes('xps')) return '/images/laptops/dell-xps.svg';
    return '/images/laptops/dell-inspiron.svg';
  }
  if (b.includes('msi')) {
    if (m.includes('katana') || m.includes('cyborg') || m.includes('raider')) return '/images/laptops/msi-katana.svg';
    if (m.includes('stealth')) return '/images/laptops/msi-stealth.svg';
    return '/images/laptops/msi-modern.svg';
  }
  if (b.includes('axioo')) {
    if (m.includes('pongo')) return '/images/laptops/axioo-pongo.svg';
    return '/images/laptops/axioo-hype.svg';
  }
  if (b.includes('advan')) {
    if (m.includes('workplus') || m.includes('workpro')) return '/images/laptops/advan-workplus.svg';
    return '/images/laptops/advan-soulmate.svg';
  }
  if (b.includes('huawei')) {
    return '/images/laptops/huawei-matebook.svg';
  }
  return '/images/laptops/asus-zenbook.svg';
}

// 2. Definisi Lengkap 100 Produk Laptop SKU Nyata & Populer di Indonesia
const rawCatalog = [
  // --- ASUS (18 Model) ---
  { brand: 'Asus', model: 'Zenbook 14 OLED UX3405', sku: 'UX3405-CU7', price: 16499000, stock: 8, cpu: 'Intel Core Ultra 7 155H', cScore: 94, ram: 16, sDesc: '1TB M.2 PCIe 4.0 SSD', sGb: 1000, gpu: 'Intel Arc Graphics', gScore: 78, bat: 15.0, w: 1.20, scr: '14.0" 3K OLED 120Hz' },
  { brand: 'Asus', model: 'Zenbook S 13 OLED UM5302', sku: 'UM5302-R7', price: 17999000, stock: 5, cpu: 'AMD Ryzen 7 7840U', cScore: 92, ram: 16, sDesc: '1TB NVMe PCIe Gen4', sGb: 1000, gpu: 'AMD Radeon 780M', gScore: 76, bat: 16.0, w: 1.00, scr: '13.3" 2.8K OLED' },
  { brand: 'Asus', model: 'Zenbook Duo OLED UX8406', sku: 'UX8406-DUO', price: 32999000, stock: 3, cpu: 'Intel Core Ultra 9 185H', cScore: 99, ram: 32, sDesc: '2TB PCIe 4.0 SSD', sGb: 2000, gpu: 'Intel Arc Graphics', gScore: 80, bat: 13.5, w: 1.65, scr: 'Dual 14.0" 3K OLED 120Hz' },
  { brand: 'Asus', model: 'Vivobook Go 14 E1404FA', sku: 'E1404FA-FHD321', price: 6599000, stock: 15, cpu: 'AMD Ryzen 3 7320U', cScore: 65, ram: 8, sDesc: '512GB M.2 NVMe SSD', sGb: 512, gpu: 'AMD Radeon 610M', gScore: 45, bat: 9.0, w: 1.38, scr: '14.0" FHD IPS-Level' },
  { brand: 'Asus', model: 'Vivobook 14 A1405VA', sku: 'A1405VA-V5', price: 9299000, stock: 12, cpu: 'Intel Core i5-13500H', cScore: 84, ram: 16, sDesc: '512GB M.2 NVMe SSD', sGb: 512, gpu: 'Intel Iris Xe Graphics', gScore: 60, bat: 8.5, w: 1.40, scr: '14.0" WUXGA 16:10 IPS' },
  { brand: 'Asus', model: 'Vivobook S 14 OLED S5406', sku: 'S5406-CU5', price: 13999000, stock: 7, cpu: 'Intel Core Ultra 5 125H', cScore: 86, ram: 16, sDesc: '1TB M.2 PCIe 4.0', sGb: 1000, gpu: 'Intel Arc Graphics', gScore: 74, bat: 14.0, w: 1.30, scr: '14.0" 3K OLED 120Hz' },
  { brand: 'Asus', model: 'Vivobook Pro 15 OLED K6502', sku: 'K6502-RTX3050', price: 15999000, stock: 6, cpu: 'Intel Core i7-12650H', cScore: 88, ram: 16, sDesc: '512GB NVMe PCIe 4.0', sGb: 512, gpu: 'NVIDIA RTX 3050 4GB', gScore: 80, bat: 7.5, w: 1.80, scr: '15.6" 2.8K OLED 120Hz' },
  { brand: 'Asus', model: 'TUF Gaming A15 FA506NC', sku: 'FA506NC-R5', price: 11499000, stock: 10, cpu: 'AMD Ryzen 5 7535HS', cScore: 82, ram: 16, sDesc: '512GB NVMe PCIe SSD', sGb: 512, gpu: 'NVIDIA RTX 3050 4GB', gScore: 82, bat: 6.5, w: 2.30, scr: '15.6" FHD 144Hz IPS' },
  { brand: 'Asus', model: 'TUF Gaming F15 FX507VU', sku: 'FX507VU-I7', price: 18499000, stock: 5, cpu: 'Intel Core i7-13620H', cScore: 91, ram: 16, sDesc: '1TB PCIe 4.0 SSD', sGb: 1000, gpu: 'NVIDIA RTX 4050 6GB', gScore: 88, bat: 6.0, w: 2.20, scr: '15.6" FHD 144Hz 100% sRGB' },
  { brand: 'Asus', model: 'TUF Gaming A16 Advantage', sku: 'FA617N-RX7600', price: 19999000, stock: 4, cpu: 'AMD Ryzen 7 7735HS', cScore: 89, ram: 16, sDesc: '512GB NVMe SSD', sGb: 512, gpu: 'AMD Radeon RX 7600S 8GB', gScore: 89, bat: 8.0, w: 2.20, scr: '16.0" FHD+ 165Hz IPS' },
  { brand: 'Asus', model: 'ROG Zephyrus G14 GA403', sku: 'GA403-R9', price: 29999000, stock: 3, cpu: 'AMD Ryzen 9 8945HS', cScore: 98, ram: 32, sDesc: '1TB PCIe 4.0 SSD', sGb: 1000, gpu: 'NVIDIA RTX 4060 8GB', gScore: 94, bat: 9.0, w: 1.50, scr: '14.0" 3K OLED 120Hz' },
  { brand: 'Asus', model: 'ROG Zephyrus G16 GU605MV', sku: 'GU605MV-U9', price: 34999000, stock: 3, cpu: 'Intel Core Ultra 9 185H', cScore: 99, ram: 32, sDesc: '1TB PCIe 4.0 NVMe SSD', sGb: 1000, gpu: 'NVIDIA RTX 4070 8GB', gScore: 99, bat: 8.0, w: 1.85, scr: '16.0" 2.5K OLED 240Hz' },
  { brand: 'Asus', model: 'ROG Strix G16 G614JV', sku: 'G614JV-I7', price: 22499000, stock: 4, cpu: 'Intel Core i7-13650HX', cScore: 93, ram: 16, sDesc: '512GB PCIe 4.0 SSD', sGb: 512, gpu: 'NVIDIA RTX 4060 8GB', gScore: 93, bat: 5.5, w: 2.50, scr: '16.0" FHD+ 165Hz IPS' },
  { brand: 'Asus', model: 'ROG Strix SCAR 16 G634', sku: 'G634-I9-4080', price: 45999000, stock: 2, cpu: 'Intel Core i9-14900HX', cScore: 100, ram: 32, sDesc: '2TB PCIe 4.0 SSD', sGb: 2000, gpu: 'NVIDIA RTX 4080 12GB', gScore: 100, bat: 4.5, w: 2.65, scr: '16.0" QHD+ Mini LED 240Hz' },
  { brand: 'Asus', model: 'ExpertBook B9 OLED B9403', sku: 'B9403-CU7', price: 27499000, stock: 3, cpu: 'Intel Core vPro i7-1355U', cScore: 89, ram: 32, sDesc: '1TB M.2 PCIe Gen4', sGb: 1000, gpu: 'Intel Iris Xe Graphics', gScore: 62, bat: 16.0, w: 0.99, scr: '14.0" 2.8K OLED 90Hz' },
  { brand: 'Asus', model: 'ExpertBook B1 B1402', sku: 'B1402-I3', price: 6899000, stock: 14, cpu: 'Intel Core i3-1215U', cScore: 66, ram: 8, sDesc: '256GB PCIe SSD', sGb: 256, gpu: 'Intel UHD Graphics', gScore: 48, bat: 9.0, w: 1.49, scr: '14.0" FHD Antiglare' },
  { brand: 'Asus', model: 'Vivobook Go 15 OLED E1504', sku: 'E1504-R5', price: 8199000, stock: 9, cpu: 'AMD Ryzen 5 7520U', cScore: 74, ram: 16, sDesc: '512GB M.2 SSD', sGb: 512, gpu: 'AMD Radeon 610M', gScore: 50, bat: 10.0, w: 1.63, scr: '15.6" FHD OLED 100% DCI-P3' },
  { brand: 'Asus', model: 'ROG Flow X13 GV302', sku: 'GV302-FLIP', price: 26499000, stock: 3, cpu: 'AMD Ryzen 9 7940HS', cScore: 96, ram: 16, sDesc: '1TB PCIe 4.0 SSD', sGb: 1000, gpu: 'NVIDIA RTX 4050 6GB', gScore: 86, bat: 10.5, w: 1.35, scr: '13.4" QHD+ 165Hz Touch' },

  // --- LENOVO (17 Model) ---
  { brand: 'Lenovo', model: 'Yoga Slim 7i Gen 9', sku: 'YOGA-7I-G9', price: 14299000, stock: 5, cpu: 'Intel Core Ultra 5 125H', cScore: 88, ram: 16, sDesc: '512GB M.2 PCIe NVMe', sGb: 512, gpu: 'Intel Arc Graphics', gScore: 75, bat: 14.0, w: 1.39, scr: '14.0" WUXGA OLED' },
  { brand: 'Lenovo', model: 'Yoga Pro 9i 16IRX9', sku: 'YOGA-PRO9I', price: 34999000, stock: 2, cpu: 'Intel Core Ultra 9 185H', cScore: 99, ram: 32, sDesc: '1TB PCIe 4.0 SSD', sGb: 1000, gpu: 'NVIDIA RTX 4070 8GB', gScore: 98, bat: 8.5, w: 2.18, scr: '16.0" 3.2K Mini-LED 165Hz' },
  { brand: 'Lenovo', model: 'Yoga 7 2-in-1 14AHP9', sku: 'YOGA-7-2IN1', price: 16499000, stock: 6, cpu: 'AMD Ryzen 7 8840HS', cScore: 92, ram: 16, sDesc: '1TB SSD NVMe M.2', sGb: 1000, gpu: 'AMD Radeon 780M', gScore: 76, bat: 13.0, w: 1.49, scr: '14.0" 2.8K OLED Touch' },
  { brand: 'Lenovo', model: 'Legion Pro 5 16IRX9', sku: 'LEGION-PRO5', price: 24999000, stock: 4, cpu: 'Intel Core i7-14700HX', cScore: 98, ram: 32, sDesc: '1TB NVMe PCIe 4.0', sGb: 1000, gpu: 'NVIDIA RTX 4060 8GB', gScore: 96, bat: 5.5, w: 2.50, scr: '16.0" WQXGA 240Hz IPS' },
  { brand: 'Lenovo', model: 'Legion Pro 7 16IRX9', sku: 'LEGION-PRO7', price: 44999000, stock: 2, cpu: 'Intel Core i9-14900HX', cScore: 100, ram: 32, sDesc: '2TB PCIe NVMe SSD', sGb: 2000, gpu: 'NVIDIA RTX 4080 12GB', gScore: 100, bat: 4.5, w: 2.60, scr: '16.0" WQXGA 240Hz 500nits' },
  { brand: 'Lenovo', model: 'Legion Slim 5 16AHP9', sku: 'LEGION-SLIM5', price: 21999000, stock: 5, cpu: 'AMD Ryzen 7 8845HS', cScore: 93, ram: 16, sDesc: '512GB PCIe Gen4', sGb: 512, gpu: 'NVIDIA RTX 4060 8GB', gScore: 94, bat: 7.0, w: 2.30, scr: '16.0" WQXGA 165Hz IPS' },
  { brand: 'Lenovo', model: 'LOQ 15IAX9 Essential', sku: 'LOQ-15IAX9', price: 11999000, stock: 11, cpu: 'Intel Core i5-12450HX', cScore: 81, ram: 12, sDesc: '512GB SSD PCIe NVMe', sGb: 512, gpu: 'NVIDIA RTX 3050 6GB', gScore: 83, bat: 5.5, w: 2.38, scr: '15.6" FHD 144Hz 100% sRGB' },
  { brand: 'Lenovo', model: 'LOQ 15AHP9 Ryzen Edition', sku: 'LOQ-15AHP9', price: 15499000, stock: 8, cpu: 'AMD Ryzen 5 8645HS', cScore: 85, ram: 16, sDesc: '512GB NVMe SSD', sGb: 512, gpu: 'NVIDIA RTX 4050 6GB', gScore: 87, bat: 6.0, w: 2.38, scr: '15.6" FHD 144Hz G-SYNC' },
  { brand: 'Lenovo', model: 'IdeaPad Slim 3 14IAH8', sku: '83EQ0036ID', price: 8499000, stock: 11, cpu: 'Intel Core i5-12450H', cScore: 78, ram: 16, sDesc: '512GB SSD PCIe NVMe', sGb: 512, gpu: 'Intel UHD Graphics', gScore: 50, bat: 8.5, w: 1.43, scr: '14.0" FHD IPS 300 nits' },
  { brand: 'Lenovo', model: 'IdeaPad Slim 5 14IRH8', sku: '82XD003AID', price: 11299000, stock: 9, cpu: 'Intel Core i5-13500H', cScore: 85, ram: 16, sDesc: '512GB NVMe PCIe', sGb: 512, gpu: 'Intel Iris Xe Graphics', gScore: 62, bat: 11.0, w: 1.46, scr: '14.0" WUXGA OLED' },
  { brand: 'Lenovo', model: 'IdeaPad 1 14AMN7', sku: '82VG005UID', price: 5499000, stock: 16, cpu: 'AMD Athlon Silver 7120U', cScore: 50, ram: 8, sDesc: '256GB SSD PCIe NVMe', sGb: 256, gpu: 'AMD Radeon 610M', gScore: 40, bat: 9.5, w: 1.38, scr: '14.0" HD Antiglare' },
  { brand: 'Lenovo', model: 'ThinkPad E14 Gen 5', sku: 'TP-E14-R7', price: 13499000, stock: 7, cpu: 'AMD Ryzen 7 7730U', cScore: 84, ram: 16, sDesc: '512GB SSD M.2 2242', sGb: 512, gpu: 'AMD Radeon Vega 8', gScore: 62, bat: 12.0, w: 1.41, scr: '14.0" WUXGA IPS 300nits' },
  { brand: 'Lenovo', model: 'ThinkPad L14 Gen 4', sku: 'TP-L14-I5', price: 15299000, stock: 6, cpu: 'Intel Core i5-1335U', cScore: 82, ram: 16, sDesc: '512GB SSD PCIe NVMe', sGb: 512, gpu: 'Intel Iris Xe Graphics', gScore: 60, bat: 13.0, w: 1.50, scr: '14.0" FHD IPS Antiglare' },
  { brand: 'Lenovo', model: 'ThinkPad T14s Gen 4', sku: 'TP-T14S-R7', price: 23999000, stock: 3, cpu: 'AMD Ryzen 7 PRO 7840U', cScore: 93, ram: 32, sDesc: '1TB SSD M.2 PCIe Gen4', sGb: 1000, gpu: 'AMD Radeon 780M', gScore: 78, bat: 16.5, w: 1.25, scr: '14.0" 2.8K OLED Low Blue' },
  { brand: 'Lenovo', model: 'ThinkPad X1 Carbon Gen 12', sku: 'X1-CARBON-G12', price: 36999000, stock: 2, cpu: 'Intel Core Ultra 7 155H', cScore: 95, ram: 32, sDesc: '1TB PCIe 4.0 SSD', sGb: 1000, gpu: 'Intel Arc Graphics', gScore: 78, bat: 15.0, w: 1.09, scr: '14.0" 2.8K OLED 120Hz' },
  { brand: 'Lenovo', model: 'IdeaPad Flex 5 14ABR8', sku: 'FLEX5-R5', price: 10499000, stock: 8, cpu: 'AMD Ryzen 5 7530U', cScore: 79, ram: 16, sDesc: '512GB PCIe SSD', sGb: 512, gpu: 'AMD Radeon Graphics', gScore: 58, bat: 11.5, w: 1.55, scr: '14.0" WUXGA Touch 360' },
  { brand: 'Lenovo', model: 'Yoga Book 9i Dual Screen', sku: 'YOGABOOK-9I', price: 33499000, stock: 2, cpu: 'Intel Core Ultra 7 155U', cScore: 90, ram: 32, sDesc: '1TB SSD NVMe', sGb: 1000, gpu: 'Intel Graphics', gScore: 65, bat: 10.5, w: 1.34, scr: 'Dual 13.3" 2.8K OLED' },

  // --- APPLE (10 Model) ---
  { brand: 'Apple', model: 'MacBook Air 13 M2 256GB', sku: 'MBA-M2-256', price: 15999000, stock: 7, cpu: 'Apple M2 8-Core CPU', cScore: 92, ram: 8, sDesc: '256GB Unified SSD', sGb: 256, gpu: '8-Core GPU Apple', gScore: 78, bat: 18.0, w: 1.24, scr: '13.6" Liquid Retina' },
  { brand: 'Apple', model: 'MacBook Air 13 M2 512GB', sku: 'MBA-M2-512', price: 19499000, stock: 6, cpu: 'Apple M2 8-Core CPU', cScore: 92, ram: 16, sDesc: '512GB Unified SSD', sGb: 512, gpu: '10-Core GPU Apple', gScore: 82, bat: 18.0, w: 1.24, scr: '13.6" Liquid Retina' },
  { brand: 'Apple', model: 'MacBook Air 13 M3 256GB', sku: 'MBA-M3-256', price: 18499000, stock: 8, cpu: 'Apple M3 8-Core CPU', cScore: 95, ram: 8, sDesc: '256GB Unified SSD', sGb: 256, gpu: '8-Core GPU Apple', gScore: 84, bat: 18.0, w: 1.24, scr: '13.6" Liquid Retina' },
  { brand: 'Apple', model: 'MacBook Air 13 M3 512GB', sku: 'MBA-M3-512', price: 21999000, stock: 5, cpu: 'Apple M3 8-Core CPU', cScore: 95, ram: 16, sDesc: '512GB Unified SSD', sGb: 512, gpu: '10-Core GPU Apple', gScore: 88, bat: 18.0, w: 1.24, scr: '13.6" Liquid Retina' },
  { brand: 'Apple', model: 'MacBook Air 15 M3 512GB', sku: 'MBA-15-M3', price: 24999000, stock: 4, cpu: 'Apple M3 8-Core CPU', cScore: 95, ram: 16, sDesc: '512GB Unified SSD', sGb: 512, gpu: '10-Core GPU Apple', gScore: 88, bat: 18.0, w: 1.51, scr: '15.3" Liquid Retina' },
  { brand: 'Apple', model: 'MacBook Pro 14 M3 Base', sku: 'MBP14-M3-BASE', price: 25999000, stock: 4, cpu: 'Apple M3 8-Core CPU', cScore: 95, ram: 8, sDesc: '512GB Unified SSD', sGb: 512, gpu: '10-Core GPU Apple', gScore: 88, bat: 22.0, w: 1.55, scr: '14.2" Liquid Retina XDR' },
  { brand: 'Apple', model: 'MacBook Pro 14 M3 Pro', sku: 'MBP14-M3PRO', price: 31999000, stock: 5, cpu: 'Apple M3 Pro 11-Core CPU', cScore: 97, ram: 18, sDesc: '512GB Unified SSD', sGb: 512, gpu: '14-Core Apple GPU', gScore: 95, bat: 17.0, w: 1.61, scr: '14.2" Liquid Retina XDR 120Hz' },
  { brand: 'Apple', model: 'MacBook Pro 14 M3 Max', sku: 'MBP14-M3MAX', price: 47999000, stock: 2, cpu: 'Apple M3 Max 14-Core CPU', cScore: 100, ram: 36, sDesc: '1TB Unified SSD', sGb: 1000, gpu: '30-Core Apple GPU', gScore: 100, bat: 18.0, w: 1.62, scr: '14.2" Liquid Retina XDR' },
  { brand: 'Apple', model: 'MacBook Pro 16 M3 Pro', sku: 'MBP16-M3PRO', price: 39999000, stock: 3, cpu: 'Apple M3 Pro 12-Core CPU', cScore: 98, ram: 18, sDesc: '512GB Unified SSD', sGb: 512, gpu: '18-Core Apple GPU', gScore: 97, bat: 22.0, w: 2.14, scr: '16.2" Liquid Retina XDR' },
  { brand: 'Apple', model: 'MacBook Air 13 M1 Legacy', sku: 'MBA-M1-LEGACY', price: 11999000, stock: 12, cpu: 'Apple M1 8-Core CPU', cScore: 86, ram: 8, sDesc: '256GB Unified SSD', sGb: 256, gpu: '7-Core GPU Apple', gScore: 70, bat: 15.0, w: 1.29, scr: '13.3" Retina Display' },

  // --- ACER (12 Model) ---
  { brand: 'Acer', model: 'Swift Go 14 AI Edition', sku: 'SFG14-73-58C8', price: 12999000, stock: 12, cpu: 'Intel Core Ultra 5 125H', cScore: 85, ram: 16, sDesc: '512GB PCIe Gen4 SSD', sGb: 512, gpu: 'Intel Arc Graphics', gScore: 72, bat: 13.0, w: 1.32, scr: '14.0" 2.8K OLED 90Hz' },
  { brand: 'Acer', model: 'Swift Go 14 OLED Ultra 7', sku: 'SFG14-73-77CU', price: 15499000, stock: 6, cpu: 'Intel Core Ultra 7 155H', cScore: 93, ram: 16, sDesc: '1TB PCIe Gen4 SSD', sGb: 1000, gpu: 'Intel Arc Graphics', gScore: 78, bat: 13.5, w: 1.32, scr: '14.0" 2.8K OLED 90Hz' },
  { brand: 'Acer', model: 'Swift X 14 SFX14-71G', sku: 'SFX14-RTX4050', price: 19499000, stock: 4, cpu: 'Intel Core i7-13700H', cScore: 92, ram: 16, sDesc: '1TB NVMe PCIe Gen4', sGb: 1000, gpu: 'NVIDIA RTX 4050 6GB', gScore: 86, bat: 9.5, w: 1.55, scr: '14.5" 2.8K OLED 120Hz' },
  { brand: 'Acer', model: 'Nitro V 15 ANV15-51', sku: 'ANV15-51-511T', price: 12499000, stock: 9, cpu: 'Intel Core i5-13420H', cScore: 80, ram: 16, sDesc: '512GB PCIe NVMe SSD', sGb: 512, gpu: 'NVIDIA RTX 4050 6GB', gScore: 86, bat: 6.0, w: 2.10, scr: '15.6" FHD 144Hz' },
  { brand: 'Acer', model: 'Nitro V 16 ANV16-41', sku: 'ANV16-R7-4060', price: 17999000, stock: 5, cpu: 'AMD Ryzen 7 8845HS', cScore: 93, ram: 16, sDesc: '512GB PCIe Gen4', sGb: 512, gpu: 'NVIDIA RTX 4060 8GB', gScore: 94, bat: 6.5, w: 2.50, scr: '16.0" WQXGA 165Hz IPS' },
  { brand: 'Acer', model: 'Predator Helios Neo 16', sku: 'PHN16-I7-4060', price: 23999000, stock: 4, cpu: 'Intel Core i7-14700HX', cScore: 97, ram: 16, sDesc: '1TB PCIe Gen4 SSD', sGb: 1000, gpu: 'NVIDIA RTX 4060 8GB', gScore: 95, bat: 5.0, w: 2.60, scr: '16.0" WQXGA 240Hz 500nits' },
  { brand: 'Acer', model: 'Predator Helios 18', sku: 'PH18-I9-4080', price: 43999000, stock: 2, cpu: 'Intel Core i9-14900HX', cScore: 100, ram: 32, sDesc: '2TB PCIe NVMe SSD', sGb: 2000, gpu: 'NVIDIA RTX 4080 12GB', gScore: 100, bat: 4.0, w: 3.25, scr: '18.0" WQXGA Mini-LED 250Hz' },
  { brand: 'Acer', model: 'Aspire 3 Slim A314-36M', sku: 'A314-N100', price: 5199000, stock: 18, cpu: 'Intel Processor N100', cScore: 48, ram: 8, sDesc: '512GB PCIe NVMe SSD', sGb: 512, gpu: 'Intel UHD Graphics', gScore: 38, bat: 9.0, w: 1.40, scr: '14.0" FHD IPS 16:9' },
  { brand: 'Acer', model: 'Aspire 5 Slim A514-56M', sku: 'A514-I5-13', price: 8999000, stock: 10, cpu: 'Intel Core i5-1335U', cScore: 81, ram: 16, sDesc: '512GB SSD NVMe', sGb: 512, gpu: 'Intel Iris Xe Graphics', gScore: 60, bat: 9.5, w: 1.48, scr: '14.0" WUXGA 16:10 IPS' },
  { brand: 'Acer', model: 'Aspire 5 Gaming A515-58GM', sku: 'A515-RTX2050', price: 10499000, stock: 8, cpu: 'Intel Core i5-13420H', cScore: 80, ram: 16, sDesc: '512GB PCIe SSD', sGb: 512, gpu: 'NVIDIA RTX 2050 4GB', gScore: 74, bat: 7.0, w: 1.78, scr: '15.6" FHD 144Hz IPS' },
  { brand: 'Acer', model: 'Aspire Lite 14 AL14-31P', sku: 'AL14-N100-8G', price: 4799000, stock: 20, cpu: 'Intel Processor N100', cScore: 48, ram: 8, sDesc: '256GB PCIe NVMe', sGb: 256, gpu: 'Intel UHD Graphics', gScore: 38, bat: 8.5, w: 1.35, scr: '14.0" WUXGA 16:10 IPS' },
  { brand: 'Acer', model: 'Swift Edge 16 SFE16-43', sku: 'SFE16-OLED-R7', price: 21999000, stock: 3, cpu: 'AMD Ryzen 7 7840U', cScore: 92, ram: 16, sDesc: '1TB PCIe SSD', sGb: 1000, gpu: 'AMD Radeon 780M', gScore: 76, bat: 10.0, w: 1.23, scr: '16.0" 3.2K OLED 120Hz' },

  // --- HP (12 Model) ---
  { brand: 'HP', model: 'Pavilion Aero 13-bg0012AU', sku: 'AERO-13-R7', price: 13999000, stock: 6, cpu: 'AMD Ryzen 7 8840HS', cScore: 90, ram: 16, sDesc: '512GB PCIe NVMe SSD', sGb: 512, gpu: 'AMD Radeon 780M', gScore: 74, bat: 12.5, w: 0.99, scr: '13.3" WQXGA IPS 400nits' },
  { brand: 'HP', model: 'Pavilion Plus 14-ew0015TU', sku: 'PAV-PLUS-14', price: 14799000, stock: 7, cpu: 'Intel Core i5-13500H', cScore: 85, ram: 16, sDesc: '512GB PCIe Gen4', sGb: 512, gpu: 'Intel Iris Xe Graphics', gScore: 62, bat: 12.0, w: 1.44, scr: '14.0" 2.8K OLED 120Hz' },
  { brand: 'HP', model: 'Envy x360 14-es1013TU', sku: 'ENVY-X360-14', price: 16999000, stock: 5, cpu: 'Intel Core 7 150U', cScore: 87, ram: 16, sDesc: '1TB PCIe NVMe SSD', sGb: 1000, gpu: 'Intel Graphics', gScore: 64, bat: 14.5, w: 1.52, scr: '14.0" FHD Touch OLED' },
  { brand: 'HP', model: 'Spectre x360 14-eu0005TU', sku: 'SPECTRE-X360-U7', price: 28999000, stock: 3, cpu: 'Intel Core Ultra 7 155H', cScore: 94, ram: 32, sDesc: '1TB M.2 PCIe 4.0', sGb: 1000, gpu: 'Intel Arc Graphics', gScore: 78, bat: 16.0, w: 1.44, scr: '14.0" 2.8K OLED 120Hz Touch' },
  { brand: 'HP', model: 'Victus 15-fb1011AX', sku: 'VIC15-R5-2050', price: 9999000, stock: 12, cpu: 'AMD Ryzen 5 8645HS', cScore: 83, ram: 16, sDesc: '512GB NVMe PCIe SSD', sGb: 512, gpu: 'NVIDIA RTX 2050 4GB', gScore: 75, bat: 7.0, w: 2.29, scr: '15.6" FHD IPS 144Hz' },
  { brand: 'HP', model: 'Victus 16-r1015TX', sku: 'VIC16-I7-4060', price: 19499000, stock: 6, cpu: 'Intel Core i7-14700HX', cScore: 97, ram: 16, sDesc: '1TB PCIe Gen4 SSD', sGb: 1000, gpu: 'NVIDIA RTX 4060 8GB', gScore: 95, bat: 5.5, w: 2.33, scr: '16.1" FHD IPS 165Hz' },
  { brand: 'HP', model: 'Omen Transcend 14', sku: 'OMEN-TRANS-14', price: 29999000, stock: 3, cpu: 'Intel Core Ultra 7 155H', cScore: 94, ram: 32, sDesc: '1TB PCIe 4.0 SSD', sGb: 1000, gpu: 'NVIDIA RTX 4060 8GB', gScore: 94, bat: 8.5, w: 1.63, scr: '14.0" 2.8K OLED 120Hz' },
  { brand: 'HP', model: 'Omen 16-wf1014TX', sku: 'OMEN-16-I9', price: 34999000, stock: 2, cpu: 'Intel Core i9-14900HX', cScore: 100, ram: 32, sDesc: '1TB PCIe Gen4', sGb: 1000, gpu: 'NVIDIA RTX 4070 8GB', gScore: 98, bat: 5.0, w: 2.40, scr: '16.1" QHD 240Hz 3ms' },
  { brand: 'HP', model: 'HP 14s-dq5115TU', sku: 'HP14S-I3-12', price: 6299000, stock: 15, cpu: 'Intel Core i3-1215U', cScore: 66, ram: 8, sDesc: '512GB SSD NVMe', sGb: 512, gpu: 'Intel UHD Graphics', gScore: 48, bat: 9.0, w: 1.46, scr: '14.0" FHD Micro-edge' },
  { brand: 'HP', model: 'HP 14-ep0018TU', sku: 'HP14-I5-13', price: 8699000, stock: 11, cpu: 'Intel Core i5-1335U', cScore: 81, ram: 16, sDesc: '512GB PCIe NVMe', sGb: 512, gpu: 'Intel Iris Xe Graphics', gScore: 60, bat: 10.0, w: 1.40, scr: '14.0" FHD IPS 250nits' },
  { brand: 'HP', model: 'HP 245 G10 Business', sku: 'HP245-G10-R5', price: 7199000, stock: 14, cpu: 'AMD Ryzen 5 7520U', cScore: 73, ram: 8, sDesc: '512GB SSD PCIe', sGb: 512, gpu: 'AMD Radeon 610M', gScore: 48, bat: 9.5, w: 1.36, scr: '14.0" FHD Antiglare' },
  { brand: 'HP', model: 'ProBook 440 G10', sku: 'PROBOOK-440-G10', price: 13299000, stock: 8, cpu: 'Intel Core i5-1335U', cScore: 82, ram: 16, sDesc: '512GB PCIe NVMe', sGb: 512, gpu: 'Intel Iris Xe Graphics', gScore: 60, bat: 12.0, w: 1.38, scr: '14.0" FHD IPS 400nits' },

  // --- DELL (9 Model) ---
  { brand: 'Dell', model: 'XPS 13 9340 InfinityEdge', sku: 'XPS9340-CU7', price: 26999000, stock: 4, cpu: 'Intel Core Ultra 7 155H', cScore: 93, ram: 16, sDesc: '1TB M.2 PCIe NVMe', sGb: 1000, gpu: 'Intel Arc Graphics', gScore: 77, bat: 16.0, w: 1.19, scr: '13.4" QHD+ InfinityEdge 120Hz' },
  { brand: 'Dell', model: 'XPS 14 9440 OLED RTX', sku: 'XPS9440-RTX4050', price: 35999000, stock: 2, cpu: 'Intel Core Ultra 7 155H', cScore: 94, ram: 32, sDesc: '1TB PCIe 4.0 SSD', sGb: 1000, gpu: 'NVIDIA RTX 4050 6GB', gScore: 86, bat: 12.0, w: 1.68, scr: '14.5" 3.2K OLED Touch 120Hz' },
  { brand: 'Dell', model: 'XPS 16 9640 Creator', sku: 'XPS9640-U9', price: 46999000, stock: 2, cpu: 'Intel Core Ultra 9 185H', cScore: 99, ram: 32, sDesc: '2TB PCIe NVMe SSD', sGb: 2000, gpu: 'NVIDIA RTX 4070 8GB', gScore: 98, bat: 11.5, w: 2.13, scr: '16.3" 4K+ OLED Touch' },
  { brand: 'Dell', model: 'Inspiron 14 5440', sku: 'INSP-5440-CU5', price: 12499000, stock: 8, cpu: 'Intel Core Ultra 5 125U', cScore: 84, ram: 16, sDesc: '512GB PCIe NVMe', sGb: 512, gpu: 'Intel Graphics', gScore: 62, bat: 12.0, w: 1.54, scr: '14.0" FHD+ 16:10 IPS' },
  { brand: 'Dell', model: 'Inspiron 15 3520', sku: 'INSP-3520-I3', price: 6199000, stock: 14, cpu: 'Intel Core i3-1215U', cScore: 65, ram: 8, sDesc: '512GB PCIe NVMe SSD', sGb: 512, gpu: 'Intel UHD Graphics', gScore: 48, bat: 8.5, w: 1.65, scr: '15.6" FHD 120Hz' },
  { brand: 'Dell', model: 'Inspiron 16 Plus 7640', sku: 'INSP-16P-I7', price: 21499000, stock: 4, cpu: 'Intel Core Ultra 7 155H', cScore: 94, ram: 32, sDesc: '1TB M.2 PCIe Gen4', sGb: 1000, gpu: 'NVIDIA RTX 4060 8GB', gScore: 94, bat: 10.0, w: 2.10, scr: '16.0" 2.5K 120Hz IPS' },
  { brand: 'Dell', model: 'Alienware m16 R2', sku: 'AW-M16-R2', price: 36499000, stock: 2, cpu: 'Intel Core Ultra 9 185H', cScore: 99, ram: 32, sDesc: '1TB PCIe 4.0 SSD', sGb: 1000, gpu: 'NVIDIA RTX 4070 8GB', gScore: 98, bat: 6.5, w: 2.61, scr: '16.0" QHD+ 240Hz ComfortView' },
  { brand: 'Dell', model: 'Alienware x14 R2 Thin', sku: 'AW-X14-R2', price: 28999000, stock: 3, cpu: 'Intel Core i7-13620H', cScore: 91, ram: 16, sDesc: '512GB PCIe SSD', sGb: 512, gpu: 'NVIDIA RTX 4050 6GB', gScore: 86, bat: 7.0, w: 1.91, scr: '14.0" QHD+ 165Hz G-SYNC' },
  { brand: 'Dell', model: 'Latitude 3440 Commercial', sku: 'LAT-3440-I5', price: 11999000, stock: 9, cpu: 'Intel Core i5-1335U', cScore: 82, ram: 16, sDesc: '512GB PCIe NVMe', sGb: 512, gpu: 'Intel Iris Xe Graphics', gScore: 60, bat: 13.0, w: 1.54, scr: '14.0" FHD Antiglare' },

  // --- MSI (8 Model) ---
  { brand: 'MSI', model: 'Modern 14 C12MO', sku: 'MOD14-C12MO', price: 7299000, stock: 14, cpu: 'Intel Core i3-1215U', cScore: 68, ram: 8, sDesc: '512GB NVMe PCIe SSD', sGb: 512, gpu: 'Intel UHD Graphics', gScore: 48, bat: 9.5, w: 1.40, scr: '14.0" FHD IPS-Level' },
  { brand: 'MSI', model: 'Modern 15 B12MO', sku: 'MOD15-I5-12', price: 8999000, stock: 10, cpu: 'Intel Core i5-1235U', cScore: 78, ram: 16, sDesc: '512GB NVMe PCIe', sGb: 512, gpu: 'Intel Iris Xe Graphics', gScore: 58, bat: 9.0, w: 1.70, scr: '15.6" FHD IPS-Level' },
  { brand: 'MSI', model: 'Prestige 14 AI Evo', sku: 'PRESTIGE-14-AI', price: 17499000, stock: 5, cpu: 'Intel Core Ultra 7 155H', cScore: 94, ram: 16, sDesc: '1TB PCIe Gen4 SSD', sGb: 1000, gpu: 'Intel Arc Graphics', gScore: 78, bat: 16.0, w: 1.29, scr: '14.0" FHD+ OLED 100% sRGB' },
  { brand: 'MSI', model: 'Prestige 16 AI Studio', sku: 'PRESTIGE-16-OLED', price: 29999000, stock: 3, cpu: 'Intel Core Ultra 9 185H', cScore: 99, ram: 32, sDesc: '1TB NVMe PCIe 4.0', sGb: 1000, gpu: 'NVIDIA RTX 4060 8GB', gScore: 94, bat: 14.0, w: 1.59, scr: '16.0" 4K OLED 100% DCI-P3' },
  { brand: 'MSI', model: 'Thin 15 B12UCX', sku: 'THIN-15-2050', price: 9799000, stock: 11, cpu: 'Intel Core i5-12450H', cScore: 79, ram: 8, sDesc: '512GB NVMe SSD', sGb: 512, gpu: 'NVIDIA RTX 2050 4GB', gScore: 74, bat: 6.0, w: 1.86, scr: '15.6" FHD 144Hz' },
  { brand: 'MSI', model: 'Katana 15 B13VGK', sku: 'KATANA-15-4070', price: 23999000, stock: 4, cpu: 'Intel Core i7-13620H', cScore: 92, ram: 16, sDesc: '1TB PCIe Gen4 SSD', sGb: 1000, gpu: 'NVIDIA RTX 4070 8GB', gScore: 98, bat: 5.0, w: 2.25, scr: '15.6" QHD 165Hz 100% DCI-P3' },
  { brand: 'MSI', model: 'Cyborg 15 A13VF', sku: 'CYBORG-15-4060', price: 16499000, stock: 7, cpu: 'Intel Core i7-13620H', cScore: 91, ram: 16, sDesc: '512GB NVMe PCIe', sGb: 512, gpu: 'NVIDIA RTX 4060 8GB', gScore: 94, bat: 5.5, w: 1.98, scr: '15.6" FHD 144Hz IPS' },
  { brand: 'MSI', model: 'Stealth 16 Mercedes-AMG', sku: 'STEALTH-16-AMG', price: 38999000, stock: 2, cpu: 'Intel Core i9-13900H', cScore: 98, ram: 32, sDesc: '2TB PCIe Gen4 SSD', sGb: 2000, gpu: 'NVIDIA RTX 4070 8GB', gScore: 98, bat: 8.0, w: 1.88, scr: '16.0" 4K OLED 16:10' },

  // --- BRAND LOKAL INDONESIA: AXIOO (6 Model) ---
  { brand: 'Axioo', model: 'Pongo 760 V2 RTX 4060', sku: 'PONGO-760-V2', price: 15499000, stock: 8, cpu: 'Intel Core i7-13620H', cScore: 91, ram: 16, sDesc: '512GB M.2 NVMe PCIe Gen4', sGb: 512, gpu: 'NVIDIA RTX 4060 8GB', gScore: 95, bat: 5.0, w: 2.05, scr: '15.6" FHD 144Hz 100% sRGB' },
  { brand: 'Axioo', model: 'Pongo 725 RTX 2050', sku: 'PONGO-725', price: 9899000, stock: 12, cpu: 'Intel Core i7-12650H', cScore: 87, ram: 16, sDesc: '512GB NVMe SSD', sGb: 512, gpu: 'NVIDIA RTX 2050 4GB', gScore: 75, bat: 5.5, w: 2.05, scr: '15.6" FHD 144Hz' },
  { brand: 'Axioo', model: 'MyBook Hype 5 AMD X6', sku: 'HYPE5-R5-6600', price: 6299000, stock: 15, cpu: 'AMD Ryzen 5 6600H', cScore: 82, ram: 16, sDesc: '512GB M.2 NVMe SSD', sGb: 512, gpu: 'AMD Radeon 660M', gScore: 62, bat: 8.0, w: 1.41, scr: '14.0" FHD IPS 16:9' },
  { brand: 'Axioo', model: 'MyBook Hype 3 Intel i3', sku: 'HYPE3-I3-1005', price: 4199000, stock: 22, cpu: 'Intel Core i3-1005G1', cScore: 54, ram: 8, sDesc: '256GB SSD PCIe', sGb: 256, gpu: 'Intel UHD Graphics', gScore: 42, bat: 8.5, w: 1.40, scr: '14.0" FHD IPS' },
  { brand: 'Axioo', model: 'MyBook Hype 7 AMD X8', sku: 'HYPE7-R7-5700', price: 6999000, stock: 11, cpu: 'AMD Ryzen 7 5700U', cScore: 83, ram: 16, sDesc: '512GB PCIe SSD', sGb: 512, gpu: 'AMD Radeon Vega 8', gScore: 62, bat: 9.0, w: 1.41, scr: '14.0" FHD IPS' },
  { brand: 'Axioo', model: 'Pongo Studio RTX 4070', sku: 'PONGO-STUDIO', price: 27999000, stock: 3, cpu: 'Intel Core i9-13900H', cScore: 98, ram: 32, sDesc: '1TB PCIe 4.0 SSD', sGb: 1000, gpu: 'NVIDIA RTX 4070 8GB', gScore: 98, bat: 5.0, w: 2.15, scr: '16.0" QHD+ 240Hz 100% sRGB' },

  // --- BRAND LOKAL INDONESIA: ADVAN (5 Model) ---
  { brand: 'Advan', model: 'Workplus AI Ryzen 7', sku: 'ADVAN-WP-R7', price: 7899000, stock: 15, cpu: 'AMD Ryzen 7 8845HS', cScore: 91, ram: 16, sDesc: '512GB PCIe 4.0 NVMe', sGb: 512, gpu: 'AMD Radeon 780M', gScore: 74, bat: 11.0, w: 1.30, scr: '14.0" WUXGA 16:10 IPS 100% sRGB' },
  { brand: 'Advan', model: 'Workplus Ryzen 5 6600H', sku: 'ADVAN-WP-R5', price: 6999000, stock: 16, cpu: 'AMD Ryzen 5 6600H', cScore: 82, ram: 16, sDesc: '512GB NVMe SSD', sGb: 512, gpu: 'AMD Radeon 660M', gScore: 62, bat: 10.0, w: 1.30, scr: '14.0" WUXGA 16:10 IPS' },
  { brand: 'Advan', model: 'Workpro Intel Core i5', sku: 'ADVAN-WPRO-I5', price: 5499000, stock: 18, cpu: 'Intel Core i5-1035G7', cScore: 68, ram: 8, sDesc: '256GB SSD PCIe', sGb: 256, gpu: 'Intel Iris Plus', gScore: 50, bat: 8.5, w: 1.25, scr: '14.0" FHD IPS 16:10' },
  { brand: 'Advan', model: 'PixelWar AMD RX 6600M', sku: 'ADVAN-PIXELWAR', price: 10999000, stock: 6, cpu: 'AMD Ryzen 5 6600H', cScore: 82, ram: 16, sDesc: '512GB PCIe SSD', sGb: 512, gpu: 'AMD Radeon RX 6600M 8GB', gScore: 85, bat: 5.5, w: 2.10, scr: '16.0" 2.5K 120Hz IPS' },
  { brand: 'Advan', model: 'Soulmate Celeron N4020', sku: 'ADVAN-SOUL-N40', price: 2499000, stock: 25, cpu: 'Intel Celeron N4020', cScore: 35, ram: 4, sDesc: '128GB eMMC/SSD', sGb: 128, gpu: 'Intel UHD 600', gScore: 25, bat: 7.0, w: 1.47, scr: '14.0" HD 1366x768' },

  // --- HUAWEI (3 Model) ---
  { brand: 'Huawei', model: 'MateBook D14 2024', sku: 'MB-D14-2024', price: 8999000, stock: 10, cpu: 'Intel Core i5-12450H', cScore: 80, ram: 16, sDesc: '512GB PCIe NVMe', sGb: 512, gpu: 'Intel UHD Graphics', gScore: 52, bat: 12.0, w: 1.39, scr: '14.0" FHD IPS 16:10 300nits' },
  { brand: 'Huawei', model: 'MateBook D16 2024 i9', sku: 'MB-D16-I9', price: 16999000, stock: 5, cpu: 'Intel Core i9-13900H', cScore: 96, ram: 16, sDesc: '1TB M.2 NVMe SSD', sGb: 1000, gpu: 'Intel Iris Xe Graphics', gScore: 65, bat: 11.5, w: 1.68, scr: '16.0" FHD+ IPS Eye Comfort' },
  { brand: 'Huawei', model: 'MateBook 14 Core Ultra', sku: 'MB-14-CU7', price: 19999000, stock: 4, cpu: 'Intel Core Ultra 7 155H', cScore: 94, ram: 16, sDesc: '1TB PCIe 4.0 SSD', sGb: 1000, gpu: 'Intel Arc Graphics', gScore: 78, bat: 15.0, w: 1.31, scr: '14.2" 2.8K OLED Touch 120Hz' }
];

console.log(`Jumlah model unik dalam basis katalog: ${rawCatalog.length} model.`);

// 3. Gandakan / Lengkapi variasi spesifikasi hingga tepat mencapai 100 produk SKU unik
const full100List = [];
let skuCounter = 1;

// Loop sampai tepat 100 produk
while (full100List.length < 100) {
  for (const base of rawCatalog) {
    if (full100List.length >= 100) break;
    
    const id = full100List.length + 1;
    let item = { ...base, id };

    // Jika ini adalah loop lanjutan (> panjang katalog awal), buat varian SKU & RAM/Storage unik
    if (id > rawCatalog.length) {
      const variantNum = Math.floor(id / rawCatalog.length) + 1;
      const ramChoice = [8, 16, 24, 32][id % 4];
      const storageChoice = [256, 512, 1000, 2000][(id + 1) % 4];
      const priceAdj = (ramChoice - base.ram) * 450000 + (storageChoice - base.sGb) * 750;
      const adjustedPrice = Math.max(3999000, Math.round((base.price + priceAdj) / 100000) * 100000 - 1000);
      
      item.sku = `${base.sku}-V${variantNum}-${ramChoice}G`;
      item.model = `${base.model} (Varian ${ramChoice}GB/${storageChoice >= 1000 ? (storageChoice/1000) + 'TB' : storageChoice + 'GB'})`;
      item.price = adjustedPrice;
      item.ram = ramChoice;
      item.sGb = storageChoice;
      item.sDesc = `${storageChoice >= 1000 ? (storageChoice/1000) + 'TB' : storageChoice + 'GB'} PCIe NVMe SSD`;
      item.stock = (id % 13 === 0) ? 2 : (id % 7 === 0) ? 3 : (id % 15) + 5; // beberapa stok <= 3 untuk warning admin
    } else {
      item.sku = `${base.sku}-00${id}`;
    }

    item.image_url = resolveImage(item.brand, item.model);
    full100List.push(item);
  }
}

console.log(`Total daftar laptop yang dirakit untuk seeding: ${full100List.length} produk SKU.`);

// 4. Masukkan ke Database Prisma
async function runSeeding() {
  console.log('\n--- Menyinkronkan 100 Produk Laptop ke Database MySQL ---');

  for (const p of full100List) {
    const desc = `${p.brand} ${p.model} dibekali prosesor ${p.cpu} dan kartu grafis ${p.gpu}. Dilengkapi RAM ${p.ram}GB serta penyimpanan ${p.sDesc}, sangat ideal untuk komputasi harian, multitasking, maupun gaming.`;

    const laptop = await prisma.laptop.upsert({
      where: { id: p.id },
      update: {
        brand: p.brand,
        model: p.model,
        sku: p.sku,
        price: p.price,
        stock: p.stock,
        processorName: p.cpu,
        processorScore: p.cScore,
        ramGb: p.ram,
        storageDesc: p.sDesc,
        storageGb: p.sGb,
        gpuName: p.gpu,
        gpuScore: p.gScore,
        batteryHours: p.bat,
        weightKg: p.w,
        screenDesc: p.scr,
        imageUrl: p.image_url,
        description: desc
      },
      create: {
        id: p.id,
        brand: p.brand,
        model: p.model,
        sku: p.sku,
        price: p.price,
        stock: p.stock,
        processorName: p.cpu,
        processorScore: p.cScore,
        ramGb: p.ram,
        storageDesc: p.sDesc,
        storageGb: p.sGb,
        gpuName: p.gpu,
        gpuScore: p.gScore,
        batteryHours: p.bat,
        weightKg: p.w,
        screenDesc: p.scr,
        imageUrl: p.image_url,
        description: desc
      }
    });

    // Sinkronkan 6 Kriteria SAW (C1 - C6)
    const criteriaValues = [
      { criterionId: 1, rawValue: p.price },
      { criterionId: 2, rawValue: p.cScore },
      { criterionId: 3, rawValue: p.ram },
      { criterionId: 4, rawValue: p.gScore },
      { criterionId: 5, rawValue: p.sGb },
      { criterionId: 6, rawValue: p.bat }
    ];

    for (const c of criteriaValues) {
      await prisma.laptopCriteriaValue.upsert({
        where: {
          laptopId_criterionId: {
            laptopId: laptop.id,
            criterionId: c.criterionId
          }
        },
        update: { rawValue: c.rawValue },
        create: {
          laptopId: laptop.id,
          criterionId: c.criterionId,
          rawValue: c.rawValue
        }
      });
    }

    if (p.id % 20 === 0 || p.id === 1 || p.id === 100) {
      console.log(`[ID ${p.id.toString().padStart(3, ' ')}] ${p.brand.padEnd(8, ' ')} | SKU: ${p.sku.padEnd(20, ' ')} | Rp ${p.price.toLocaleString('id-ID').padStart(11, ' ')} | Stok: ${p.stock} | ${p.image_url}`);
    }
  }

  console.log(`\n======================================================`);
  console.log(` SEEDING SUKSES: 100 PRODUK SKU LAPTOP LOKAL TERSIMPAN!`);
  console.log(`======================================================\n`);

  await prisma.$disconnect();
}

runSeeding().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
