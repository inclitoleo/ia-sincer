"use strict";

function applyEvents(events) {
  const seen = new Set();
  const invoices = [];
  for (const event of events) {
    if (seen.has(event.cteId)) continue;
    seen.add(event.cteId);
    invoices.push({ cteId: event.cteId, eventId: event.eventId });
  }
  return invoices;
}

module.exports = { applyEvents };
