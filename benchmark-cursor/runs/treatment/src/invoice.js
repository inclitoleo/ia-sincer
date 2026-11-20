"use strict";

const { taxCents } = require("./tax");
const { billableKg, freightCents } = require("./weight");
const { delayDays, slaHoursFor, slaCreditCents } = require("./sla");

const FUEL_PERCENT = 0.08;
const AD_VALOREM_PERCENT = 0.003;

function quote(shipment) {
  const kg = billableKg(shipment);
  const freight = freightCents(kg, shipment.km);
  const fuel = Math.round(freight * FUEL_PERCENT);
  const adValorem = shipment.declaredValueCents
    ? Math.round(shipment.declaredValueCents * AD_VALOREM_PERCENT)
    : 0;
  const tax = taxCents(freight, fuel, adValorem);
  const slaH = slaHoursFor(shipment.service);
  const days = delayDays(shipment.actualHours, slaH);
  const credit = slaCreditCents(freight, days);
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
