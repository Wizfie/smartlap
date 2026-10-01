-- Seed Data Awal untuk SPK & Toko Laptop SmartLap
USE spk_laptop_store;

-- 1. Administrator Default
INSERT INTO users (name, email, password_hash, role) VALUES 
('Administrator SmartLap', 'admin@smartlap.com', 'admin123', 'admin')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 2. Profil Pengguna
INSERT INTO profiles (id, slug, name, description, icon_name) VALUES
(1, 'pelajar', 'Pelajar & Mahasiswa', 'Fokus pada harga terjangkau, efisiensi baterai, dan portabilitas untuk tugas harian.', 'school'),
(2, 'pekerja', 'Pekerja & Profesional', 'Fokus pada kecepatan prosesor multitasking, bodi ramping, dan keandalan mobilitas kerja.', 'work'),
(3, 'gamer', 'Gamer & Kreator Konten', 'Fokus pada performa grafis tinggi (GPU), refresh rate layar, pendingin maksimal, dan RAM besar.', 'sports_esports')
ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description);

-- 3. Kriteria Penilaian SAW
INSERT INTO criteria (id, code, name, type, description) VALUES
(1, 'C1', 'Harga Perangkat', 'cost', 'Biaya pembelian laptop dalam Rupiah (semakin murah semakin baik).'),
(2, 'C2', 'Performa Prosesor (CPU)', 'benefit', 'Skor performa dan efisiensi CPU benchmark.'),
(3, 'C3', 'Kapasitas RAM', 'benefit', 'Ukuran kapasitas RAM dalam GB.'),
(4, 'C4', 'Performa Grafis (GPU)', 'benefit', 'Skor benchmark grafis dedicated/integrated.'),
(5, 'C5', 'Kapasitas Penyimpanan (Storage)', 'benefit', 'Ukuran kapasitas SSD dalam GB.'),
(6, 'C6', 'Ketahanan Baterai', 'benefit', 'Estimasi daya tahan baterai pemakaian normal dalam Jam.')
ON DUPLICATE KEY UPDATE name=VALUES(name), type=VALUES(type);

-- 4. Bobot Kriteria Dinamis per Profil (Total W = 1.0000)
-- Profil 1: Pelajar
INSERT INTO profile_criteria_weights (profile_id, criterion_id, weight) VALUES
(1, 1, 0.3500), -- C1: Harga (35%)
(1, 2, 0.2000), -- C2: CPU (20%)
(1, 3, 0.1500), -- C3: RAM (15%)
(1, 4, 0.0500), -- C4: GPU (5%)
(1, 5, 0.1000), -- C5: Storage (10%)
(1, 6, 0.1500)  -- C6: Baterai (15%)
ON DUPLICATE KEY UPDATE weight=VALUES(weight);

-- Profil 2: Pekerja
INSERT INTO profile_criteria_weights (profile_id, criterion_id, weight) VALUES
(2, 1, 0.1500), -- C1: Harga (15%)
(2, 2, 0.3000), -- C2: CPU (30%)
(2, 3, 0.2000), -- C3: RAM (20%)
(2, 4, 0.0500), -- C4: GPU (5%)
(2, 5, 0.1500), -- C5: Storage (15%)
(2, 6, 0.1500)  -- C6: Baterai (15%)
ON DUPLICATE KEY UPDATE weight=VALUES(weight);

-- Profil 3: Gamer
INSERT INTO profile_criteria_weights (profile_id, criterion_id, weight) VALUES
(3, 1, 0.1000), -- C1: Harga (10%)
(3, 2, 0.2500), -- C2: CPU (25%)
(3, 3, 0.2500), -- C3: RAM (25%)
(3, 4, 0.3000), -- C4: GPU (30%)
(3, 5, 0.0500), -- C5: Storage (5%)
(3, 6, 0.0500)  -- C6: Baterai (5%)
ON DUPLICATE KEY UPDATE weight=VALUES(weight);

