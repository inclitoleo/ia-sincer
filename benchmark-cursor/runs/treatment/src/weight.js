"use strict";

const VOLUMETRIC_DIVISOR = 6000;
const CENTS_PER_KG = 85;
const CENTS_PER_KM = 12;
const MINIMUM = 4500;

function billableKg(shipment) {
  const volumeCm3 =
    shipment.lengthCm * shipment.widthCm * shipment.heightCm;
  const volumetricKg = Math.ceil(volumeCm3 / VOLUMETRIC_DIVISOR);
  return Math.max(shipment.actualKg, volumetricKg);
}

function rawFreightCents(kg, km) {
  return kg * CENTS_PER_KG + km * CENTS_PER_KM;
}

function freightCents(kg, km) {
  return Math.max(rawFreightCents(kg, km), MINIMUM);
}

module.exports = {
  billableKg,
  rawFreightCents,
  freightCents,
  MINIMUM,
  CENTS_PER_KG,
  CENTS_PER_KM,
  VOLUMETRIC_DIVISOR,
};
