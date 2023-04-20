export function vw(n: number): number {
  return document.documentElement.clientWidth * (n / 100);
}

export function vh(n: number): number {
  return document.documentElement.clientHeight * (n / 100);
}
