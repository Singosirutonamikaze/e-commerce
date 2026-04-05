/**
 * ROUTES — Constantes universelles de navigation
 * Utiliser ces constantes dans tout le projet pour éviter les chaînes de routes hardcodées.
 */

// ──────────────────────────────────────────────────────────
// BOUTIQUE (Shop)
// ──────────────────────────────────────────────────────────
export const ROUTES = {
  // Pages principales
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (slug: string) => `/products/${slug}`,
  CATEGORIES: '/categories',
  CATEGORY_DETAIL: (slug: string) => `/categories/${slug}`,
  CART: '/cart',
  CHECKOUT: '/checkout',
  FAQ: '/faq',
  SHIPPING: '/shipping',
  PRIVACY: '/privacy',
  CONTACT: '/contact',
  SUPPORT: '/support',


  // Auth
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    VERIFY_EMAIL: '/verify-email',
  },

  // Compte utilisateur
  ACCOUNT: {
    ROOT: '/account',
    PROFILE: '/account/profile',
    ORDERS: '/account/orders',
    ORDER_DETAIL: (id: string) => `/account/orders/${id}`,
    WISHLIST: '/account/wishlist',
    ADDRESSES: '/account/addresses',
    SUPPORT: '/account/support',
    SUPPORT_DETAIL: (id: string) => `/account/support/${id}`,
  },


  // Administration
  ADMIN: {
    ROOT: '/admin',

    // Produits
    PRODUCTS: '/admin/products',
    PRODUCT_NEW: '/admin/products/new',
    PRODUCT_EDIT: (id: string) => `/admin/products/${id}`,

    // Catégories
    CATEGORIES: '/admin/categories',
    CATEGORY_NEW: '/admin/categories/new',
    CATEGORY_EDIT: (id: string) => `/admin/categories/${id}`,

    // Commandes
    ORDERS: '/admin/orders',
    ORDER_DETAIL: (id: string) => `/admin/orders/${id}`,

    // Clients
    CUSTOMERS: '/admin/customers',
    CUSTOMER_DETAIL: (id: string) => `/admin/customers/${id}`,

    // Promotions
    PROMOS: '/admin/promos',
    PROMO_NEW: '/admin/promos/new',
    PROMO_EDIT: (id: string) => `/admin/promos/${id}`,

    // Support
    SUPPORT: '/admin/support',
    SUPPORT_DETAIL: (id: string) => `/admin/support/${id}`,

    // Paramètres
    SETTINGS: '/admin/settings',
  },
} as const;
