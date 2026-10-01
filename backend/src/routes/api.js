const express = require('express');
const router = express.Router();

const spkController = require('../controllers/spkController');
const laptopController = require('../controllers/laptopController');
const profileController = require('../controllers/profileController');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

// 1. SPK Recommendation Route
router.post('/spk/recommend', spkController.getRecommendations);

// 2. Laptops Routes
router.get('/brands', laptopController.getBrands);
router.get('/laptops/brands', laptopController.getBrands);
router.get('/laptops', laptopController.getAll);
router.get('/laptops/:id', laptopController.getById);
router.post('/laptops', laptopController.create);
router.put('/laptops/:id', laptopController.update);
router.patch('/laptops/:id/stock', laptopController.updateStock);
router.delete('/laptops/:id', laptopController.delete);

// 3. User Profiles & Dynamic Weights Routes
router.get('/profiles', profileController.getAll);
router.post('/profiles', profileController.create);
router.put('/profiles/:id/weights', profileController.updateWeights);
router.put('/profiles/:id', profileController.update);
router.delete('/profiles/:id', profileController.delete);

// 4. Order & Simulated Payment Routes
router.post('/orders/checkout', orderController.checkout);
router.post('/orders/:order_number/simulate-pay', orderController.simulatePay);
router.get('/orders/:order_number', orderController.getByOrderNumber);
router.get('/orders', orderController.getAll);

// 5. Auth Routes
router.post('/auth/login', authController.login);
router.get('/auth/me', authController.me);

module.exports = router;
