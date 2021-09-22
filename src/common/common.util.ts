export function isLast<T>(i: T, arr: T[]): boolean {
  return arr.indexOf(i) === arr.length - 1;
}

export function shortenPk(fullPk: string): string {
  return `${fullPk.substring(0, 5)}..`;
}
