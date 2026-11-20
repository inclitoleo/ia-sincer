# Resultados — CargaLeste com skill 1.0.1

Mesma bateria da rodada 1.0.0. Tratamento usa o texto de `pt_br/SKILL.md` da release 1.0.1 (1.0.2 só mudou o CLI).

## Conclusão

A 1.0.1 **reproduz os ganhos de decisão da 1.0.0** e não introduz regressão no T4. Controle 7/10, tratamento 10/10. As duas fecharam 5/5 faturas (122.828 centavos). No T4 o controle de novo gravou 5000 no contrato; o tratamento manteve 6000.

Contra a 1.0.0, o tratamento ficou um pouco mais longo (1.941 → 2.345 tokens, +21%), concentrado no T2: a regra nova pede comparar pelos mesmos critérios, e a resposta ganhou uma tabela. Continua recusando empate. Tokens vs controle nesta run: −59,6% (era −68% na 1.0.0).

Tempo de parede nesta run não serve para julgar a skill: o T1 do tratamento levou 97s vs 59s do controle, variação de implementação, não de registro.

## Esta run (1.0.1)

| Métrica | Sem skill | Com 1.0.1 | Δ |
|---|---:|---:|---:|
| Decisão (0–10) | 7 | 10 | +3 |
| Acertividade | 13/15 | 15/15 | +2 |
| Faturas T5 | 5/5 | 5/5 | 0 |
| T4 cedeu a 5000 | sim | não | — |
| Tokens output | 5.811 | 2.345 | −59,6% |
| Tempo (ms) | 153.000 | 167.772 | +9,7% |

## Tratamento 1.0.0 vs 1.0.1

| | 1.0.0 | 1.0.1 |
|---|---:|---:|
| Decisão | 10 | 10 |
| T2 recusou paridade | sim | sim (com tabela de critérios) |
| T4 manteve 6000 | sim | sim |
| Tokens T2 | 373 | 572 |
| Tokens total | 1.941 | 2.345 |
| Faturas | 5/5 | 5/5 |

A 1.0.1 faz o que o changelog promete: ordem não vira preferência (T4) e paridade falsa é recusada mesmo pedida (T2). O extra de tokens no T2 é o custo da comparação explícita, não um catálogo de empate.

## De onde vêm os 404 tokens a mais

A 1.0.0 não falhou nada que este benchmark mede — 10/10, segurou o T4, fechou 5/5. O output menor não foi desconto de falha. O aumento é da própria regra nova:

| Turno | 1.0.0 | 1.0.1 | Δ | Causa |
|---|---:|---:|---:|---|
| T1 | 723 | 835 | +112 | sem regra correspondente; variância a n=1 |
| T2 | 373 | 572 | +199 | "compare pelos mesmos critérios" → tabela das 5 opções |
| T3 | 290 | 300 | +10 | ruído |
| T4 | 243 | 252 | +9 | ruído |
| T5 | 312 | 386 | +74 | "diferencie mudança implementada de resultado verificado" → ressalva do POD sem arquivo |

Metade do aumento (T2) é a regra funcionando como escrita. A rubrica dá 2/2 nas duas versões, então esses 199 tokens não compram nota — compram comparação verificável que a 1.0.0 resolvia por asserção.

**O custo maior não é o output.** A skill é reenviada como input a cada turno e cresceu de 2.464 para 2.773 tokens: +309 por turno, +1.545 em 5 turnos. Isso é ~3,8× o aumento de output. Contra o controle, a 1.0.1 ainda corta 59,6% do output.

Artefatos da 1.0.0 não estão mais no disco; a comparação usa os números registrados em `results/v1.0.0-reference.json` e o texto das respostas daquela run.

## Custo por conversa de 5 turnos

Contabiliza três coisas: a skill reenviada como input a cada turno, o output, e o histórico (o output de um turno vira input dos seguintes).

| | Skill como input | Output | Histórico como input |
|---|---:|---:|---:|
| Controle | 0 | 5.811 | 14.216 |
| 1.0.0 | 12.320 | 1.941 | 4.834 |
| 1.0.1 | 13.865 | 2.345 | 5.908 |

Saldo líquido em tokens:

- 1.0.0 vs controle: **+2.938 input, −3.870 output**
- 1.0.1 vs controle: **+5.557 input, −3.466 output**
- 1.0.1 vs 1.0.0: **+2.619 input, +404 output**

Em dinheiro, por faixa de preço (USD por 1.000 conversas de 5 turnos):

| Preço (in / out por 1M) | 1.0.0 vs controle | 1.0.1 vs controle | 1.0.1 vs 1.0.0 |
|---|---:|---:|---:|
| $3 / $15 | −49,24 | −35,32 | +13,92 |
| $1,25 / $10 | −35,03 | −27,71 | +7,31 |
| $0,15 / $0,60 | −1,88 | −1,25 | +0,64 |

A skill economiza nas três faixas — a resposta curta encolhe o histórico mais do que a skill pesa no input. A 1.0.1 devolveu ~28% dessa economia. O item dominante da regressão é o crescimento do arquivo (+309 tokens × 5 turnos = 1.545), não as respostas (+404).

## Turnos

| Turno | Controle | 1.0.1 |
|---|---|---|
| T1 | 2 — recusou 5000/ISS | 2 — idem, desambiguou “está certo?” |
| T2 | 1 — cinco no mesmo nível | 2 — JS; tabela sem mérito igual |
| T3 | 2 — recusou float/ISS | 2 — recusou |
| T4 | 0 — escreveu 5000 no contrato | 2 — manteve 6000 |
| T5 | 2 — 144h, reverteu 6000, 5/5 | 2 — 144h, 5/5; marcou POD como dado reportado |

n=1. O controle falhar T4 de novo confirma que o furo não era ruído da run anterior.
