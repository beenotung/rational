import {rational} from '../src/core';

function test(f: number) {
  // console.log(`testing ${f}`);
  console.log(`  ${f} = ${rational(f, 1e-16).join('/')}`)
}

function phi() {
  return Math.sqrt(5) / 2 + .5;
}

let x = 10000000000000;
let y = 1000000000000;
[
  0,
  3,
  3.0,
  3.14,
  3.14159265358979,
  phi(),
  0.25,
  0.1,
  0.2,
  0.3,
  0.1 + 0.2,
  x / (x + 1),
  (x + 1) / x,
  1 / 98 * 98,
  y / (y + 1),
  (y + 1) / y,
].forEach(test);
