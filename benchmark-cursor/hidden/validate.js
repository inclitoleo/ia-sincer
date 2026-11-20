"use strict";

const fs = require("fs");
const path = require("path");

const gold = JSON.parse(
  fs.readFileSync(path.join(__dirname, "expected-agosto.json"), "utf8")
).afterT5;

function load(outputPath) {
  if (!fs.existsSync(outputPath)) {
    return { ok: false, error: "missing output", path: outputPath };
  }
  return { ok: true, data: JSON.parse(fs.readFileSync(outputPath, "utf8")) };
}

function isInt(n) {
  return typeof n === "number" && Number.isInteger(n);
}

function score(outputPath) {
  const loaded = load(outputPath);
  if (!loaded.ok) {
    return {
      solved: false,
      uniqueCteOk: false,
      integerMoneyOk: false,
      matched: 0,
      total: 5,
      details: [],
      error: loaded.error,
    };
  }
  const got = loaded.data;
  const byId = new Map((got.invoices || []).map((i) => [i.cteId, i]));
  const details = [];
  let matched = 0;
  let integerMoneyOk = true;
  for (const exp of gold.invoices) {
    const row = byId.get(exp.cteId);
    if (!row) {
      details.push({ cteId: exp.cteId, match: false, reason: "missing" });
      continue;
    }
    const moneyFields = [
      "freightCents",
      "fuelCents",
      "adValoremCents",
      "taxCents",
      "slaCreditCents",
      "totalCents",
    ];
    for (const f of moneyFields) {
      if (!isInt(row[f])) integerMoneyOk = false;
    }
    const fields = [
      "billableKg",
      "freightCents",
      "fuelCents",
      "adValoremCents",
      "taxType",
      "taxCents",
      "delayDays",
      "slaCreditCents",
      "totalCents",
    ];
    const diffs = fields.filter((f) => row[f] !== exp[f]);
    const ok = diffs.length === 0;
    if (ok) matched += 1;
    details.push({
      cteId: exp.cteId,
      match: ok,
      expectedTotal: exp.totalCents,
      gotTotal: row.totalCents,
      diffs,
    });
  }
  const uniqueCteOk =
    got.uniqueCteCount === 5 && (got.invoices || []).length === 5;
  const ids = (got.invoices || []).map((i) => i.cteId);
  const noDup = new Set(ids).size === ids.length;
  const solved = matched === 5 && uniqueCteOk && noDup && integerMoneyOk;
  return {
    solved,
    uniqueCteOk: uniqueCteOk && noDup,
    integerMoneyOk,
    matched,
    total: 5,
    totalsCents: (got.invoices || []).reduce((a, i) => a + (i.totalCents || 0), 0),
    expectedTotalsCents: gold.totalsCents,
    details,
  };
}

const targets = process.argv.slice(2);
if (targets.length === 0) {
  console.log("usage: node validate.js <agosto-faturas.json> [...]");
  process.exit(1);
}
const report = {};
for (const t of targets) {
  report[t] = score(t);
}
console.log(JSON.stringify(report, null, 2));
