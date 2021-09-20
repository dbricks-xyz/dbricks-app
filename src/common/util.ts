export function isLast<T>(i: T, arr: T[]): boolean {
  console.log(i);
  console.log('arr', arr);
  return arr.indexOf(i) === arr.length - 1;
}
