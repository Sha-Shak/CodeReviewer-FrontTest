export function parseWeekName (name: string) {
  const words = name.split('-');
  words[0] = 'Week';
  return words.join(' ');
}