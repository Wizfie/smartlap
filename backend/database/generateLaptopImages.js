const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../../frontend/public/images/laptops');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Data definisi 18 laptop beserta gaya visualnya
const laptops = [
  {
    filename: 'asus-zenbook-14.svg',
    brand: 'ASUS',
    model: 'Zenbook 14 OLED',
    chassis: { primary: '#1e293b', secondary: '#0f172a', accent: '#3b82f6' },
    screen: {
      gradStart: '#0f172a',
      gradMid: '#2563eb',
      gradEnd: '#06b6d4',
      pattern: 'aurora'
    },
    badgeColor: '#93c5fd'
  },
  {
    filename: 'lenovo-yoga-slim-7i.svg',
    brand: 'Lenovo',
    model: 'Yoga Slim 7i',
    chassis: { primary: '#334155', secondary: '#1e293b', accent: '#0d9488' },
    screen: {
      gradStart: '#134e4a',
      gradMid: '#0d9488',
      gradEnd: '#5eead4',
      pattern: 'waves'
    },
    badgeColor: '#99f6e4'
  },
  {
    filename: 'acer-swift-go-14.svg',
    brand: 'acer',
    model: 'Swift Go 14 AI',
    chassis: { primary: '#cbd5e1', secondary: '#94a3b8', accent: '#10b981' },
    screen: {
      gradStart: '#064e3b',
      gradMid: '#059669',
      gradEnd: '#34d399',
      pattern: 'geometric'
    },
    badgeColor: '#a7f3d0'
  },
  {
    filename: 'apple-macbook-air-m2.svg',
    brand: 'Apple',
    model: 'MacBook Air M2',
    chassis: { primary: '#1e2230', secondary: '#0b0f19', accent: '#60a5fa' },
    screen: {
      gradStart: '#1e1b4b',
      gradMid: '#4338ca',
      gradEnd: '#f43f5e',
      pattern: 'sonoma'
    },
    badgeColor: '#e0e7ff',
    hasNotch: true
  },
  {
    filename: 'asus-tuf-gaming-a15.svg',
    brand: 'TUF GAMING',
    model: 'A15 FA506NC',
    chassis: { primary: '#27272a', secondary: '#18181b', accent: '#f59e0b' },
    screen: {
      gradStart: '#18181b',
      gradMid: '#b45309',
      gradEnd: '#fbbf24',
      pattern: 'cyber'
    },
    badgeColor: '#fde68a',
    isGaming: true
  },
  {
    filename: 'lenovo-legion-pro-5.svg',
    brand: 'LEGION',
    model: 'Pro 5 16IRX9',
    chassis: { primary: '#1c1917', secondary: '#0c0a09', accent: '#06b6d4' },
    screen: {
      gradStart: '#083344',
      gradMid: '#0284c7',
      gradEnd: '#a855f7',
      pattern: 'neon'
    },
    badgeColor: '#38bdf8',
    isGaming: true
  },
  {
    filename: 'acer-nitro-v-15.svg',
    brand: 'NITRO',
    model: 'V 15 ANV15',
    chassis: { primary: '#1e1b4b', secondary: '#0f172a', accent: '#ef4444' },
    screen: {
      gradStart: '#450a0a',
      gradMid: '#b91c1c',
      gradEnd: '#f97316',
      pattern: 'cyber'
    },
    badgeColor: '#fca5a5',
    isGaming: true
  },
  {
    filename: 'hp-pavilion-aero-13.svg',
    brand: 'hp',
    model: 'Pavilion Aero 13',
    chassis: { primary: '#e2e8f0', secondary: '#cbd5e1', accent: '#0284c7' },
    screen: {
      gradStart: '#0c4a6e',
      gradMid: '#0284c7',
      gradEnd: '#38bdf8',
      pattern: 'mountain'
    },
    badgeColor: '#bae6fd'
  },
  {
    filename: 'asus-vivobook-go-14.svg',
    brand: 'ASUS',
    model: 'Vivobook Go 14',
    chassis: { primary: '#334155', secondary: '#1e293b', accent: '#f97316' },
    screen: {
      gradStart: '#1e293b',
      gradMid: '#ea580c',
      gradEnd: '#fbbf24',
      pattern: 'vibrant'
    },
    badgeColor: '#fed7aa'
  },
  {
    filename: 'lenovo-ideapad-slim-3.svg',
    brand: 'Lenovo',
    model: 'IdeaPad Slim 3',
    chassis: { primary: '#94a3b8', secondary: '#64748b', accent: '#3b82f6' },
    screen: {
      gradStart: '#1e3a8a',
      gradMid: '#3b82f6',
      gradEnd: '#93c5fd',
      pattern: 'waves'
    },
    badgeColor: '#dbeafe'
  },
  {
    filename: 'msi-modern-14.svg',
    brand: 'MSI',
    model: 'Modern 14 C12MO',
    chassis: { primary: '#1e293b', secondary: '#0f172a', accent: '#ec4899' },
    screen: {
      gradStart: '#500724',
      gradMid: '#be185d',
      gradEnd: '#f472b6',
      pattern: 'aurora'
    },
    badgeColor: '#fbcfe8'
  },
  {
    filename: 'asus-rog-zephyrus-g16.svg',
    brand: 'ROG',
    model: 'Zephyrus G16',
    chassis: { primary: '#18181b', secondary: '#09090b', accent: '#8b5cf6' },
    screen: {
      gradStart: '#2e1065',
      gradMid: '#7c3aed',
      gradEnd: '#ec4899',
      pattern: 'matrix'
    },
    badgeColor: '#c4b5fd',
    isGaming: true
  },
  {
    filename: 'apple-macbook-pro-14-m3.svg',
    brand: 'Apple',
    model: 'MacBook Pro 14 M3',
    chassis: { primary: '#18181b', secondary: '#09090b', accent: '#a855f7' },
    screen: {
      gradStart: '#0f172a',
      gradMid: '#475569',
      gradEnd: '#94a3b8',
      pattern: 'pro_xdr'
    },
    badgeColor: '#f8fafc',
    hasNotch: true
  },
  {
    filename: 'dell-xps-13.svg',
    brand: 'DELL',
    model: 'XPS 13 9340',
    chassis: { primary: '#e2e8f0', secondary: '#94a3b8', accent: '#0284c7' },
    screen: {
      gradStart: '#0f172a',
      gradMid: '#0369a1',
      gradEnd: '#38bdf8',
      pattern: 'infinity'
    },
    badgeColor: '#0284c7'
  },
  {
    filename: 'hp-victus-15.svg',
    brand: 'VICTUS',
    model: 'Victus 15 Gaming',
    chassis: { primary: '#27272a', secondary: '#18181b', accent: '#3b82f6' },
    screen: {
      gradStart: '#172554',
      gradMid: '#1d4ed8',
      gradEnd: '#60a5fa',
      pattern: 'gaming_v'
    },
    badgeColor: '#93c5fd',
    isGaming: true
  },
  {
    filename: 'axioo-pongo-760.svg',
    brand: 'AXIOO',
    model: 'Pongo 760 V2',
    chassis: { primary: '#18181b', secondary: '#09090b', accent: '#ef4444' },
    screen: {
      gradStart: '#450a0a',
      gradMid: '#dc2626',
      gradEnd: '#f97316',
      pattern: 'fire'
    },
    badgeColor: '#fca5a5',
    isGaming: true
  },
  {
    filename: 'advan-workplus-ai.svg',
    brand: 'ADVAN',
    model: 'Workplus AI',
    chassis: { primary: '#475569', secondary: '#1e293b', accent: '#06b6d4' },
    screen: {
      gradStart: '#083344',
      gradMid: '#0891b2',
      gradEnd: '#67e8f9',
      pattern: 'aurora'
    },
    badgeColor: '#a5f3fc'
  },
  {
    filename: 'lenovo-thinkpad-e14.svg',
    brand: 'ThinkPad',
    model: 'E14 Gen 5',
    chassis: { primary: '#1c1917', secondary: '#0c0a09', accent: '#dc2626' },
    screen: {
      gradStart: '#0c0a09',
      gradMid: '#292524',
      gradEnd: '#57534e',
      pattern: 'business'
    },
    badgeColor: '#ef4444',
    isThinkpad: true
  }
];