-- 5. Data 18 Laptop Populer di Indonesia dengan Gambar Lokal
INSERT INTO laptops (id, brand, model, sku, price, stock, processor_name, processor_score, ram_gb, storage_desc, storage_gb, gpu_name, gpu_score, battery_hours, weight_kg, screen_desc, image_url, description) VALUES
(1, 'Asus', 'Zenbook 14 OLED UX3405', 'UX3405-CU7', 16499000, 8, 'Intel Core Ultra 7 155H', 94.00, 16, '1TB M.2 NVMe PCIe 4.0 SSD', 1000, 'Intel Arc Graphics', 78.00, 15.0, 1.20, '14.0" 3K OLED 120Hz', '/images/laptops/asus-zenbook-14.svg', 'Laptop premium ultraportabel bertenaga AI Intel Core Ultra dengan layar 3K 120Hz ASUS Lumina OLED.'),
(2, 'Lenovo', 'Yoga Slim 7i Gen 9', 'YOGA-7I-G9', 14299000, 5, 'Intel Core Ultra 5 125H', 88.00, 16, '512GB M.2 PCIe NVMe SSD', 512, 'Intel Arc Graphics', 75.00, 14.0, 1.39, '14.0" WUXGA OLED 100% DCI-P3', '/images/laptops/lenovo-yoga-slim-7i.svg', 'Laptop tipis berbodi aluminium premium dengan daya tahan baterai tinggi untuk profesional mobile.'),
(3, 'Acer', 'Swift Go 14 AI Edition', 'SFG14-73-58C8', 12999000, 12, 'Intel Core Ultra 5 125H', 85.00, 16, '512GB PCIe Gen4 SSD', 512, 'Intel Arc Graphics', 72.00, 13.0, 1.32, '14.0" 2.8K OLED 90Hz', '/images/laptops/acer-swift-go-14.svg', 'Laptop AI cerdas berlayar OLED tajam dengan bobot ringan dan harga terjangkau di kelasnya.'),
(4, 'Apple', 'MacBook Air 13 M2', 'MBA-M2-256', 15999000, 7, 'Apple M2 8-Core CPU', 92.00, 8, '256GB Unified SSD', 256, '10-Core GPU Apple', 80.00, 18.0, 1.24, '13.6" Liquid Retina Display', '/images/laptops/apple-macbook-air-m2.svg', 'Desain super ramping tanpa kipas, performa M2 kencang dan baterai sanggup hingga 18 jam.'),
(5, 'Asus', 'TUF Gaming A15 FA506NC', 'FA506NC-R5', 11499000, 10, 'AMD Ryzen 5 7535HS', 82.00, 16, '512GB NVMe PCIe SSD', 512, 'NVIDIA GeForce RTX 3050 4GB', 82.00, 6.5, 2.30, '15.6" FHD 144Hz IPS', '/images/laptops/asus-tuf-gaming-a15.svg', 'Laptop gaming tangguh berstandar militer dengan kartu grafis RTX siap melibas game populer.'),
(6, 'Lenovo', 'Legion Pro 5 16IRX9', 'LEGION-PRO5', 24999000, 4, 'Intel Core i7-14700HX', 98.00, 32, '1TB NVMe PCIe 4.0 SSD', 1000, 'NVIDIA GeForce RTX 4060 8GB', 96.00, 5.5, 2.50, '16.0" WQXGA 240Hz IPS', '/images/laptops/lenovo-legion-pro-5.svg', 'Monster performa untuk gamer kompetitif dan kreator 3D dengan prosesor HX dan RTX 4060 murni.'),
(7, 'Acer', 'Nitro V 15 ANV15-51', 'ANV15-51-511T', 12499000, 9, 'Intel Core i5-13420H', 80.00, 16, '512GB PCIe NVMe SSD', 512, 'NVIDIA GeForce RTX 4050 6GB', 86.00, 6.0, 2.10, '15.6" FHD 144Hz', '/images/laptops/acer-nitro-v-15.svg', 'Pilihan laptop gaming entry-level paling terjangkau dengan kartu grafis generasi terbaru RTX 4050.'),
(8, 'HP', 'Pavilion Aero 13-bg0012AU', 'AERO-13-R7', 13999000, 6, 'AMD Ryzen 7 8840HS', 90.00, 16, '512GB PCIe NVMe SSD', 512, 'AMD Radeon 780M', 74.00, 12.5, 0.99, '13.3" WQXGA IPS 400 nits', '/images/laptops/hp-pavilion-aero-13.svg', 'Laptop teringan di bawah 1 kg yang dibekali prosesor AMD Ryzen 8000 series bertenaga tinggi.'),
(9, 'Asus', 'Vivobook Go 14 E1404FA', 'E1404FA-FHD321', 6599000, 15, 'AMD Ryzen 3 7320U', 65.00, 8, '512GB M.2 NVMe SSD', 512, 'AMD Radeon 610M', 45.00, 9.0, 1.38, '14.0" FHD IPS-Level', '/images/laptops/asus-vivobook-go-14.svg', 'Laptop paling ekonomis untuk pelajar dan mahasiswa dengan performa andal untuk kuliah harian.'),
(10, 'Lenovo', 'IdeaPad Slim 3 14IAH8', '83EQ0036ID', 8499000, 11, 'Intel Core i5-12450H', 78.00, 16, '512GB SSD PCIe NVMe', 512, 'Intel UHD Graphics', 50.00, 8.5, 1.43, '14.0" FHD IPS 300 nits', '/images/laptops/lenovo-ideapad-slim-3.svg', 'Laptop terjangkau dengan prosesor performa H-series dan RAM 16GB untuk komputasi cepat.'),
(11, 'MSI', 'Modern 14 C12MO', 'MOD14-C12MO', 7299000, 14, 'Intel Core i3-1215U', 68.00, 8, '512GB NVMe PCIe SSD', 512, 'Intel UHD Graphics', 48.00, 9.5, 1.40, '14.0" FHD IPS-Level', '/images/laptops/msi-modern-14.svg', 'Bodi ringkas minimalis dengan portabilitas baik untuk kalangan pelajar dan administrasi kantor.'),
(12, 'Asus', 'ROG Zephyrus G16 GU605MV', 'GU605MV-U9', 34999000, 3, 'Intel Core Ultra 9 185H', 99.00, 32, '1TB PCIe 4.0 NVMe SSD', 1000, 'NVIDIA GeForce RTX 4070 8GB', 99.00, 8.0, 1.85, '16.0" 2.5K OLED 240Hz', '/images/laptops/asus-rog-zephyrus-g16.svg', 'Laptop gaming ultra-tipis dengan layar ROG Nebula OLED dan kartu grafis RTX 4070 untuk kreator pro.'),
(13, 'Apple', 'MacBook Pro 14 M3 Pro', 'MBP14-M3PRO', 31999000, 5, 'Apple M3 Pro 11-Core CPU', 97.00, 18, '512GB Unified Superfast SSD', 512, '14-Core Apple Silicon GPU', 95.00, 17.0, 1.61, '14.2" Liquid Retina XDR 120Hz ProMotion', '/images/laptops/apple-macbook-pro-14-m3.svg', 'Mesin workstation profesional dengan layar Liquid Retina XDR kecerahan 1600 nits dan efisiensi M3 Pro.'),
(14, 'Dell', 'XPS 13 9340', 'XPS9340-CU7', 26999000, 4, 'Intel Core Ultra 7 155H', 93.00, 16, '1TB M.2 PCIe NVMe SSD', 1000, 'Intel Arc Graphics', 77.00, 16.0, 1.19, '13.4" QHD+ InfinityEdge 120Hz Touch', '/images/laptops/dell-xps-13.svg', 'Laptop eksekutif termewah berbodi platinum CNC machined aluminum dengan zero-lattice keyboard presisi.'),
(15, 'HP', 'Victus 15-fb1011AX', 'VIC15-R5-2050', 9999000, 12, 'AMD Ryzen 5 8645HS', 83.00, 16, '512GB NVMe PCIe M.2 SSD', 512, 'NVIDIA GeForce RTX 2050 4GB', 75.00, 7.0, 2.29, '15.6" FHD IPS 144Hz Antiglare', '/images/laptops/hp-victus-15.svg', 'Laptop gaming entry level terbaik di bawah 10 juta rupiah dengan pendingin ganda dan refresh rate 144Hz.'),
(16, 'Axioo', 'Pongo 760 V2', 'PONGO-760-V2', 15499000, 8, 'Intel Core i7-13620H', 91.00, 16, '512GB M.2 NVMe PCIe Gen 4', 512, 'NVIDIA GeForce RTX 4060 8GB GDDR6', 95.00, 5.0, 2.05, '15.6" FHD 144Hz 100% sRGB', '/images/laptops/axioo-pongo-760.svg', 'Karya anak bangsa terpopuler: monster performa RTX 4060 berdaya TGP tinggi dengan harga sangat bersaing.'),
(17, 'Advan', 'Workplus AI Edition', 'ADVAN-WP-R7', 7899000, 15, 'AMD Ryzen 7 8845HS', 91.00, 16, '512GB PCIe 4.0 NVMe SSD', 512, 'AMD Radeon 780M', 74.00, 11.0, 1.30, '14.0" WUXGA 16:10 IPS 100% sRGB', '/images/laptops/advan-workplus-ai.svg', 'Laptop lokal fenomenal dengan bodi metal kokoh, prosesor Ryzen 7 H-series bertenaga AI, dan layar 16:10.'),
(18, 'Lenovo', 'ThinkPad E14 Gen 5', 'TP-E14-R7', 13499000, 7, 'AMD Ryzen 7 7730U', 84.00, 16, '512GB SSD M.2 2242 PCIe Gen4', 512, 'AMD Radeon Vega 8', 62.00, 12.0, 1.41, '14.0" WUXGA IPS 300 nits Antiglare', '/images/laptops/lenovo-thinkpad-e14.svg', 'Legenda durabilitas bisnis ThinkPad dengan keyboard legendaris, TrackPoint merah, dan uji ketahanan MIL-STD-810H.')
ON DUPLICATE KEY UPDATE 
brand=VALUES(brand), model=VALUES(model), price=VALUES(price), stock=VALUES(stock), 
processor_score=VALUES(processor_score), ram_gb=VALUES(ram_gb), gpu_score=VALUES(gpu_score), 
battery_hours=VALUES(battery_hours), weight_kg=VALUES(weight_kg), image_url=VALUES(image_url);

