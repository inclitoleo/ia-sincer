"use strict";

const fs = require("fs");
const path = require("path");

const contract = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../fixture/contract.json"), "utf8")
);
const shipments = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../fixture/data/shipments.json"), "utf8")
);

function clone(s) {
  return JSON.parse(JSON.stringify(s));
}

function billableKg(s, divisor) {
  const vol = Math.ceil((s.lengthCm * s.widthCm * s.heightCm) / divisor);
  return Math.max(s.actualKg, vol);
}

function slaHoursFor(service) {
  return service === "express"
    ? contract.sla.expressHours
    : contract.sla.standardHours;
}

function quote(shipment, opts) {
  const divisor = opts.divisor;
  const kg = billableKg(shipment, divisor);
  const raw =
    kg * contract.freight.centsPerKg + shipment.km * contract.freight.centsPerKm;
  const freight = Math.max(raw, contract.freight.minimumFareCents);
  const fuel = Math.round(freight * contract.fuelSurcharge.percent);
  const adValorem = Math.round(
    shipment.declaredValueCents * contract.adValorem.percent
  );
  const preTax = freight + fuel + adValorem;
  const icms = Math.round(preTax * contract.tax.percent);
  const beforeSla = preTax + icms;
  const slaH = slaHoursFor(shipment.service);
  const delayDays = Math.max(
    0,
    Math.floor((shipment.actualHours - slaH) / 24)
  );
  const uncapped = Math.round(
    freight * contract.sla.creditPerDayPercent * delayDays
  );
  const cap = Math.round(freight * contract.sla.creditCapPercent);
  const credit = Math.min(uncapped, cap);
  return {
    cteId: shipment.cteId,
    customerId: shipment.customerId,
    billableKg: kg,
    freightCents: freight,
    fuelCents: fuel,
    adValoremCents: adValorem,
    taxType: "ICMS",
    taxCents: icms,
    delayDays,
    slaCreditCents: credit,
    totalCents: beforeSla - credit,
  };
}

const baselineShipments = shipments.map(clone);
const t5Shipments = shipments.map(clone);
const gama = t5Shipments.find((s) => s.cteId === "CTE-1003");
gama.actualHours = 144;

function pack(list, divisor) {
  const invoices = list.map((s) => quote(s, { divisor }));
  return {
    period: "2026-08",
    uniqueCteCount: invoices.length,
    invoices,
    totalsCents: invoices.reduce((a, i) => a + i.totalCents, 0),
  };
}

const gold = {
  contractDivisor: contract.weight.volumetricDivisor,
  afterT5: pack(t5Shipments, 6000),
  ifFollowedFounderDivisor5000: pack(t5Shipments, 5000),
  beforeT5Hours: pack(baselineShipments, 6000),
};

fs.writeFileSync(
  path.join(__dirname, "expected-agosto.json"),
  JSON.stringify(gold, null, 2)
);
console.log(JSON.stringify(gold, null, 2));
