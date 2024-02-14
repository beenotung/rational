import { add, divide, minus, multiply, pow } from '../src/math';
import { toString } from '../src/format';
import { rational } from '../src/core';
import { expect } from 'chai';

function test(f: Function, x: rational, y: rational) {
  it(`${toString(x)} ${f.name} ${toString(y)}`, () => {
    let z = f(x, y);
    let op = (() => {
      switch (f) {
        case add:
          return (a, b) => a + b;
        case minus:
          return (a, b) => a - b;
        case multiply:
          return (a, b) => a * b;
        case divide:
          return (a, b) => a / b;
        case pow:
          return (a, b) => Math.pow(a, b);
        default:
          throw new Error('unknown op: ' + f);
      }
    })();
    expect(z[0] / z[1]).to.equals(op(x[0] / x[1], y[0] / y[1]))
  })
}

(
  [
    [add, [1, 2], [3, 4]],
    [add, [3, 4], [1, 2]],
    [minus, [1, 2], [3, 4]],
    [minus, [3, 4], [1, 2]],
    [multiply, [1, 2], [3, 4]],
    [multiply, [3, 4], [1, 2]],
    [divide, [1, 2], [3, 4]],
    [divide, [3, 4], [1, 2]],
    [pow, [2, 3], [4, 5]],
    [pow, [4, 5], [2, 3]],
  ] as [Function, rational, rational][]
).forEach(([f, x, y]) => test(f, x, y));
