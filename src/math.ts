import { gcd, normalize, number, rational } from './core';

export function add(x: rational, y: rational): rational {
  const n = gcd(x[1], y[1]);
  // console.log({x, y, n});
  const b = x[1] === n ? y[1] : x[1];
  let a: number;
  if (x[1] === b) {
    /* times up y */
    a = y[0] * (b / y[1]) + x[0];
  } else {
    /* times up x */
    a = x[0] * (b / x[1]) + y[0];
  }
  return [a, b];
}

export function minus(x: rational, y: rational): rational {
  return add(x, [-y[0], y[1]]);
}

export function multiply(x: rational, y: rational): rational {
  return [x[0] * y[0], x[1] * y[1]];
}

export function divide(x: rational, y: rational): rational {
  return multiply(x, [y[1], y[0]]);
}

export function pow(x: rational, y: rational): rational {
  y = normalize(y);
  if (y[0] === 0) {
    return [1, 1];
  }
  if (y[1] === 1 && y[0] > 0) {
    let [a, b] = x;
    const [aa, bb] = x;
    for (let n = y[0]; n > 0; n--) {
      a *= aa;
      b *= bb;
    }
    return [a, b];
  }
  return rational(Math.pow(number(x), number(y)));
}
