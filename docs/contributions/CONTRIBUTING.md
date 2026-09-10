# Guide de Contribution — Velure

Ce guide détaille l'ensemble du processus pour contribuer efficacement au développement de la plateforme Velure, de la configuration de l'environnement local à la soumission des pull requests.

---

## 1. Configuration de l'Environnement de Développement

### 1.1. Prérequis
- Node.js 20.x ou 22.x
- Gestionnaire de paquets `pnpm` (version 9 ou 10)
- Instance PostgreSQL (locale ou hébergée)

### 1.2. Cloner et Installer
```bash
git clone <url-du-depot>
cd e-commerce
pnpm install
```

### 1.3. Configuration des Variables d'Environnement
Créer un fichier `.env` à la racine :
```env
# Base de données PostgreSQL
DATABASE_URL="postgresql://postgres:password@localhost:5432/velure_db?schema=public"
DIRECT_URL="postgresql://postgres:password@localhost:5432/velure_db?schema=public"

# Supabase Auth & Realtime
NEXT_PUBLIC_SUPABASE_URL="https://votre-projet.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="votre-cle-anonyme"
SUPABASE_SERVICE_ROLE_KEY="votre-cle-service-role"
```

### 1.4. Initialiser la Base de Données
```bash
# Appliquer le schéma relationnel
pnpm exec prisma db push

# Générer le client TypeScript Prisma
pnpm exec prisma generate

# Alimenter la base avec les données de démonstration
pnpm exec prisma db seed
```

---

## 2. Flux de Travail Git

### 2.1. Création de Branche
Créer systématiquement une branche thématique isolée depuis `main` :
```bash
git checkout main
git pull origin main
git checkout -b <type>/<description-courte>
```

### 2.2. Conventions de Nommage des Branches
- `feature/nom-fonctionnalite` : Nouvelle fonctionnalité utilisateur ou back-office.
- `fix/nom-du-correctif` : Correction d'un bug ou d'une anomalie visuelle.
- `refactor/nom-refactoring` : Amélioration de structure sans modification fonctionnelle.
- `docs/nom-documentation` : Ajout ou mise à jour de la documentation.
- `style/nom-ajustement` : Harmonisation de tokens graphiques ou de composants.

---

## 3. Format des Messages de Commit

Les commits doivent impérativement respecter la norme **Conventional Commits** :

```
<type>(<perimetre>): <description imperative en minuscules>

[Corps explicatif optionnel decrivant la motivation, les arbitrages techniques et les fichiers cles modifies]
```

### Types reconnus :
- `feat` : Ajout d'une fonctionnalité.
- `fix` : Correction d'un bug.
- `refactor` : Réorganisation de code sans modification fonctionnelle.
- `style` : Changements esthétiques, formatage, classes Tailwind, alignements.
- `docs` : Documentation technique ou README.
- `perf` : Optimisation des performances de rendu ou requêtes.
- `chore` : Tâches de maintenance, dépendances ou configuration.

---

## 4. Grille de Validation Avant Soumission (Checklist PR)

Avant d'ouvrir une Pull Request ou de fusionner des modifications, valider les points suivants :

1. **Intégrité TypeScript** :
   ```bash
   pnpm exec tsc --noEmit
   ```
   Doit renvoyer 0 erreur.

2. **Respect des Lignes Directrices UI** :
   - Présence systématique de `rounded-lg` sur les éléments interactifs.
   - Respect de la charte sombre quiet luxury (`bg-slate-950`, `bg-slate-900/60`, `border-slate-800/80`).
   - Absence d'emojis dans les libellés et les textes d'interface.

3. **Validation Fonctionnelle** :
   - Tester le bon fonctionnement des formulaires et des Server Actions.
   - Vérifier l'absence de régression sur le panier et les commandes.
