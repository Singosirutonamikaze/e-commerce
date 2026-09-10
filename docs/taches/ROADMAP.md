# Feuille de Route & Suivi des Tâches — Velure

Ce document récapitule les fonctionnalités terminées, les tâches en cours et les évolutions futures de la plateforme Velure.

---

## 1. Fonctionnalités Terminées

### Boutique & Expérience Client
- [x] Exploration des univers et catégories hiérarchiques avec page dynamique (`/dashboard/categories/[slug]`).
- [x] Fiches produits détaillées avec sélection des tailles, descriptif luxe et carrousel d'images.
- [x] Panier interactif avec tiroir latéral et page dédiée (`/dashboard/cart`).
- [x] Tunnel de commande complet (Checkout) avec carnet d'adresses client (`Komla Koffi`) et calcul des réductions promo.
- [x] Espace profil & paramètres modernisé en grille 2 colonnes avec récapitulatif de compte.

### Conciergerie & Support
- [x] Refonte complète des composants de chat (`ChatBubble`, `ClientChat`, `AdminChat`, `ChatWindow`).
- [x] Thème sombre quiet luxury (`bg-slate-950/80`, `border-slate-800/80`, `rounded-lg`).
- [x] Intégration Supabase Realtime pour la transmission instantanée des messages.
- [x] Historique des tickets d'assistance client et interface de réponse back-office.

### Administration & Back-Office
- [x] Dashboard administrateur avec graphiques de performance, métriques et raccourcis rapides.
- [x] Gestion du catalogue de produits et catégories (création, édition, suppression).
- [x] Gestion des commandes avec suivi des statuts et fiches clients associées.
- [x] Gestion des codes promotionnels et remises.
- [x] Page de paramètres système et sécurité.

### Cohérence Visuelle & Qualité
- [x] Intégration du logo officiel et du monogramme `V` dans la navigation et les barres latérales.
- [x] Standardisation du design system avec `rounded-lg` sur l'ensemble des modales et formulaires.
- [x] Résolution des erreurs de validation Prisma et typage TypeScript strict sans erreur.

---

## 2. Prochaines Évolutions (Roadmap)

- [ ] **Passerelle de Paiement** : Intégration complète de Stripe / Mobile Money (Flooz, T-Money) pour le règlement des commandes.
- [ ] **Notifications Email** : Envoi d'emails transactionnels (confirmation de commande, expédition) via Resend.
- [ ] **Gestion Multi-Devises** : Support dynamique des devises (FCFA, EUR, USD).
- [ ] **Recherche Avancée** : Recherche vectorielle ou instantanée avec filtres combinés sur le catalogue.
- [ ] **Notifications Push & SMS** : Mises à jour en direct pour les clients lors des changements de statut de commande.
