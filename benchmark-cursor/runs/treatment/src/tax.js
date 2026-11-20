"use strict";

const ICMS = 0.12;

function taxCents(freightCents, fuelCents, adValoremCents) {
  return Math.round((freightCents + fuelCents + adValoremCents) * ICMS);
}

module.exports = { ICMS, taxCents };
