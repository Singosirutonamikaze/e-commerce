# Spécifications Détaillées des Issues Roadmap — Velure

Ce document regroupe les spécifications complètes de toutes les issues identifiées dans la feuille de route du projet Velure.

---

## Issue #1 — feat(payment): Intégration Passerelle de Paiement (Stripe & Mobile Money Flooz / T-Money)

- **Type** : `Feature`
- **Labels** : `enhancement`, `roadmap`, `payment`
- **Priorité** : Haute

### Description
Intégrer une solution complète et sécurisée de paiement pour finaliser le tunnel de commande sur Velure, supportant à la fois les cartes bancaires internationales et les portefeuilles mobiles ouest-africains.

### Spécifications & Tâches
- [ ] **Stripe Checkout / Elements** :
  - Intégration du SDK Stripe côté serveur (`stripe-node`) et client (`@stripe/stripe-js`, `@stripe/react-stripe-js`).
  - Route d'initialisation de session de paiement `/api/checkout/stripe`.
- [ ] **Passerelles Mobile Money** :
  - Intégration de Flooz (Moov Money) et T-Money (Togocom / API agrégateur type PayGate ou FedaPay / CinetPay).
  - Gestion des requêtes USSD Push et confirmation synchrone/asynchrone.
- [ ] **Gestion des Webhooks** :
  - Endpoint `/api/webhooks/payment` avec validation de signature cryptographique.
  - Mise à jour du statut de la commande en `CONFIRME` à la réception de l'événement `payment_intent.succeeded`.
- [ ] **Expérience Utilisateur** :
  - Page de confirmation de succès (`/dashboard/checkout/success`) et d'annulation (`/dashboard/checkout/cancel`).

### Critères d'acceptation
- Conformité PCI-DSS (aucun numéro de carte stocké sur le serveur).
- Traitement idempotent des webhooks pour éviter tout double débit.
- Gestion fluide des refus de paiement avec alertes visuelles claires.

---

## Issue #2 — feat(notification): Envoi d'Emails Transactionnels et Factures PDF via Resend

- **Type** : `Feature`
- **Labels** : `enhancement`, `roadmap`, `notification`
- **Priorité** : Haute

### Description
Mettre en place un système d'envoi d'emails transactionnels fiables et esthétiques, fidèles à l'identité visuelle *Quiet Luxury* de Velure.

### Spécifications & Tâches
- [ ] **Configuration de l'infrastructure** :
  - Intégration du SDK **Resend** et validation du domaine d'envoi (DKIM / SPF).
  - Modèles d'emails développés avec **React Email** (`@react-email/components`).
- [ ] **Templates d'emails** :
  - Confirmation de commande avec récapitulatif des articles, adresse et total.
  - Notification de changement de statut d'expédition.
  - Confirmation de création de compte et réinitialisation de mot de passe.
- [ ] **Factures PDF** :
  - Génération dynamique de facture PDF côté serveur (`@react-pdf/renderer` ou `pdfkit`).
  - Attachement du fichier PDF à l'email de confirmation.

### Critères d'acceptation
- Rendu parfait sur clients mails desktop et mobile (Gmail, Apple Mail, Outlook).
- Envoi non-bloquant en arrière-plan (queue ou Server Action asynchrone).

---

## Issue #3 — feat(i18n): Gestion Multi-Devises (FCFA, EUR, USD) & Internationalisation

- **Type** : `Feature`
- **Labels** : `enhancement`, `roadmap`, `i18n`
- **Priorité** : Moyenne

### Description
Permettre l'affichage et la conversion automatique ou manuelle des devises pour les clients internationaux et de la zone UEMOA.

### Spécifications & Tâches
- [ ] **Sélecteur de Devise & Locale** :
  - Sélecteur de devise dans la barre supérieure ou les paramètres du profil.
  - Détection automatique de la géolocalisation ou de la locale du navigateur.
- [ ] **Logique Financière & Conversion** :
  - Stockage de la devise de base (EUR ou FCFA) dans la base de données.
  - Service de taux de change avec mise en cache et actualisation périodique.
- [ ] **Dictionnaires de Traduction** :
  - Support multilingue Français / Anglais pour l'ensemble des pages publiques et du dashboard.

### Critères d'acceptation
- Précision des arrondis et cohérence du montant exact entre panier, checkout et passerelle de paiement.
- Persistance du choix utilisateur dans les cookies ou le store Zustand.

---

## Issue #4 — feat(search): Recherche Avancée et Instantanée avec Filtres Multi-Critères

- **Type** : `Feature`
- **Labels** : `enhancement`, `roadmap`
- **Priorité** : Moyenne

### Description
Offrir une expérience de recherche et de découverte de catalogue rapide, intuitive et performante.

### Spécifications & Tâches
- [ ] **Barre de Recherche Globale** :
  - Champ de recherche avec debounce (300ms) et dropdown d'aperçu instantané.
  - Raccourci clavier universel (`Cmd+K` / `Ctrl+K`).
- [ ] **Filtres Combinés** :
  - Filtrage par univers, sous-catégories, fourchette de prix, tailles et disponibilité en stock.
  - Tri par pertinence, nouveautés, prix croissant/décroissant.
- [ ] **Synchronisation URL** :
  - Synchronisation bidirectionnelle des filtres avec les `searchParams` de l'URL pour faciliter le partage.

### Critères d'acceptation
- Temps de réponse de la recherche < 100ms.
- État des filtres conservé lors du rechargement de page ou du partage de lien.

---

## Issue #5 — feat(push): Notifications Push Web & Alertes SMS pour le Suivi des Commandes

- **Type** : `Feature`
- **Labels** : `enhancement`, `roadmap`, `notification`
- **Priorité** : Basse

### Description
Informer les clients en direct de l'état de préparation et de livraison de leurs commandes par SMS et notifications push de navigateur.

### Spécifications & Tâches
- [ ] **Passerelle SMS** :
  - Intégration d'un fournisseur SMS (Twilio, Termii ou passerelle SMS locale).
  - Envoi de SMS lors du passage en statut `EXPEDIE` ou `LIVRE`.
- [ ] **Web Push Notifications** :
  - Enregistrement du Service Worker et gestion des souscriptions push (`PushManager`).
- [ ] **Préférences Utilisateur** :
  - Panneau de gestion des consentements et canaux de notification dans l'espace profil.

### Critères d'acceptation
- Respect des règles de consentement RGPD / opt-in explicite.
- Messages formatés avec le nom de la marque Velure.

---

## Issue #6 — perf(ui): Optimisation du Chargement des Médias (Blur Placeholders) et UX Mobile du Back-Office

- **Type** : `Performance`
- **Labels** : `performance`, `roadmap`
- **Priorité** : Moyenne

### Description
Accélérer la vitesse de chargement visuelle du catalogue et parfaire l'ergonomie sur petits écrans pour le panneau d'administration.

### Spécifications & Tâches
- [ ] **Médias & Images** :
  - Intégration de `plaiceholder` ou génération de `blurDataURL` lors de l'upload des images.
  - Configuration avancée du cache d'images Next.js.
- [ ] **Back-Office Mobile** :
  - Adaptation des tableaux de données volumineux (commandes, produits) en cartes compactes sur mobile.
  - Optimisation des formulaires d'édition et modales pour les écrans tactiles.

### Critères d'acceptation
- Amélioration notable du score Core Web Vitals (LCP < 2.5s).
- Aucune régression visuelle ou décalage de mise en page (CLS = 0).
