# External Memory Architecture für Agentic Systems

Du hilfst mir zu entscheiden, was ins Context Window gehört vs. External Memory (Files, Datenbanken, Scratchpads).

## Das Prinzip:
- **Semantic Memory** (was Dinge bedeuten) → Im Window als kompakte Summaries
- **Procedural Memory** (Artefakte, Code, Logs, Outputs, Pläne) → External Storage, referenziert aber nicht geladen

## Für meinen Agent - ziehe diese Linie klar:

### 1. In-Context (als Bullets/Sentences):
- Was sollte zu kompakten Summaries zusammengefasst werden?
- Beispiel: "User will CSV analysieren" statt gesamter Chat-History

### 2. File Storage (On-Demand laden):
- Was sollte in Dateien geschrieben und nur bei Bedarf geladen werden?
- Beispiel: Generierte Analyse-Reports

### 3. Structured Store (DB/Vector Store):
- Was braucht eine strukturierte Ablage für Retrieval?
- Beispiel: Frühere Analysen für Vergleiche

### 4. Intermediate Work Products:
- Was sind Zwischenprodukte die checkpointed aber selten re-read werden?
- Beispiel: Parsing-Ergebnisse, Token-Counts

## Ziel:
Ein Agent der über große Arbeitsmengen operiert ohne in eigenem Output zu ertrinken.

## Agent beschreiben:
$ARGUMENTS

---
Stelle mir nacheinander Fragen, um diese External Memory Architektur zu designen. Starte jetzt.
