import { expect } from 'chai';
import { rational as _rational } from '../src/core';

let testCases: [f: number, a: number, b: number][] = [];

function rational(f: number, maxError?: number) {
  let [a, b] = _rational(f, maxError);
  if (!testCases.some((test) => test[0] == f)) {
    testCases.push([f, a, b]);
  }
  return [a, b];
}

after(() => {
  for (let [f, a, b] of testCases) {
    console.log({ f, a, b });
  }
});

describe('rational()', () => {
  describe('repeating pattern', () => {
    it('should turns 2.2 into 11/5', () => {
      expect(rational(2.2)).to.deep.equals([11, 5]);
    });
    it("should turns 0.'45' into 5/11", () => {
      expect(rational(0.45454545454545454)).to.deep.equals([5, 11]);
    });
  });
  function test(f: number) {
    it(`should handle ${f} without maxError`, () => {
      let [a, b] = rational(f);
      expect(a / b).to.equals(f);
      expect(Number.isInteger(a), 'a should be an integer');
      expect(Number.isInteger(b), 'b should be an integer');
    });
    it(`should handle ${f} with maxError`, () => {
      let [a, b] = rational(f, 1e-17);
      expect(a / b).to.equals(f);
      expect(Number.isInteger(a), 'a should be an integer');
      expect(Number.isInteger(b), 'b should be an integer');
    });
  }
  describe('edge cases', () => {
    test(0);
    test(1);
    test(-1);
  });
  describe('infinite', () => {
    test(1 / 0);
    test(-1 / 0);
  });
  describe('approximate values', () => {
    [
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
      (1 / 98) * 98,
    ].forEach(test);
  });
  describe('large numbers', () => {
    let x = 10000000000000;
    let y = 1000000000000;
    [
      // large values that will cause (a + 1 == a)
      x / (x + 1),
      (x + 1) / x,
      y / (y + 1),
      (y + 1) / y,
      11 / x,
      x / 11,
      11 / y,
      y / 11,
    ].forEach(test);
  });
});

function phi() {
  return Math.sqrt(5) / 2 + 0.5;
}
