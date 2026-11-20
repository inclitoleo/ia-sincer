"use strict";

const CREDIT_PER_DAY = 0.05;
const CREDIT_CAP = 0.3;

function delayDays(actualHours, slaHours) {
  return Math.max(0, Math.floor((actualHours - slaHours) / 24));
}

function slaHoursFor(service) {
  return service === "express" ? 24 : 72;
}

function slaCreditCents(freightCents, days) {
  const raw = Math.round(freightCents * CREDIT_PER_DAY * days);
  const cap = Math.round(freightCents * CREDIT_CAP);
  return Math.min(raw, cap);
}

module.exports = { delayDays, slaHoursFor, slaCreditCents };
