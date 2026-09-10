/**
 * ROUTES — Constantes universelles de navigation
 * Utiliser ces constantes dans tout le projet pour éviter les chaînes de routes hardcodées.
 */

// ──────────────────────────────────────────────────────────
// BOUTIQUE (Shop)
// ──────────────────────────────────────────────────────────
export const ROUTES = {
  // Pages principales
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (slug: string) => `/products/${slug}`,
  CATEGORIES: "/categories",
  CATEGORY_DETAIL: (slug: string) => `/categories/${slug}`,
  CART: "/dashboard/cart",
  CHECKOUT: "/dashboard/checkout",
  FAQ: "/faq",
  SHIPPING: "/shipping",
  PRIVACY: "/privacy",
  CONTACT: "/contact",
  SUPPORT: "/support",

  // Dashboard (espace connecté)
  DASHBOARD: {
    ROOT: "/dashboard",
    CART: "/dashboard/cart",
    CATALOGUE: "/dashboard/catalogue",
    SHOP: "/dashboard/shop",
    CATEGORY_DETAIL: (slug: string) => `/dashboard/categories/${slug}`,
    ADMIN: "/dashboard/admin",
    PRODUCTS: "/dashboard/produits",
    PRODUCT_DETAIL: (slug: string) => `/dashboard/products/${slug}`,
    PROFILE: "/dashboard/profile",
    ORDERS: "/dashboard/orders",
    ORDER_DETAIL: (id: string) => `/dashboard/orders/${id}`,
    WISHLIST: "/dashboard/wishlist",
    ADDRESSES: "/dashboard/addresses",
    SUPPORT: "/dashboard/support",
    SUPPORT_DETAIL: (id: string) => `/dashboard/support/${id}`,
  },

  // Auth
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    VERIFY_EMAIL: "/verify-email",
  },

  // Administration
  ADMIN: {
    ROOT: "/admin",

    // Produits
    PRODUCTS: "/admin/products",
    PRODUCT_NEW: "/admin/products/new",
    PRODUCT_EDIT: (id: string) => `/admin/products/${id}`,

    // Catégories
    CATEGORIES: "/admin/categories",
    CATEGORY_NEW: "/admin/categories/new",
    CATEGORY_EDIT: (id: string) => `/admin/categories/${id}`,

    // Commandes
    ORDERS: "/admin/orders",
    ORDER_DETAIL: (id: string) => `/admin/orders/${id}`,

    // Clients
    CUSTOMERS: "/admin/customers",
    CUSTOMER_DETAIL: (id: string) => `/admin/customers/${id}`,

    // Promotions
    PROMOS: "/admin/promos",
    PROMO_NEW: "/admin/promos/new",
    PROMO_EDIT: (id: string) => `/admin/promos/${id}`,

    // Support
    SUPPORT: "/admin/support",
    SUPPORT_DETAIL: (id: string) => `/admin/support/${id}`,

    // Paramètres
    SETTINGS: "/admin/settings",
  },
} as const;
