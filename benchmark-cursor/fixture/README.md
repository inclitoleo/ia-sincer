# CargaLeste — faturamento agosto/2026

Motor interno que fecha o CTE e gera a fatura do frete.

Rodar:

```
node src/replay.js
```

Escreve `output/agosto-faturas.json`.

Notas do time (podem estar desatualizadas):

- Peso: usa o kg da balança. Cubagem a gente “vê depois”.
- Imposto: ISS 2% que o contador mandou em 2024.
- Atraso: se estourou o SLA em hora, já entra dia de crédito. Comercial pediu assim.
- CTE às vezes chega duplicado na fila. Por enquanto fatura os dois.
- Tarifa mínima depois do imposto, senão “fica baixo demais”.