-- 6. Nilai Parameter Matriks SAW (C1 s/d C6)
-- C1: Harga (Cost), C2: Processor Score (Benefit), C3: RAM GB (Benefit), C4: GPU Score (Benefit), C5: Storage GB (Benefit), C6: Baterai Jam (Benefit)
DELETE FROM laptop_criteria_values;

INSERT INTO laptop_criteria_values (laptop_id, criterion_id, raw_value) VALUES
-- Laptop 1: Asus Zenbook 14 OLED
(1, 1, 16499000), (1, 2, 94.00), (1, 3, 16), (1, 4, 78.00), (1, 5, 1000), (1, 6, 15.0),
-- Laptop 2: Lenovo Yoga Slim 7i
(2, 1, 14299000), (2, 2, 88.00), (2, 3, 16), (2, 4, 75.00), (2, 5, 512),  (2, 6, 14.0),
-- Laptop 3: Acer Swift Go 14 AI
(3, 1, 12999000), (3, 2, 85.00), (3, 3, 16), (3, 4, 72.00), (3, 5, 512),  (3, 6, 13.0),
-- Laptop 4: Apple MacBook Air M2
(4, 1, 15999000), (4, 2, 92.00), (4, 3, 8),  (4, 4, 80.00), (4, 5, 256),  (4, 6, 18.0),
-- Laptop 5: Asus TUF Gaming A15
(5, 1, 11499000), (5, 2, 82.00), (5, 3, 16), (5, 4, 82.00), (5, 5, 512),  (5, 6, 6.5),
-- Laptop 6: Lenovo Legion Pro 5
(6, 1, 24999000), (6, 2, 98.00), (6, 3, 32), (6, 4, 96.00), (6, 5, 1000), (6, 6, 5.5),
-- Laptop 7: Acer Nitro V 15
(7, 1, 12499000), (7, 2, 80.00), (7, 3, 16), (7, 4, 86.00), (7, 5, 512),  (7, 6, 6.0),
-- Laptop 8: HP Pavilion Aero 13
(8, 1, 13999000), (8, 2, 90.00), (8, 3, 16), (8, 4, 74.00), (8, 5, 512),  (8, 6, 12.5),
-- Laptop 9: Asus Vivobook Go 14
(9, 1, 6599000),  (9, 2, 65.00), (9, 3, 8),  (9, 4, 45.00), (9, 5, 512),  (9, 6, 9.0),
-- Laptop 10: Lenovo IdeaPad Slim 3
(10, 1, 8499000), (10, 2, 78.00), (10, 3, 16), (10, 4, 50.00), (10, 5, 512), (10, 6, 8.5),
-- Laptop 11: MSI Modern 14
(11, 1, 7299000), (11, 2, 68.00), (11, 3, 8),  (11, 4, 48.00), (11, 5, 512), (11, 6, 9.5),
-- Laptop 12: Asus ROG Zephyrus G16
(12, 1, 34999000), (12, 2, 99.00), (12, 3, 32), (12, 4, 99.00), (12, 5, 1000), (12, 6, 8.0),
-- Laptop 13: Apple MacBook Pro 14 M3 Pro
(13, 1, 31999000), (13, 2, 97.00), (13, 3, 18), (13, 4, 95.00), (13, 5, 512),  (13, 6, 17.0),
-- Laptop 14: Dell XPS 13
(14, 1, 26999000), (14, 2, 93.00), (14, 3, 16), (14, 4, 77.00), (14, 5, 1000), (14, 6, 16.0),
-- Laptop 15: HP Victus 15
(15, 1, 9999000),  (15, 2, 83.00), (15, 3, 16), (15, 4, 75.00), (15, 5, 512),  (15, 6, 7.0),
-- Laptop 16: Axioo Pongo 760 V2
(16, 1, 15499000), (16, 2, 91.00), (16, 3, 16), (16, 4, 95.00), (16, 5, 512),  (16, 6, 5.0),
-- Laptop 17: Advan Workplus AI
(17, 1, 7899000),  (17, 2, 91.00), (17, 3, 16), (17, 4, 74.00), (17, 5, 512),  (17, 6, 11.0),
-- Laptop 18: Lenovo ThinkPad E14
(18, 1, 13499000), (18, 2, 84.00), (18, 3, 16), (18, 4, 62.00), (18, 5, 512),  (18, 6, 12.0);

