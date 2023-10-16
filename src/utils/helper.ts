export function parseName (name: string) {
  const words = name.split('-').map(word => word[0].toLocaleUpperCase() + word.slice(1)).join(' ');
  return words;
}

export function capitalizeNames (name: string) {
  return name.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}