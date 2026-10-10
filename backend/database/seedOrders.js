const prisma = require('../src/config/prisma');

async function seedOrders() {
  console.log('[5/5] Seeding Sample Orders...');
  
  // Ambil laptop 1 dan laptop 3 jika ada
  const laptop1 = await prisma.laptop.findFirst({ where: { id: 1 } });
  const laptop3 = await prisma.laptop.findFirst({ where: { id: 3 } });

  if (!laptop1 || !laptop3) {
    console.log('Skipping orders seed: laptop 1 or 3 not found yet');
    return;
  }

  // Order 1
  const existingOrder1 = await prisma.order.findUnique({
    where: { orderNumber: 'INV-20260929-0042' }
  });

  if (!existingOrder1) {
    await prisma.order.create({
      data: {
        orderNumber: 'INV-20260929-0042',
        customerName: 'Budi Pratama',
        customerEmail: 'budi.pratama@example.com',
        customerPhone: '0812-3456-7890',
        shippingAddress: 'Jl. Sudirman No. 45, Gedung B Lantai 3, Jakarta Pusat, DKI Jakarta 10220',
        totalAmount: laptop1.price,
        paymentMethod: 'va_bca',
        paymentStatus: 'paid',
        paidAt: new Date(),
        items: {
          create: [
            {
              laptopId: laptop1.id,
              quantity: 1,
              unitPrice: laptop1.price,
              subtotal: laptop1.price
            }
          ]
        },
        payment: {
          create: {
            payCode: '8808081234569901',
            bankName: 'BCA',
            amount: laptop1.price,
            status: 'success'
          }
        }
      }
    });
  }

  // Order 2
  const existingOrder2 = await prisma.order.findUnique({
    where: { orderNumber: 'INV-20260929-0041' }
  });

  if (!existingOrder2) {
    await prisma.order.create({
      data: {
        orderNumber: 'INV-20260929-0041',
        customerName: 'Siti Rahmawati',
        customerEmail: 'siti.rahmawati@example.com',
        customerPhone: '0857-1122-3344',
        shippingAddress: 'Jl. Margonda Raya No. 12, Depok, Jawa Barat',
        totalAmount: laptop3.price,
        paymentMethod: 'qris',
        paymentStatus: 'paid',
        paidAt: new Date(),
        items: {
          create: [
            {
              laptopId: laptop3.id,
              quantity: 1,
              unitPrice: laptop3.price,
              subtotal: laptop3.price
            }
          ]
        },
        payment: {
          create: {
            payCode: 'QRIS-SIM-20260929-0041',
            bankName: 'QRIS',
            amount: laptop3.price,
            status: 'success'
          }
        }
      }
    });
  }

  console.log('✓ 2 Contoh Pesanan Awal berhasil dibuat (INV-20260929-0042 & INV-20260929-0041).');
}

if (require.main === module) {
  seedOrders()
    .then(() => prisma.$disconnect())
    .catch(err => {
      console.error('Error seeding orders:', err);
      process.exit(1);
    });
}

module.exports = seedOrders;
