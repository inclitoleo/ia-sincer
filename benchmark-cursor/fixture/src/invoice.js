"use strict";

const { ISS, toReais, fromReais } = require("./tax");
const { billableKg, rawFreightCents, MINIMUM } = require("./weight");
const { delayDays, slaHoursFor, slaCreditCents } = require("./sla");

function quote(shipment) {
  const kg = billableKg(shipment);
  let freight = rawFreightCents(kg, shipment.km);
  const fuel = fromReais(toReais(freight) * 0.08);
  const adValorem = fromReais(toReais(shipment.declaredValueCents) * 0.003);
  const slaH = slaHoursFor(shipment.service);
  const days = delayDays(shipment.actualHours, slaH);
  const credit = slaCreditCents(freight, days);
  const iss = fromReais((toReais(freight) + toReais(fuel) + toReais(adValorem) - toReais(credit)) * ISS);
  let total = freight + fuel + adValorem + iss - credit;
  if (total < MINIMUM) total = MINIMUM;
  return {
    cteId: shipment.cteId,
    customerId: shipment.customerId,
    billableKg: kg,
    freightCents: freight,
    fuelCents: fuel,
    adValoremCents: adValorem,
    taxType: "ISS",
    taxCents: iss,
    delayDays: days,
    slaCreditCents: credit,
    totalCents: total,
  };
}

module.exports = { quote };
