# Conventions de Code & Standards Techniques — Velure

Ce guide formalise l'ensemble des règles de développement, des standards de typage, de la structure des fichiers et des directives stylistiques du projet Velure.

---

## 1. Principes Stylistiques : Quiet Luxury Design System

L'interface de Velure incarne le luxe discret : sobriété, lisibilité, absence d'artifices criards et contrastes équilibrés.

### 1.1. Palette de Couleurs Fondamentales
- **Fond principal d'application** : `bg-slate-950` / `bg-slate-900`
- **Cartes et conteneurs d'informations** : `bg-slate-900/60 backdrop-blur-md` ou `bg-slate-950/80`
- **Bordures et séparateurs** : `border-slate-800/80` ou `border-slate-800/60`
- **Typographie principale (Titres, Corps)** : `text-slate-100` / `text-white`
- **Typographie secondaire (Labels, Métadonnées, Dates)** : `text-slate-400` / `text-slate-500`
- **Boutons d'action primaire** : `bg-white text-slate-950 hover:bg-slate-200 transition-colors`
- **Badges de statut opérationnel** :
  - Succès / Actif : `bg-emerald-500/10 text-emerald-400 border border-emerald-500/20`
  - Avertissement / En attente : `bg-amber-500/10 text-amber-400 border border-amber-500/20`
  - Erreur / Expiré : `bg-rose-500/10 text-rose-400 border border-rose-500/20`
  - Neutre / Résolu : `bg-slate-900 text-slate-400 border border-slate-800`

### 1.2. Rayons de Courbure (Border Radius)
- La règle absolue est l'utilisation de `rounded-lg` pour :
  - Les conteneurs, cartes (`Card`), modales (`Modal`), formulaires, champs de saisie (`Input`), boutons (`Button`), listes déroulantes et bulles de conversation.
  - Les avatars et puces d'état utilisent `rounded-full` ou `rounded-lg` selon le contexte.

### 1.3. Rédaction et Typographie
- Pas de texte en majuscules forcées artificielles (`uppercase tracking-widest`) sans justification contextuelle (uniquement réservé aux codes promo et SKU).
- Rédaction soignée en français élégant : termes privilégies (*Conciergerie*, *Panier d'achats*, *Pièces d'exception*, *Commandes*, *Carnet d'adresses*).
- Absence totale d'emojis dans les interfaces et la documentation technique.

---

## 2. Standards TypeScript & React

### 2.1. Typage Strict et Définitions
- Aucun usage du type `any` ou `never` non justifié.
- Utiliser systématiquement les types générés par Prisma (`@prisma/client`) ou les types étendus définis dans `src/types/`.
- Définir les propriétés des composants via des interfaces avec le modificateur `Readonly<Props>` :
  ```tsx
  interface ProductCardProps {
    product: ProductWithImages;
  }

  export function ProductCard({ product }: Readonly<ProductCardProps>) {
    // ...
  }
  ```

### 2.2. Server Components vs Client Components
- Par défaut, tout nouveau composant doit être un Server Component.
- Ajouter la directive `"use client";` au début du fichier uniquement si le composant utilise :
  - Des hooks React (`useState`, `useEffect`, `useRef`, `useCallback`, etc.).
  - Des écouteurs d'événements navigateur (`onClick`, `onChange`, `onSubmit`).
  - Des stores Zustand (`useCart`, `useUIStore`).
  - Des bibliothèques clientes (Framer Motion, Lucide icons avec état).

### 2.3. Propreté du Code JSX
- Ne jamais laisser de commentaires JSX temporaires `{/* ... */}` dans les composants finaux.
- Ne pas doubler les instructions `return` dans les fonctions de rappel (`.map()`, etc.).
- Gérer l'hydratation côté client via `useSyncExternalStore` ou des gardes conditionnels afin d'éviter les rendus en cascade.

---

## 3. Server Actions & Mutations de Données

Toutes les actions d'écriture (création, mise à jour, suppression) doivent résider dans `src/lib/actions/` et respecter le schéma :

```typescript
'use server'

import prisma from '@/lib/prisma/client'
import { revalidatePath } from 'next/cache'

export async function maFonctionAction(donnees: InputType) {
  try {
    // 1. Validation de l'authentification et des autorisations
    // 2. Validation des entrées
    // 3. Exécution de la mutation Prisma
    const resultat = await prisma.modele.create({ data: donnees })
    
    // 4. Invalidation du cache Next.js
    revalidatePath('/chemin-cible')
    
    return { success: true, data: resultat }
  } catch (error) {
    console.error('Erreur dans maFonctionAction:', error)
    return { error: 'Message d\'erreur explicite pour l\'utilisateur' }
  }
}
```

---

## 4. Organisation des Fichiers et Nommage

- **Composants React** : PascalCase (ex: `ProductCard.tsx`, `CartDrawer.tsx`).
- **Dossiers de composants** : PascalCase contenant le composant principal (ex: `src/components/chat/ClientChat/ClientChat.tsx`).
- **Fichiers utilitaires et actions** : camelCase ou kebab-case avec suffixe explicite (ex: `user.actions.ts`, `format.ts`, `routes.ts`).
- **Stores Zustand** : `nom.store.ts` (ex: `cart.store.ts`, `ui.store.ts`).
- **Hooks personnalisés** : `useNom.ts` (ex: `useCart.ts`, `useChat.ts`).
