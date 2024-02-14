export type rational = [number, number];

const { floor, abs } = Math;
const { isInteger, isFinite, isNaN } = Number;
export let MAX_ERROR = 1e-12;

export function rational(f: number, maxError?: number): rational {
  switch (f) {
    case 0:
      return [0, 1];
    case 1:
      return [1, 1];
    default:
      if (isInteger(f)) return [f, 1];
      if (isNaN(f)) throw new Error(`not a number (NaN)`);
      if (!isFinite(f)) return f > 0 ? [1, 0] : [-1, 0];
      if (f > 0) return _rational(f, maxError);
      let rational = _rational(-f, maxError);
      rational[0] = -rational[0];
      return rational;
  }
}

export function number(x: rational): number {
  return x[0] / x[1];
}

function _rational(f: number, maxError?: number): rational {
  return maxError
    ? _rational_with_error(f, maxError)
    : _rational_without_error(f);
}

export let irrational_threshold = 10_000_000;

/**
 * @param f must be positive
 * */
function _rational_for_irrational(f: number): rational {
  /** f must be less than 1 */
  let a = f;
  let b = 1;
  while (!isInteger(a)) {
    a *= 2;
    b *= 2;
  }
  let n = gcd(a, b);
  return [a / n, b / n];
}

/**
 *  @param f must be positive
 * */
function _rational_with_error(f: number, maxError: number): rational {
  let a = 1;
  let b = 1;
  let x: number;
  let n = irrational_threshold;
  for (; n > 0; n--) {
    x = a / b;
    let diff = f - x;
    if (abs(diff) < maxError) {
      return [a, b];
    }
    if (diff > 0) {
      a++;
      if (a === a + 1) return [a, b];
    } else if (diff < 0) {
      b++;
      if (b === b + 1) return [a, b];
    } else {
      throw new Error(`invalid floating number: ${f}`);
    }
  }
  return _rational_for_irrational(f);
}

/**
 *  @param f must be positive
 * */
function _rational_without_error(f: number): rational {
  let a = 1;
  let b = 1;
  let x: number;
  let n = irrational_threshold;
  for (; n > 0; n--) {
    x = a / b;
    if (x == f) {
      return [a, b];
    } else if (x < f) {
      a++;
      if (a === a + 1) return [a, b];
    } else if (x > f) {
      b++;
      if (b === b + 1) return [a, b];
    } else {
      throw new Error(`invalid floating number: ${f}`);
    }
  }
  return _rational_for_irrational(f);
}

export function normalize(x: rational): rational {
  const [a, b] = x;
  if (b === 0) {
    return x;
  }
  const n = gcd(a, b);
  return [floor(a / n), floor(b / n)];
}

export function gcd(a: number, b: number): number {
  return a < b ? _gcd(a, b) : _gcd(b, a);
}

function _gcd(a: number, b: number): number {
  for (; b; ) {
    [a, b] = [b, a % b];
  }
  return a;
}