function generateSVG(lap) {
  const { brand, model, chassis, screen, badgeColor, isGaming, hasNotch, isThinkpad } = lap;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
  <defs>
    <!-- Filter Drop Shadow -->
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#0f172a" flood-opacity="0.25"/>
    </filter>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
    </filter>

    <!-- Gradients -->
    <linearGradient id="chassisGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${chassis.primary}"/>
      <stop offset="100%" stop-color="${chassis.secondary}"/>
    </linearGradient>

    <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${chassis.primary}"/>
      <stop offset="60%" stop-color="${chassis.secondary}"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>

    <linearGradient id="screenWall" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${screen.gradStart}"/>
      <stop offset="50%" stop-color="${screen.gradMid}"/>
      <stop offset="100%" stop-color="${screen.gradEnd}"/>
    </linearGradient>

    <linearGradient id="glassReflection" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.15"/>
      <stop offset="40%" stop-color="#ffffff" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>

    <linearGradient id="kbGlow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${chassis.accent}" stop-opacity="0.6"/>
      <stop offset="50%" stop-color="${badgeColor}" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="${chassis.accent}" stop-opacity="0.6"/>
    </linearGradient>
  </defs>

  <!-- Ambient Ground Shadow -->
  <ellipse cx="300" cy="385" rx="230" ry="16" fill="#0f172a" opacity="0.2" filter="blur(6px)"/>

  <!-- ================= SCREEN LID (UPRIGHT DISPLAY) ================= -->
  <g filter="url(#shadow)">
    <!-- Screen Bezel Outer Frame -->
    <rect x="85" y="35" width="430" height="260" rx="14" fill="url(#chassisGrad)" stroke="#334155" stroke-width="1.5"/>

    <!-- Screen Bezel Border (Thin Obsidian) -->
    <rect x="92" y="42" width="416" height="246" rx="8" fill="#09090b"/>

    <!-- Webcam & Mic Array -->
    <circle cx="300" cy="48" r="2.5" fill="#1e293b"/>
    <circle cx="300" cy="48" r="1.2" fill="#0284c7"/>
    <circle cx="286" cy="48" r="1" fill="#334155"/>
    <circle cx="314" cy="48" r="1" fill="#334155"/>

    ${hasNotch ? `
    <!-- Apple Camera Notch -->
    <path d="M 276 42 L 324 42 A 4 4 0 0 1 328 46 L 328 54 A 4 4 0 0 1 324 58 L 276 58 A 4 4 0 0 1 272 54 L 272 46 A 4 4 0 0 1 276 42 Z" fill="#09090b"/>
    <circle cx="300" cy="50" r="2" fill="#1e293b"/>
    <circle cx="300" cy="50" r="1" fill="#38bdf8"/>
    ` : ''}

    <!-- Active Display Matrix (High-Res Wallpaper) -->
    <rect x="96" y="54" width="408" height="224" rx="4" fill="url(#screenWall)"/>

    <!-- Decorative Screen Wallpaper Visuals -->
    <g opacity="0.35">
      <circle cx="200" cy="140" r="80" fill="#ffffff" filter="blur(30px)"/>
      <circle cx="400" cy="180" r="90" fill="${chassis.accent}" filter="blur(40px)"/>
      <path d="M 96 220 Q 250 120 504 180 L 504 278 L 96 278 Z" fill="#000000" opacity="0.4"/>
      <path d="M 96 240 Q 320 160 504 220 L 504 278 L 96 278 Z" fill="#ffffff" opacity="0.15"/>
    </g>

    <!-- Glass Specular Reflection Diagonal Overlay -->
    <path d="M 96 54 L 260 54 L 140 278 L 96 278 Z" fill="url(#glassReflection)"/>

    <!-- Brand / Series Logo on Screen Chin -->
    <text x="300" y="284" font-family="'Open Sans', sans-serif" font-size="7.5" font-weight="800" fill="${badgeColor}" text-anchor="middle" letter-spacing="1.5" opacity="0.85">
      ${brand.toUpperCase()}
    </text>
  </g>

  <!-- Hinge Connector Bar -->
  <rect x="180" y="294" width="240" height="7" rx="3" fill="#0f172a" stroke="#334155" stroke-width="0.8"/>

  <!-- ================= BASE DECK (KEYBOARD & TRACKPAD) ================= -->
  <g>
    <!-- Base Body with Perspective (Angled Trapezoid) -->
    <polygon points="50,370 550,370 514,298 86,298" fill="url(#baseGrad)" stroke="#475569" stroke-width="1.2"/>

    <!-- Base Front Lip (Chamfered edge) -->
    <rect x="50" y="370" width="500" height="8" rx="3" fill="#09090b" stroke="#334155" stroke-width="0.8"/>
    <!-- Opening Thumb Scoop Cutout -->
    <rect x="270" y="370" width="60" height="3" rx="1.5" fill="#334155"/>

    <!-- Keyboard Recessed Tray -->
    <polygon points="108,348 492,348 474,304 126,304" fill="#09090b" opacity="0.8" stroke="#1e293b" stroke-width="0.8"/>

    <!-- Keyboard Keycaps (Rendered in Rows with Perspective) -->
    <!-- Row 1: Function keys -->
    <rect x="132" y="306" width="336" height="5" rx="1" fill="#1e293b" opacity="0.9"/>
    <!-- Row 2: Numbers -->
    <rect x="128" y="313" width="344" height="6" rx="1" fill="#1e293b" opacity="0.9"/>
    <!-- Row 3: QWERTY -->
    <rect x="124" y="321" width="352" height="6.5" rx="1" fill="#1e293b" opacity="0.9"/>
    <!-- Row 4: ASDFGH -->
    <rect x="120" y="329.5" width="360" height="7" rx="1" fill="#1e293b" opacity="0.9"/>
    <!-- Row 5: ZXCVBN -->
    <rect x="116" y="338.5" width="368" height="7.5" rx="1" fill="#1e293b" opacity="0.9"/>

    ${isGaming ? `
    <!-- RGB Backlit Keyboard Underglow Accent -->
    <rect x="115" y="347" width="370" height="2" fill="url(#kbGlow)" opacity="0.9"/>
    <!-- WASD Highlight -->
    <rect x="148" y="321" width="24" height="6.5" rx="1" fill="${chassis.accent}" opacity="0.8"/>
    ` : ''}

    ${isThinkpad ? `
    <!-- Legendary Red TrackPoint on Keyboard -->
    <circle cx="300" cy="328" r="2.8" fill="#ef4444" stroke="#7f1d1d" stroke-width="0.5"/>
    ` : ''}

    <!-- Precision Glass Touchpad -->
    <rect x="250" y="352" width="100" height="20" rx="3" fill="#1e293b" stroke="#475569" stroke-width="0.8" opacity="0.85"/>
    <line x1="300" y1="368" x2="300" y2="371" stroke="#64748b" stroke-width="0.8"/>

    <!-- Subtle Side Speaker Grills / Palm Rest accents -->
    <line x1="72" y1="335" x2="96" y2="335" stroke="#334155" stroke-width="1.2" stroke-dasharray="2,2"/>
    <line x1="504" y1="335" x2="528" y2="335" stroke="#334155" stroke-width="1.2" stroke-dasharray="2,2"/>
  </g>

  <!-- Laptop Series Badge Overlay at Bottom Right -->
  <g transform="translate(480, 20)">
    <rect x="0" y="0" width="105" height="24" rx="6" fill="#0f172a" fill-opacity="0.85" stroke="#334155" stroke-width="1"/>
    <text x="52" y="16" font-family="'Open Sans', sans-serif" font-size="9" font-weight="700" fill="#f8fafc" text-anchor="middle">
      ${model}
    </text>
  </g>
</svg>`;
}

console.log('Generating 18 local laptop SVG assets in:', targetDir);
laptops.forEach((lap) => {
  const filePath = path.join(targetDir, lap.filename);
  fs.writeFileSync(filePath, generateSVG(lap), 'utf8');
  console.log('✓ Created:', lap.filename);
});

console.log('All 18 laptop SVG images successfully generated in frontend/public/images/laptops!');
