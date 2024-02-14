#!/usr/bin/env node

import { rational } from './core';
import { toString } from './format';

if (process.argv.length != 3) {
  console.error('Error: expect a number in the argument');
  process.exit(1);
}

let input = process.argv[2];
let number = +input;

if (Number.isNaN(number)) {
  console.error('Error: input is not a number: ' + JSON.stringify(input));
  process.exit(1);
}

let text = toString(rational(number));

console.log(text);
