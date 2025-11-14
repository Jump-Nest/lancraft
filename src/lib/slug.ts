export function slugify(input: string): string {
  if (!input) return '';

  return input
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // odstranit diakritiku
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // povolit jen pismena, cisla, mezery a pomlcky
    .trim()
    .replace(/\s+/g, '-') // mezery -> pomlcky
    .replace(/-+/g, '-'); // sloucit vice pomlcek
}

