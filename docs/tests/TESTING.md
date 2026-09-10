# Strategie de Tests & Assurance Qualite — Velure

Ce document décrit les processus de validation statique, les contrôles de schéma de base de données et les protocoles de tests manuels pour garantir la fiabilité de la plateforme Velure.

---

## 1. Validation Statique du Code

### 1.1. Verification TypeScript
La compilation statique stricte vérifie l'absence de toute divergence de typage à travers l'ensemble du projet :
```bash
pnpm exec tsc --noEmit
```
*Critere d'acceptation obligatoire : 0 erreur détectée.*

### 1.2. Analyseur de Code ESLint
Vérifie la conformité avec les règles Next.js Core Web Vitals et les standards TypeScript :
```bash
pnpm exec eslint .
```

---

## 2. Validation de la Base de Donnees Prisma

Pour s'assurer de la synchronisation entre le modèle applicatif et la structure PostgreSQL :
```bash
# Valider la syntaxe et les relations du schema.prisma
pnpm exec prisma validate

# Regenerer les types TypeScript du client Prisma
pnpm exec prisma generate
```

---

## 3. Protocoles de Tests Fonctionnels Manuels

### Protocole A : Parcours Authentification & Securite
1. Se connecter avec un compte client : vérifier la redirection vers `/dashboard`.
2. Tenter d'accéder à `/admin` avec ce compte : vérifier le refus d'accès ou la redirection.
3. Se connecter avec un compte administrateur : vérifier l'accès complet au back-office.
4. Tester la déconnexion via la modale de confirmation.

### Protocole B : Parcours Boutique, Panier et Commande
1. Parcourir les catégories depuis la boutique publique et depuis `/dashboard/shop`.
2. Ouvrir une fiche produit, sélectionner une taille disponible et ajouter au panier.
3. Ouvrir le tiroir latéral (`CartDrawer`), modifier la quantité et vérifier la mise à jour du prix.
4. Accéder au checkout (`/dashboard/checkout`) :
   - Vérifier la sélection des adresses enregistrées (`Komla Koffi`).
   - Tester l'ajout d'une nouvelle adresse via la modale `rounded-lg`.
   - Appliquer un code promotionnel valide (ex: `LUXE10`) et vérifier la déduction correcte du total.
5. Valider la commande et vérifier son apparition dans `/dashboard/orders`.

### Protocole C : Parcours Conciergerie & Support
1. Depuis l'espace client, ouvrir le tiroir flottant `ChatWindow` ou la page `/dashboard/support/[id]`.
2. Envoyer un message textuel : vérifier l'apparition immédiate de la bulle claire côté client.
3. Depuis une autre session administrateur sur `/admin/support/[id]`, vérifier la réception temps réel via Supabase.
4. Répondre au client : vérifier la mise à jour instantanée sans rechargement.
