export function parseName (name: string) {
  const words = name.split('-').map(word => word[0].toLocaleUpperCase() + word.slice(1)).join(' ');
  return words;
}

export function capitalizeNames (name: string) {
  console.log("cap", name)
  return name.replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}