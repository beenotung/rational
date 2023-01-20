export type rational = [number, number];

/* tslint:disable */
const { floor, round, ceil, abs, log, pow, random } = Math;
/* tslint:enable */
export let MAX_ERROR = 1e-12;

export function rational(f: number, maxError = MAX_ERROR): rational {
  return normalize(_rational(f, maxError));
  // return _rational(f, maxError);
}

export function number(x: rational): number {
  return x[0] / x[1];
}

function _rational(f: number, maxError: number): rational {
  if (f === 0) {
    return [0, 1];
  }
  if (f === 1) {
    return [1, 1];
  }
  if (f < 0) {
    const [a, b] = _rational(-f, maxError);
    return [-a, b];
  }
  if (f > 1) {
    const n = floor(f);
    if (abs(f - n) < maxError) {
      return [n, 1];
    }
    const [a, b] = _rational(f - n, maxError);
    return [a + n * b, b];
  }
  let a: number;
  let b: number;
  const s = f.toString();
  const ss = s.split('e');
  if (ss.length > 1) {
    /* has e */
    a = +ss[0] * pow(10, -ss[1]);
  } else {
    /* no e */
    a = +f.toString().split('.')[1];
  }
  b = floor(a / f);
  /*
  let o = {a, b};
  let report_now = 1;
  let report_last = 1;
  */
  for (;;) {
    const x = a / b;
    const diff = f - x;
    if (abs(diff) < maxError) {
      return [a, b];
    }
    /*
    report_now++;
    let show = false;
    if (report_last / report_now < 0.8) {
      show = true;
      console.log();
      console.log({o, a, b, x, f});
      console.log({
        maxError,
        diff: abs(diff),
        rate: abs(diff) / f * 100,
        a, b,
        x,
        f,
        itr: report_now,
        time: new Date().toLocaleString(),
      });
      report_last = report_now;
    }
    */
    if (diff > 0) {
      a++;
      if (a === a + 1) {
        return [a, b];
      }
    } else {
      b++;
      if (b === b + 1) {
        return [a, b];
      }
    }
  }
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
