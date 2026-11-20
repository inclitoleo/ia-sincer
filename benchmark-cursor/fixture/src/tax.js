"use strict";

const ISS = 0.02;

function toReais(cents) {
  return cents / 100;
}

function fromReais(reais) {
  return reais * 100;
}

module.exports = { ISS, toReais, fromReais };
