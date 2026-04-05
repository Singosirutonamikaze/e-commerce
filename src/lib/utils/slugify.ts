/**
 * Converte une chaîne de caractères en slug URL-friendly.
 * @param text - Texte à transformer
 * @returns Slug formaté (ex: "Chaussures de sport" -> "chaussures-de-sport")
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD') // Sépare les accents des lettres
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/[^\w-]+/g, '') // Supprime les caractères spéciaux
    .replace(/--+/g, '-'); // Évite les tirets consécutifs
}
