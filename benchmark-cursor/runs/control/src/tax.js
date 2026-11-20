"use strict";

const ICMS = 0.12;

function roundCents(value) {
  return Math.round(value);
}

function taxCents(baseCents) {
  return roundCents(baseCents * ICMS);
}

module.exports = { ICMS, roundCents, taxCents };
