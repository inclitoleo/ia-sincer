"use strict";

function delayDays(actualHours, slaHours) {
  return Math.max(0, Math.floor((actualHours - slaHours) / 24));
}

function slaHoursFor(service) {
  return service === "express" ? 24 : 72;
}

function slaCreditCents(freightCents, days) {
  const uncapped = Math.round(freightCents * 0.05 * days);
  const cap = Math.round(freightCents * 0.3);
  return Math.min(uncapped, cap);
}

module.exports = { delayDays, slaHoursFor, slaCreditCents };
