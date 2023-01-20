# rational.js

rational number library

[![npm Package Version](https://img.shields.io/npm/v/rational.js)](https://www.npmjs.com/package/rational.js)
[![Minified Package Size](https://img.shields.io/bundlephobia/min/rational.js)](https://bundlephobia.com/package/rational.js)
[![Minified and Gzipped Package Size](https://img.shields.io/bundlephobia/minzip/rational.js)](https://bundlephobia.com/package/rational.js)

## Installation

```bash
## for cli
npm install --global rational.js

## for library usage
npm install rational.js
```

## Functions

- rational :: f -> a/b where f is floating number, a,b are integers
- number :: rational -> number
- add
- minus
- multiply
- divide
- pow

## Command Line Usage

```bash
> rational 3.14
157/50
```

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

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
