import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import CatalogView from '../views/CatalogView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import InvoiceView from '../views/InvoiceView.vue';
import OrderTrackingView from '../views/OrderTrackingView.vue';
import LoginView from '../views/LoginView.vue';
import AdminDashboardView from '../views/AdminDashboardView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/katalog',
    name: 'Catalog',
    component: CatalogView
  },
  {
    path: '/laptop/:id',
    name: 'ProductDetail',
    component: ProductDetailView
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutView
  },
  {
    path: '/cek-pesanan',
    name: 'OrderTracking',
    component: OrderTrackingView
  },
  {
    path: '/pesanan/:orderNumber',
    name: 'Invoice',
    component: InvoiceView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboardView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
