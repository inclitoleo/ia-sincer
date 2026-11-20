"use strict";

const fs = require("fs");
const path = require("path");
const { quote } = require("./invoice");
const { applyEvents } = require("./cte");

const root = path.join(__dirname, "..");
const shipments = JSON.parse(
  fs.readFileSync(path.join(root, "data/shipments.json"), "utf8")
);
const events = JSON.parse(
  fs.readFileSync(path.join(root, "data/cte-events.json"), "utf8")
);

const issued = applyEvents(events);
const invoices = issued.map((row) => {
  const shipment = shipments.find((s) => s.cteId === row.cteId);
  return quote(shipment);
});

const outDir = path.join(root, "output");
fs.mkdirSync(outDir, { recursive: true });
const payload = {
  period: "2026-08",
  uniqueCteCount: new Set(invoices.map((inv) => inv.cteId)).size,
  invoices,
};
fs.writeFileSync(
  path.join(outDir, "agosto-faturas.json"),
  JSON.stringify(payload, null, 2)
);
console.log(JSON.stringify(payload, null, 2));
