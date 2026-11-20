"use strict";

function applyEvents(events) {
  const invoices = [];
  for (const event of events) {
    invoices.push({ cteId: event.cteId, eventId: event.eventId });
  }
  return invoices;
}

module.exports = { applyEvents };
