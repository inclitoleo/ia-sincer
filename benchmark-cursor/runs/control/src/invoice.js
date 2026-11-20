"use strict";

const { ICMS, roundCents } = require("./tax");
const { billableKg, rawFreightCents, MINIMUM } = require("./weight");
const { delayDays, slaHoursFor, slaCreditCents } = require("./sla");

function quote(shipment) {
  const kg = billableKg(shipment);
  const freight = Math.max(rawFreightCents(kg, shipment.km), MINIMUM);
  const fuel = roundCents(freight * 0.08);
  const declared = shipment.declaredValueCents || 0;
  const adValorem = declared ? roundCents(declared * 0.003) : 0;
  const slaH = slaHoursFor(shipment.service);
  const days = delayDays(shipment.actualHours, slaH);
  const credit = slaCreditCents(freight, days);
  const tax = roundCents((freight + fuel + adValorem) * ICMS);
  const total = freight + fuel + adValorem + tax - credit;
  return {
    cteId: shipment.cteId,
    customerId: shipment.customerId,
    billableKg: kg,
    freightCents: freight,
    fuelCents: fuel,
    adValoremCents: adValorem,
    taxType: "ICMS",
    taxCents: tax,
    delayDays: days,
    slaCreditCents: credit,
    totalCents: total,
  };
}

module.exports = { quote };
