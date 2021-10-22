import DashboardLayout from '@/views/admin/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/admin/Pages/AuthLayout.vue';

import NotFound from '@/views/admin/NotFoundPage.vue';


const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: () => import('../views/user/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/user/Login.vue')
  },
  {
    path: '/add-profile',
    name: 'AddProfile',
    component: () => import('../views/user/MakeProfile.vue')
  },
  {
    path: '/browse',
    name: 'Products',
    component: () => import('../views/user/products.vue')
  },
  {
    path: '/orders',
    name: 'Orders',
    meta: {auth: true},
    component: () => import('../views/user/Orders.vue')
  },
  {
    path: '/orders/:orderId',
    name: 'OrderDetails',
    meta: {auth: true},
    component: () => import('../views/user/OrderDetails.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/user/Search.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {auth: true},
    component: () => import('../views/user/Profile.vue')
  },
  {
    path: '/category/:id',
    name: 'category',
    component: () => import('../views/user/Category.vue')
  },
  {
    path: '/purchase-complete',
    name: 'purchase-complete',
    component: () => import('../views/user/PurchaseComplete.vue')
  },
  {
    path: '/privacy',
    name: 'privacy-policy',
    component: () => import('../views/static/PrivacyPolicy.vue')
  },
  {
    path: '/terms-of-policy',
    name: 'terms-of-policy',
    component: () => import('../views/static/TermsOfPolicy.vue')
  },
  {
    path: '/support',
    name: 'contact-us',
    component: () => import('../views/static/ContactUs.vue')
  },
  {
    path: '/marketing',
    name: 'marketing',
    redirect: '/'
  },
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: '/admin/',
        redirect: '/admin/orders'
      },
      {
        path: '/admin/delivery-time',
        name: 'Delivery-time',
        meta: {admin: true},
        component: () => import('../views/admin/Dashboard')
      },

      {
        path: '/admin/shop',
        name: 'Shop',
        meta: {admin: true},
        component: () => import('../views/admin/Shop')
      },
      {
        path: '/admin/products',
        name: 'products',
        meta: {admin: true},
        component: () => import('../views/admin/Products')
      },
      {
        path: '/admin/sms',
        name: 'sms',
        meta: {admin: true},
        component: () => import('../views/admin/Messages')
      },
      {
        path: '/admin/categories',
        name: 'Categories',
        meta: {admin: true},
        component: () => import('../views/admin/Categories')
      },
      {
        path: '/admin/sections',
        name: 'Sections',
        meta: {admin: true},
        component: () => import('../views/admin/Sections')
      },
      {
        path: '/admin/products/add',
        name: 'add-Products',
        meta: {admin: true},
        component: () => import('../views/admin/Products/Add')
      },
      {
        path: '/admin/products/arrange',
        name: 'arrange-Products',
        meta: {admin: true},
        component: () => import('../views/admin/Products/Arrange')
      },
      {
        path: '/admin/products/:id/edit',
        name: 'edit-Products',
        meta: {admin: true},
        component: () => import('../views/admin/Products/Add')
      },
       {
        path: '/admin/orders',
        name: 'Orders',
        meta: {admin: true},
        component: () => import('../views/admin/Orders')
      },
      {
        path: '/admin/orders/:status',
        name: 'Pending-Orders',
        meta: {admin: true},
        component: () => import('../views/admin/Orders/status')
      },

      {
        path: '/admin/users',
        name: 'users',
        meta: {admin: true},
        component: () => import('../views/admin/User')
      },
      {
        path: '/admin/riders',
        name: 'riders',
        meta: {admin: true},
        component: () => import('../views/admin/Riders')
      },

      {
        path: '/admin/transactions',
        name: 'transections',
        meta: {admin: true},
        component: () => import('../views/admin/Transection')
      },

      /*
      RIDER ROUTES
       */
      {
        path: '/rider/',
        redirect: '/rider/orders'
      },
      {
        path: '/rider/orders',
        name: 'Orders',
        meta: {rider: true},
        component: () => import('../views/rider/Orders')
      },

    ]
  },
  { path: '*', component: NotFound }
];

export default routes;
