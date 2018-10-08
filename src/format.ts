import { rational } from './core';

export function toString(rational: rational): string {
  const [a, b] = rational;
  return a + '/' + b;
}