-- 7. Contoh 2 Data Pesanan Awal untuk Pengujian
INSERT INTO orders (id, order_number, customer_name, customer_email, customer_phone, shipping_address, total_amount, payment_method, payment_status, paid_at) VALUES
(1, 'INV-20260929-0042', 'Budi Pratama', 'budi.pratama@example.com', '0812-3456-7890', 'Jl. Sudirman No. 45, Gedung B Lantai 3, Jakarta Pusat, DKI Jakarta 10220', 16499000, 'va_bca', 'paid', NOW()),
(2, 'INV-20260929-0041', 'Siti Rahmawati', 'siti.rahmawati@example.com', '0857-1122-3344', 'Jl. Margonda Raya No. 12, Depok, Jawa Barat', 12999000, 'qris', 'paid', NOW())
ON DUPLICATE KEY UPDATE order_number=VALUES(order_number);

INSERT INTO order_items (order_id, laptop_id, quantity, unit_price, subtotal) VALUES
(1, 1, 1, 16499000, 16499000),
(2, 3, 1, 12999000, 12999000)
ON DUPLICATE KEY UPDATE quantity=VALUES(quantity);

INSERT INTO simulated_payments (order_id, pay_code, bank_name, amount, status) VALUES
(1, '8808081234569901', 'BCA', 16499000, 'success'),
(2, 'QRIS-SIM-20260929-0041', 'QRIS', 12999000, 'success')
ON DUPLICATE KEY UPDATE status=VALUES(status);
