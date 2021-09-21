export function isLast<T>(i: T, arr: T[]): boolean {
  return arr.indexOf(i) === arr.length - 1;
}
