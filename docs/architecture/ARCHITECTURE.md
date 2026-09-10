# Architecture Technique Detaillée — Velure

Ce document décrit l'ensemble de l'architecture logicielle, des flux de données, des mécanismes de sécurité et des choix de conception régissant l'application e-commerce Velure.

---

## 1. Vue d'Ensemble du Système

Velure adopte une architecture full-stack basée sur Next.js 15 (App Router), exploitant le paradigme React Server Components (RSC) couplé à une base de données relationnelle PostgreSQL via Prisma ORM et une couche d'authentification/temps réel via Supabase.

```
+-----------------------------------------------------------------------+
|                            Navigateur Client                          |
|  - React 19 Client Components (Interactive UI)                        |
|  - Zustand Stores (Panier, Notifications Toast, État UI)              |
|  - Supabase Realtime Client (WebSockets pour le Chat)                 |
+-----------------------------------+-----------------------------------+
                                    |
          HTTPS / SSR / Server Actions / Supabase Realtime WS
                                    |
+-----------------------------------v-----------------------------------+
|                        Serveur Next.js 15 (Node.js)                   |
|                                                                       |
|  [Middleware d'Authentification]                                      |
|    - Validation des tokens JWT Supabase via @supabase/ssr             |
|    - Protection des routes /admin/** et /dashboard/**                 |
|                                                                       |
|  [Server Components]                                                  |
|    - Rendu HTML côté serveur avec streaming React                     |
|    - Accès direct sécurisé à la base de données via Prisma Client     |
|                                                                       |
|  [Server Actions]                                                     |
|    - Validation des entrées avec schémas Zod                          |
|    - Mutations relationnelles (commandes, adresses, profils, promos)   |
|    - Invalidation du cache de rendu via revalidatePath                |
+------------------+---------------------------------+------------------+
                   |                                 |
            Prisma ORM Client                  Supabase Client
                   |                                 |
+------------------v----------------+ +--------------v------------------+
|          PostgreSQL DB            | |       Supabase Service          |
|  - Utilisateurs & Rôles           | |  - Authentification SSR         |
|  - Produits, Catégories, Images   | |  - Gestion des Sessions JWT     |
|  - Commandes & Lignes de commande | |  - WebSockets Realtime          |
|  - Adresses, Promos, Favoris      | +---------------------------------+
|  - Conversations & Messages       |
+-----------------------------------+
```

---

## 2. Découpage Modulaire et Responsabilités

L'arborescence du projet sépare strictement les responsabilités :

### 2.1. Routage Applicatif (`src/app/`)
- `(shop)/` : Routes publiques accessibles à tous les visiteurs (vitrine, catalogue, fiches produits, catégories, FAQ, politique de confidentialité, conditions d'expédition).
- `(auth)/` : Parcours d'authentification (connexion, inscription, réinitialisation de mot de passe, vérification d'email).
- `dashboard/` : Espace réservé aux clients authentifiés (suivi des commandes, gestion du profil, carnet d'adresses, panier, liste d'envies, support client).
- `(admin)/admin/` : Back-office d'administration protégé par rôle `ADMIN` (tableau de bord métrique, gestion du catalogue, commandes, clients, codes promotionnels, tickets support, configuration système).

### 2.2. Composants Modulaires (`src/components/`)
- `ui/` : Primitives d'interface atomiques (Boutons, Champs de saisie, Cartes, Modales, Badges, Toasts).
- `layout/` : Éléments structurels de navigation (Navbar boutique, Sidebar administration, Sidebar dashboard, Headers, Footer).
- `shop/` : Composants interactifs de la boutique publique (Arrière-plan 3D Three.js, bannières d'univers).
- `category/` : Grilles et cartes de navigation des univers de produits.
- `product/` : Cartes de présentation, galeries d'images avec zoom, sélecteurs de variantes et tailles.
- `cart/` : Tiroir latéral (CartDrawer), lignes d'articles (CartItem) et récapitulatif financier (CartSummary).
- `order/` : Historique des commandes client et fiches de détail avec statuts d'expédition.
- `chat/` : Système complet de messagerie (ChatBubble, ClientChat, AdminChat, ChatWindow flottant).
- `admin/` : Tableaux de données avec pagination, formulaires de création et modification (CategoryForm, ProductForm, PromoForm).
- `dashboard/` : Widgets d'accueil, raccourcis et carnet d'adresses.

### 2.3. Couche Métier et Accès aux Données (`src/lib/`)
- `actions/` : Server Actions Next.js encapsulant la logique métier, l'autorisation et les requêtes Prisma.
- `prisma/` : Instance singleton du client Prisma et configuration de la connexion PostgreSQL.
- `supabase/` : Initialisation des clients Supabase pour le contexte client (`client.ts`) et serveur (`server.ts`).
- `utils/` : Constantes de routage (`routes.ts`), formatage des devises et dates (`format.ts`), utilitaire de fusion des classes CSS (`cn.ts`).

### 2.4. État Global (`src/store/`)
- `cart.store.ts` : Gestion du panier local avec synchronisation Zustand et persistance locale.
- `ui.store.ts` : Gestion des états d'interface globaux (ouverture du tiroir de panier, ouverture du chat flottant, file d'attente des notifications toast).

---

## 3. Flux d'Authentification et Contrôle d'Accès (RBAC)

1. **Inscription / Connexion** : L'utilisateur s'authentifie via Supabase Auth. Un enregistrement correspondant est créé ou synchronisé dans la table `User` de la base PostgreSQL.
2. **Session Serveur** : Les Server Components vérifient la session via `supabase.auth.getUser()`. Si la session est absente, une redirection vers `/login` est opérée.
3. **Vérification Administrateur** : Pour les routes `/admin/**`, une vérification supplémentaire interroge le rôle de l'utilisateur dans la base (`User.role === 'ADMIN'`). Les utilisateurs non autorisés sont redirigés ou se voient refuser l'accès (`notFound()` / redirection).

---

## 4. Système de Messagerie et Temps Réel

Le module de support client repose sur une synchronisation bidirectionnelle :
- Les messages sont enregistrés en base de données relationnelle (table `Message` liée à `Conversation`).
- Supabase Realtime diffuse les événements d'insertion (`INSERT`) sur le canal de la conversation (`chat:{conversationId}`).
- Les composants `ClientChat` et `AdminChat` mettent à jour l'historique instantanément sans rechargement de page.

---

## 5. Gestion des Erreurs et Robustesse

- Toutes les Server Actions renvoient un contrat d'interface standard `{ success: true, data?: T } | { error: string }`.
- Les erreurs imprévues sont interceptées dans des blocs `try / catch`, tracées via `console.error` et restituées à l'utilisateur sous forme de notifications toast explicites.
- Les validations d'entrées empêchent toute persistance de données corrompues ou incomplètes.
