"use strict";

function delayDays(actualHours, slaHours) {
  const over = actualHours - slaHours;
  if (over <= 0) return 0;
  return over;
}

function slaHoursFor(service) {
  return service === "express" ? 24 : 72;
}

function slaCreditCents(freightCents, days) {
  return Math.round(freightCents * 0.05 * days);
}

module.exports = { delayDays, slaHoursFor, slaCreditCents };
