# Velure — Plateforme E-Commerce Haute Couture & Quiet Luxury

Velure est une application web e-commerce moderne dédiée au luxe discret et à la haute couture, conçue avec **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, **Prisma ORM (PostgreSQL)** et **Supabase (Auth & Realtime)**.

---

## 1. Caractéristiques Principales

### Expérience Client & Boutique
- **Catalogue & Collections Exclusives** : Navigation par univers (Chaussures, Chemises, Pantalons, Accessoires) avec filtres dynamiques, tri et pagination.
- **Fiches Produits Haute Résolution** : Galerie d'images, sélection de tailles, affichage des stocks et recommandations.
- **Panier & Processus de Commande (Checkout)** : Gestion fluide des articles avec Zustand, application de codes promotionnels et sélection d'adresses enregistrées (Komla Koffi).
- **Conciergerie & Support en Direct** : Système de chat en temps réel alimenté par Supabase Realtime, accessible via un tiroir flottant ou un espace dédié.
- **Espace Personnel (Tableau de bord Client)** : Suivi des commandes, gestion des adresses de livraison, liste d'envies (Wishlist) et paramètres de profil.

### Espace Administration (Back-Office)
- **Tableau de bord Analytique** : Indicateurs clés (chiffre d'affaires, commandes récentes, taux de conversion, clients actifs) avec graphiques d'activité.
- **Gestion du Catalogue** : Création, modification et suppression de produits et catégories hiérarchiques.
- **Gestion des Commandes** : Suivi des statuts (`EN_ATTENTE`, `CONFIRME`, `EXPEDIE`, `LIVRE`, `ANNULE`), détails client et adresses de livraison associées.
- **Gestion des Codes Promo** : Configuration de remises (pourcentage ou montant fixe), seuils minimaux d'achat et dates d'expiration.
- **Support & Messagerie Client** : Interface centralisée de réponse aux tickets support et discussions avec historique complet.
- **Paramètres & Sécurité** : Vue d'ensemble de la sécurité, politique de session et statut du système.

---

## 2. Stack Technique

- **Framework** : [Next.js 15](https://nextjs.org/) (App Router, Server Components & Server Actions)
- **UI & Rendu** : [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Lucide Icons](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/)
- **Base de Données & ORM** : PostgreSQL, [Prisma ORM](https://www.prisma.io/)
- **Authentification & Temps Réel** : [Supabase](https://supabase.com/) Auth (SSR) & Realtime Channels
- **State Management** : [Zustand](https://github.com/pmndrs/zustand)
- **Validation** : [Zod](https://zod.dev/), [React Hook Form](https://react-hook-form.com/)

---

## 3. Démarrage Rapide

### Prérequis
- Node.js 20+ ou 22+
- Gestionnaire de paquets `pnpm` (recommandé) ou `npm`
- Instance PostgreSQL (locale ou Supabase)

### Installation

1. **Cloner le dépôt :**
   ```bash
   git clone <url-du-repo>
   cd e-commerce
   ```

2. **Installer les dépendances :**
   ```bash
   pnpm install
   ```

3. **Configurer les variables d'environnement :**
   Créer un fichier `.env` à la racine :
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/velure_db?schema=public"
   DIRECT_URL="postgresql://user:password@localhost:5432/velure_db?schema=public"

   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   ```

4. **Initialiser la base de données :**
   ```bash
   pnpm exec prisma db push
   pnpm exec prisma db seed
   ```

5. **Lancer le serveur de développement :**
   ```bash
   pnpm dev
   ```
   Accéder à l'application sur [http://localhost:3000](http://localhost:3000).

---

## 4. Documentation Détaillée

Consultez le dossier [`docs/`](./docs) pour une documentation approfondie :
- [Architecture Technique](./docs/architecture/ARCHITECTURE.md)
- [Modèle de Base de Données](./docs/database/DATABASE.md)
- [Cartographie des Routes](./docs/routes/ROUTES.md)
- [Conventions de Code & Design](./docs/conventions/CONVENTIONS.md)
- [Guide de Contribution](./docs/contributions/CONTRIBUTING.md)
- [Feuille de Route & Tâches](./docs/taches/ROADMAP.md)
- [Suivi Détaillé des Livrables](./docs/taches/TACHES.md)
- [Stratégie de Tests & Qualité](./docs/tests/TESTING.md)
- [Politique de Sécurité](./docs/securite/SECURITY.md)
- [Licence Légale](./docs/licence/LICENCE.md)

---

## 5. Licence & Sécurité

- [Politique de Sécurité](./docs/securite/SECURITY.md)
- [Licence MIT](./docs/licence/LICENCE.md)

