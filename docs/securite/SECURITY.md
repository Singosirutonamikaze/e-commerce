# Politique de Sécurité — Velure

Nous accordons une importance primordiale à la sécurité des transactions et à la confidentialité des données de nos utilisateurs et clients.

## 1. Mesures de Sécurité Appliquées

1. **Authentification & Sessions** :
   - Authentification gérée par **Supabase Auth** avec tokens chiffrés et gestion sécurisée des cookies `httpOnly` via `@supabase/ssr`.
   - Contrôle d'accès basé sur les rôles (**RBAC**) distinguant strictement les clients (`CLIENT`) des administrateurs (`ADMIN`).

2. **Accès Base de Données & Protection des Requêtes** :
   - Requêtes typées via **Prisma ORM** protégeant nativement contre les injections SQL.
   - Validation stricte des entrées utilisateurs via des schémas **Zod** côté serveur.

3. **Protection des Données Personnelles** :
   - Séparation stricte des tables utilisateurs, commandes et adresses.
   - Communications client/support sécurisées et chiffrées en transit via TLS/HTTPS.

## 2. Signaler une Vulnérabilité

Si vous découvrez une faille ou un problème de sécurité au sein de l'application Velure :
1. Ne divulguez pas publiquement la vulnérabilité.
2. Envoyez un rapport détaillé par email à : `security@velure-luxury.com` (ou au responsable du projet).
3. Incluez dans votre signalement :
   - Les étapes pour reproduire le comportement.
   - L'impact potentiel identifié.
   - Des exemples de requêtes ou captures d'écran si applicable.

Nous nous engageons à analyser et corriger toute vulnérabilité confirmée dans les plus brefs délais.
