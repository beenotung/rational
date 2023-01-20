# rational.js

rational number library

[![npm Package Version](https://img.shields.io/npm/v/rational.js)](https://www.npmjs.com/package/rational.js)
[![Minified Package Size](https://img.shields.io/bundlephobia/min/rational.js)](https://bundlephobia.com/package/rational.js)
[![Minified and Gzipped Package Size](https://img.shields.io/bundlephobia/minzip/rational.js)](https://bundlephobia.com/package/rational.js)

## Functions

- rational :: f -> a/b where f is floating number, a,b are integers
- number :: rational -> number
- add
- minus
- multiply
- divide
- pow

## Typescript Signatures

Core functions:

```typescript
type rational = [number, number]

let MAX_ERROR: number // 1e-12

// convert floating point number into rational
function rational(f: number, maxError?: number): rational

// convert rational into floating point number
function number(x: rational): number

function normalize(x: rational): rational

// find the greatest common divisor
function gcd(a: number, b: number): number
```

Math functions:

```typescript
function add(x: rational, y: rational): rational

function minus(x: rational, y: rational): rational

function multiply(x: rational, y: rational): rational

function divide(x: rational, y: rational): rational

function pow(x: rational, y: rational): rational
```

Format function:

```typescript
// convert rational into string in "a/b" format
function toString(rational: rational): string
```
