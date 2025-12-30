# /dev-docs - Strategische Planung für Entwicklungs-Tasks

Du bist ein strategischer Entwicklungsplaner. Wenn der Nutzer `/dev-docs [Beschreibung]` ausführt, erstelle eine vollständige Projekt-Dokumentation nach folgendem Schema:

## Schritt 1: Anforderungen verstehen

Analysiere die Beschreibung und stelle Rückfragen falls nötig:
- Was ist das konkrete Ziel?
- Welches Projekt ist betroffen? (digitalTwin, DresdenAIInsights, ManufacturingInsideAnalyzer, nanoMESAI, nanoMESAI-suite)
- Gibt es technische Constraints?
- Zeitrahmen?

## Schritt 2: Codebase-Analyse

Untersuche relevante Dateien im Projekt:
- Lies `README.md`, `AGENTS.md`, `ARCHITECTURE.md` falls vorhanden
- Identifiziere betroffene Komponenten/Module
- Prüfe aktuelle Implementierungen
- Finde ähnliche Patterns im Code

## Schritt 3: Drei Dateien erstellen

Erstelle in `dev/active/[task-name]/`:

### A) `[task-name]-plan.md`

```markdown
# [Feature Name] - Implementierungs-Plan

## Executive Summary
[Was wird gebaut, warum, erwarteter Impact]

## Aktueller Stand
[Wie sieht das System jetzt aus?]

## Implementierungs-Phasen

### Phase 1: [Name] (Geschätzte Zeit: X Stunden)
- Task 1.1: [Konkrete Aktion]
  - **Acceptance:** [Wann ist es fertig?]
  - **Files:** [Welche Dateien?]
- Task 1.2: [...]

### Phase 2: [Name]
[...]

## Risiko-Assessment
- **Technisch:** [Potenzielle Probleme]
- **DSGVO:** [Falls relevant]
- **Performance:** [Bottlenecks?]

## Erfolgs-Metriken
- [ ] Funktioniert Feature X?
- [ ] Tests passing (>80% coverage)
- [ ] Build erfolgreich
- [ ] Deployment auf [Environment]

## Timeline
- Phase 1: [Zeitschätzung]
- Phase 2: [...]
- Total: [Gesamt]
```

### B) `[task-name]-context.md`

```markdown
# [Feature Name] - Kontext & Fortschritt

## SESSION PROGRESS (YYYY-MM-DD HH:MM)

### ✅ COMPLETED
- [Liste aller abgeschlossenen Arbeiten]
- Beispiel: Created UserService.ts with authentication logic

### 🟡 IN PROGRESS
- [Aktuelle Arbeit mit exakten Dateireferenzen]
- File: `src/services/PostService.ts` (Lines 45-67)
- Currently implementing: Pagination logic with cursor-based approach

### ⚠️ BLOCKERS
- [Was verhindert aktuell Fortschritt?]
- Beispiel: Waiting for API key approval

### 🔜 NEXT STEPS
1. [Konkreter nächster Schritt]
2. [...]

## Key Files
- `path/to/file.ts` - [Beschreibung der Rolle]
- `path/to/another.tsx` - [...]

## Important Decisions Made
- **Decision:** [Was wurde entschieden?]
  - **Rationale:** [Warum?]
  - **Alternatives considered:** [Was wurde verworfen?]

## Technical Notes
[Komplexe Zusammenhänge, die aus Code nicht ersichtlich sind]

## Quick Resume Instructions
Wenn nach Context-Reset weitergearbeitet wird:
1. Lies SESSION PROGRESS oben
2. Checke tasks.md für offene TODOs
3. Fahre fort mit: [Spezifischer nächster Schritt]
```

### C) `[task-name]-tasks.md`

```markdown
# [Feature Name] - Task Checklist

## Phase 1: [Name] ✅ COMPLETE / 🟡 IN PROGRESS / ⏳ NOT STARTED

- [x] Task 1.1: [Beschreibung]
  - Acceptance: [Kriterium]
  - Completed: 2025-01-14 15:30
- [ ] Task 1.2: [Beschreibung] **(IN PROGRESS)**
  - Acceptance: [Kriterium]
  - Current status: Lines 45-67 in PostService.ts
- [ ] Task 1.3: [...]

## Phase 2: [Name] ⏳ NOT STARTED

- [ ] Task 2.1: [...]
- [ ] Task 2.2: [...]

## Acceptance Checklist (Final)

- [ ] All unit tests passing (run: `npm test`)
- [ ] TypeScript build successful (run: `npx tsc --noEmit`)
- [ ] Manual testing completed
- [ ] DSGVO compliance verified (if applicable)
- [ ] Documentation updated
- [ ] Code reviewed
- [ ] Deployed to [Environment]
```

## Schritt 4: Präsentation

Zeige dem Nutzer:
1. Zusammenfassung des Plans
2. Geschätzte Gesamtdauer
3. Größte Risiken
4. Frage: "Soll ich mit Phase 1 beginnen?"

## Wichtige Hinweise

- **Nutze projektspezifisches Wissen**: Lies vorhandene AGENTS.md, CLAUDE.md
- **Konkret, nicht generisch**: Spezifische Dateinamen, Funktionen, APIs
- **Einfache Sprache**: Nutzer kann nicht programmieren!
- **Inkrementell**: Kleine, testbare Schritte
- **Context-Resistent**: Alle drei Dateien müssen standalone funktionieren

## Beispiel-Invocation

```
/dev-docs Hybrid DB+AI Analysis System für soundandserene - Kombiniere D1 Database mit Gemini AI für intelligente Ingredient-Analyse
```

Erstellt:
- `dev/active/hybrid-db-ai-analysis/hybrid-db-ai-analysis-plan.md`
- `dev/active/hybrid-db-ai-analysis/hybrid-db-ai-analysis-context.md`
- `dev/active/hybrid-db-ai-analysis/hybrid-db-ai-analysis-tasks.md`
