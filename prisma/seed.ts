import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const connectionString = (process.env.DATABASE_URL || "") + ((process.env.DATABASE_URL || "").includes("?") ? "&" : "?") + "sslmode=no-verify"
const pool = new pg.Pool({ 
  connectionString,
  ssl: { rejectUnauthorized: false }
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('--- Initialisation du Seeding Velure ---')

  // 1. Création des Catégories de base
  const categories = [
    { nom: 'Chaussures', slug: 'chaussures', ordre: 1 },
    { nom: 'Chemises', slug: 'chemises', ordre: 2 },
    { nom: 'Pantalons', slug: 'pantalons', ordre: 3 },
    { nom: 'Accessoires', slug: 'accessoires', ordre: 4 },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
    console.log(`Catégorie créée/vérifiée : ${cat.nom}`)
  }

  // 2. Création d'un produit exemple pour chaque catégorie
  console.log('Création des produits de démonstration...')
  
  const chaussuresCat = await prisma.category.findUnique({ where: { slug: 'chaussures' } })
  if (chaussuresCat) {
    await prisma.product.upsert({
      where: { slug: 'derbies-cuir-premium' },
      update: {},
      create: {
        nom: 'Derbies en Cuir Premium',
        slug: 'derbies-cuir-premium',
        description: 'Des derbies élégantes fabriquées avec le meilleur cuir de veau. Parfaites pour vos soirées ou le bureau.',
        prix: 189.99,
        ancienPrix: 249.00,
        stock: 15,
        categorieId: chaussuresCat.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800', ordre: 1 }
          ]
        }
      },
    })
  }

  const chemisesCat = await prisma.category.findUnique({ where: { slug: 'chemises' } })
  if (chemisesCat) {
    await prisma.product.upsert({
      where: { slug: 'chemise-oxford-blanche' },
      update: {},
      create: {
        nom: 'Chemise Oxford Classique',
        slug: 'chemise-oxford-blanche',
        description: 'Une chemise Oxford intemporelle, coupe ajustée, tissu respirant.',
        prix: 85.00,
        stock: 25,
        categorieId: chemisesCat.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800', ordre: 1 }
          ]
        }
      },
    })
  }

  console.log('--- Seeding terminé avec succès ---')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
