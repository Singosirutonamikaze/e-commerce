# Cartographie des Routes — Velure

Ce document répertorie l'ensemble des routes accessibles, leurs permissions associées, leur type de rendu et les paramètres attendus.

---

## 1. Routes Publiques (Boutique)

| Route | Rendu | Description |
|---|---|---|
| `/` | Server Component | Page d'accueil avec vitrine, univers en vedette et sélection haute couture. |
| `/products` | Server Component | Catalogue complet avec filtres par univers, prix et ordre de tri. |
| `/products/[slug]` | Server Component | Fiche produit détaillée avec sélection de taille et galerie d'images. |
| `/categories` | Server Component | Vue d'ensemble des univers de la boutique. |
| `/categories/[slug]` | Server Component | Page dédiée à un univers (Chaussures, Chemises, etc.) et ses produits. |
| `/faq` | Server Component | Foire aux questions et informations pratiques. |
| `/privacy` | Server Component | Politique de confidentialité et traitement des données. |
| `/shipping` | Server Component | Conditions de livraison et délais d'expédition. |

---

## 2. Routes d'Authentification

| Route | Rendu | Description |
|---|---|---|
| `/login` | Client Component | Formulaire de connexion avec identifiants ou OAuth. |
| `/register` | Client Component | Formulaire d'inscription d'un nouveau compte client. |
| `/forgot-password` | Client Component | Demande de lien de réinitialisation de mot de passe. |
| `/reset-password` | Client Component | Définition d'un nouveau mot de passe via token sécurisé. |
| `/verify-email` | Client Component | Confirmation de l'adresse email client. |

---

## 3. Routes Espace Client (`/dashboard/**`)

Toutes les routes de cette section exigent une authentification active (`role: CLIENT` ou `role: ADMIN`).

| Route | Rendu | Description |
|---|---|---|
| `/dashboard` | Server Component | Tableau de bord client avec résumé des commandes récentes et raccourcis. |
| `/dashboard/catalogue` | Server Component | Vue catalogue intégrée pour les clients connectés. |
| `/dashboard/categories/[slug]` | Server Component | Exploration des univers depuis l'espace client. |
| `/dashboard/cart` | Client Component | Page complète du panier d'achats avec modification des quantités. |
| `/dashboard/checkout` | Client Component | Tunnel de commande avec choix de l'adresse et validation du code promo. |
| `/dashboard/orders` | Server Component | Historique exhaustif de toutes les commandes du client. |
| `/dashboard/orders/[id]` | Server Component | Détail complet d'une commande (lignes, total, adresse de livraison). |
| `/dashboard/wishlist` | Server Component | Liste des articles sauvegardés en favoris. |
| `/dashboard/profile` | Server / Client | Paramètres du profil, modification des informations et carnet d'adresses. |
| `/dashboard/support` | Server Component | Liste des tickets d'assistance et historiques de conversation. |
| `/dashboard/support/[id]` | Server / Client | Salle de discussion en direct avec la conciergerie Velure. |

---

## 4. Routes Administration (`/admin/**`)

Toutes les routes de cette section exigent une authentification avec privilèges `ADMIN`.

| Route | Rendu | Description |
|---|---|---|
| `/admin` | Server Component | Tableau de bord analytique (chiffre d'affaires, commandes, graphiques). |
| `/admin/categories` | Server Component | Liste et gestion des catégories avec ordre d'affichage. |
| `/admin/categories/new` | Client Component | Formulaire d'ajout d'une nouvelle catégorie d'univers. |
| `/admin/categories/[id]` | Client Component | Formulaire d'édition d'une catégorie existante. |
| `/admin/products` | Server Component | Table des produits avec statut du stock et actions rapides. |
| `/admin/products/new` | Client Component | Formulaire de création d'une nouvelle pièce au catalogue. |
| `/admin/products/[id]` | Client Component | Formulaire de modification complète d'un produit existant. |
| `/admin/orders` | Server Component | Gestion des commandes globales et filtrage par statut logistique. |
| `/admin/orders/[id]` | Server Component | Fiche de commande administrateur avec détails client et adresses. |
| `/admin/customers` | Server Component | Liste des comptes clients et date d'inscription. |
| `/admin/customers/[id]` | Server Component | Profil client détaillé avec carnet d'adresses et historique d'achats. |
| `/admin/promos` | Server Component | Table des codes promotionnels actifs et expirés. |
| `/admin/promos/new` | Client Component | Création d'un nouveau code de réduction. |
| `/admin/promos/[id]` | Client Component | Modification d'un code promotionnel existant. |
| `/admin/support` | Server Component | File des tickets de support client en attente ou résolus. |
| `/admin/support/[id]` | Server / Client | Interface de messagerie directe avec le client. |
| `/admin/settings` | Server Component | Configuration système, état des sessions et sécurité. |
