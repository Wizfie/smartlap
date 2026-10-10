const fs = require('fs');
const path = require('path');
const prisma = require('../src/config/prisma');

async function main() {
  console.log('--- Memulai Seeding SmartLap Database ---');

  // 1. Seed Users (Admin)
  console.log('[1/5] Seeding Users...');
  await prisma.user.upsert({
    where: { email: 'admin@smartlap.com' },
    update: {
      name: 'Administrator SmartLap',
      passwordHash: 'admin123',
      role: 'admin'
    },
    create: {
      name: 'Administrator SmartLap',
      email: 'admin@smartlap.com',
      passwordHash: 'admin123',
      role: 'admin'
    }
  });
  console.log('✓ Admin user siap: admin@smartlap.com / admin123');

  // 2. Seed Criteria (C1 s/d C6)
  console.log('[2/5] Seeding Criteria...');
  const criteriaData = [
    { id: 1, code: 'C1', name: 'Harga Perangkat', type: 'cost', description: 'Biaya pembelian laptop dalam Rupiah (semakin murah semakin baik).' },
    { id: 2, code: 'C2', name: 'Performa Prosesor (CPU)', type: 'benefit', description: 'Skor performa dan efisiensi CPU benchmark.' },
    { id: 3, code: 'C3', name: 'Kapasitas RAM', type: 'benefit', description: 'Ukuran kapasitas RAM dalam GB.' },
    { id: 4, code: 'C4', name: 'Performa Grafis (GPU)', type: 'benefit', description: 'Skor benchmark grafis dedicated/integrated.' },
    { id: 5, code: 'C5', name: 'Kapasitas Penyimpanan (Storage)', type: 'benefit', description: 'Ukuran kapasitas SSD dalam GB.' },
    { id: 6, code: 'C6', name: 'Ketahanan Baterai', type: 'benefit', description: 'Estimasi daya tahan baterai pemakaian normal dalam Jam.' }
  ];

  for (const c of criteriaData) {
    await prisma.criterion.upsert({
      where: { id: c.id },
      update: { code: c.code, name: c.name, type: c.type, description: c.description },
      create: c
    });
  }
  console.log('✓ 6 Kriteria SAW (C1 - C6) tersimpan.');

  // 3. Seed Profiles & Profile Criteria Weights
  console.log('[3/5] Seeding Profiles & Weights...');
  const profilesData = [
    {
      id: 1,
      slug: 'pelajar',
      name: 'Pelajar & Mahasiswa',
      description: 'Fokus pada harga terjangkau, efisiensi baterai, dan portabilitas untuk tugas harian.',
      iconName: 'school',
      weights: [
        { criterionId: 1, weight: 0.3500 },
        { criterionId: 2, weight: 0.2000 },
        { criterionId: 3, weight: 0.1500 },
        { criterionId: 4, weight: 0.0500 },
        { criterionId: 5, weight: 0.1000 },
        { criterionId: 6, weight: 0.1500 }
      ]
    },
    {
      id: 2,
      slug: 'pekerja',
      name: 'Pekerja & Profesional',
      description: 'Fokus pada kecepatan prosesor multitasking, bodi ramping, dan keandalan mobilitas kerja.',
      iconName: 'work',
      weights: [
        { criterionId: 1, weight: 0.1500 },
        { criterionId: 2, weight: 0.3000 },
        { criterionId: 3, weight: 0.2000 },
        { criterionId: 4, weight: 0.0500 },
        { criterionId: 5, weight: 0.1500 },
        { criterionId: 6, weight: 0.1500 }
      ]
    },
    {
      id: 3,
      slug: 'gamer',
      name: 'Gamer & Kreator Konten',
      description: 'Fokus pada performa grafis tinggi (GPU), refresh rate layar, pendingin maksimal, dan RAM besar.',
      iconName: 'sports_esports',
      weights: [
        { criterionId: 1, weight: 0.1000 },
        { criterionId: 2, weight: 0.2500 },
        { criterionId: 3, weight: 0.2500 },
        { criterionId: 4, weight: 0.3000 },
        { criterionId: 5, weight: 0.0500 },
        { criterionId: 6, weight: 0.0500 }
      ]
    }
  ];

  for (const prof of profilesData) {
    const profile = await prisma.profile.upsert({
      where: { id: prof.id },
      update: {
        slug: prof.slug,
        name: prof.name,
        description: prof.description,
        iconName: prof.iconName
      },
      create: {
        id: prof.id,
        slug: prof.slug,
        name: prof.name,
        description: prof.description,
        iconName: prof.iconName
      }
    });

    for (const w of prof.weights) {
      await prisma.profileCriteriaWeight.upsert({
        where: {
          profileId_criterionId: {
            profileId: profile.id,
            criterionId: w.criterionId
          }
        },
        update: { weight: w.weight },
        create: {
          profileId: profile.id,
          criterionId: w.criterionId,
          weight: w.weight
        }
      });
    }
  }
  console.log('✓ 3 Profil & Bobot Kriteria tersimpan.');

  // 4. Seed Laptops & Visual SVGs (100 Laptops)
  console.log('[4/5] Menjalankan Seeding 100 Laptop & Generate SVG...');
  const runSeedingLaptops = require('./seed100Laptops');
  await runSeedingLaptops();

  // 5. Seed Sample Orders
  const seedOrders = require('./seedOrders');
  await seedOrders();

  console.log('\n===============================================');
  console.log(' SEMUA SEEDING DATABASE SELESAI DENGAN SUKSES! ');
  console.log('===============================================\n');

  await prisma.$disconnect();
}

main().catch(e => {
  console.error('Error master seed:', e);
  process.exit(1);
});

