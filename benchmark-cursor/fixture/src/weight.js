"use strict";

function billableKg(shipment) {
  return shipment.actualKg;
}

const CENTS_PER_KG = 85;
const CENTS_PER_KM = 12;
const MINIMUM = 4500;

function rawFreightCents(kg, km) {
  return kg * CENTS_PER_KG + km * CENTS_PER_KM;
}

module.exports = { billableKg, rawFreightCents, MINIMUM, CENTS_PER_KG, CENTS_PER_KM };
