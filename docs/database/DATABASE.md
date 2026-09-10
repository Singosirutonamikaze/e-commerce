# Schema de Base de Donnees — Velure

Ce document fournit la description exhaustive du modèle relationnel PostgreSQL géré via Prisma ORM pour la plateforme Velure.

---

## 1. Enumerations

### 1.1. `Role`
Définit les privilèges de l'utilisateur au sein du système :
- `CLIENT` : Utilisateur standard avec accès à la boutique, au panier, aux commandes et à son espace support.
- `ADMIN` : Administrateur avec accès complet au back-office, à la gestion du catalogue, aux finances et au support.

### 1.2. `OrderStatus`
Statut du cycle de vie d'une commande :
- `EN_ATTENTE` : Commande créée en attente de traitement ou de confirmation.
- `CONFIRME` : Commande validée et enregistrée.
- `EXPEDIE` : Colis expédié par le transporteur.
- `LIVRE` : Commande réceptionnée par le client.
- `ANNULE` : Commande annulée ou remboursée.

### 1.3. `PromoType`
Type de remise appliqué par un code promotionnel :
- `POURCENTAGE` : Remise relative calculée en pourcentage du sous-total.
- `MONTANT_FIXE` : Remise absolue déduite en valeur monétaire directe.

### 1.4. `ConversationStatus`
Statut du ticket de support :
- `OUVERTE` : Discussion active en attente de réponse.
- `FERMEE` : Ticket résolu et archivé.

### 1.5. `MessageType`
Type de contenu véhiculé par un message :
- `TEXTE` : Message textuel standard.
- `IMAGE` : Pièce jointe image.
- `SYSTEME` : Notification système générée automatiquement.

---

## 2. Entites Principales et Relations

### 2.1. `User`
Représente les comptes clients et administrateurs.
- `id` (String / UUID, Clé primaire)
- `email` (String, Unique)
- `nom` (String)
- `prenom` (String)
- `telephone` (String, Optionnel)
- `avatarUrl` (String, Optionnel)
- `role` (Role, Défaut: `CLIENT`)
- `emailVerifie` (Boolean, Défaut: `false`)
- `createdAt` / `updatedAt` (DateTime)
- **Relations** : `addresses` (1-N Address), `orders` (1-N Order), `wishlist` (1-N Wishlist), `conversations` (1-N Conversation), `messages` (1-N Message), `cart` (1-1 Cart).

### 2.2. `Category`
Arborescence des univers et catégories de la boutique.
- `id` (String / UUID, Clé primaire)
- `nom` (String)
- `slug` (String, Unique)
- `imageUrl` (String, Optionnel)
- `ordre` (Int, Défaut: 0)
- `parentId` (String, Optionnel - Référence à Category parente)
- **Relations** : `parent` / `enfants` (Auto-relation hiérarchique), `products` (1-N Product).

### 2.3. `Product` & `ProductImage`
Articles de mode et pièces d'exception.
- `id` (String / UUID, Clé primaire)
- `nom` (String)
- `slug` (String, Unique)
- `description` (String)
- `prix` (Decimal / Float)
- `prixPromo` (Decimal / Float, Optionnel)
- `sku` (String, Unique)
- `stock` (Int, Défaut: 0)
- `enVedette` (Boolean, Défaut: `false`)
- `actif` (Boolean, Défaut: `true`)
- `matiere` (String, Optionnel)
- `couleur` (String, Optionnel)
- `tailles` (Tableau de chaînes : XS, S, M, L, XL, etc.)
- `categoryId` (String, Clé étrangère vers Category)
- **Relations** : `category` (N-1 Category), `images` (1-N ProductImage avec champ `ordre`), `orderItems` (1-N OrderItem), `wishlists` (1-N Wishlist).

### 2.4. `Order` & `OrderItem`
Historique des transactions et lignes d'achat.
- `Order` : `id`, `numero` (Unique), `total`, `sousTotal`, `fraisLivraison`, `montantReduction`, `statut` (OrderStatus), `userId`, `adresseId`, `promoId` (Optionnel).
- `OrderItem` : `id`, `ordreId`, `produitId`, `quantite`, `prixUnitaire`, `taille` (Optionnel).

### 2.5. `Address`
Carnet d'adresses postales et de facturation.
- `id` (String / UUID, Clé primaire)
- `userId` (String, Clé étrangère vers User)
- `rue` (String)
- `complementAdresse` (String, Optionnel)
- `ville` (String)
- `codePostal` (String)
- `pays` (String)
- `estDefaut` (Boolean, Défaut: `false`)

### 2.6. `Promo`
Règles de réductions commerciales.
- `id` (String / UUID, Clé primaire)
- `code` (String, Unique, Majuscules)
- `reduction` (Decimal / Float)
- `type` (PromoType)
- `montantMinimum` (Decimal / Float, Optionnel)
- `dateExpiration` (DateTime)
- `limiteUtilisation` (Int, Optionnel)
- `nombreUtilisations` (Int, Défaut: 0)
- `estActif` (Boolean, Défaut: `true`)

### 2.7. `Conversation` & `Message`
Messagerie d'assistance et conciergerie.
- `Conversation` : `id`, `userId`, `statut` (ConversationStatus), `ordreId` (Optionnel, liaison avec commande).
- `Message` : `id`, `conversationId`, `expediteurId`, `contenu`, `type` (MessageType), `lu` (Boolean).
