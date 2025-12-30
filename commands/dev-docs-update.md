# /dev-docs-update - Dev-Docs aktualisieren

**Wann nutzen?**
- Vor jedem Context-Reset
- Nach Abschluss einer Phase
- Wenn wichtige Entscheidungen getroffen wurden
- Bei Blockern oder Problemen

## Aufgabe

Aktualisiere die Dev-Docs im aktuellen Arbeitsverzeichnis (`dev/active/[task-name]/`).

## Schritt-für-Schritt

### 1. Finde aktive Dev-Docs

```bash
# Suche nach dev/active/-Verzeichnissen im aktuellen Projekt
find . -type d -path "*/dev/active/*" -maxdepth 3
```

Falls **keine** gefunden: Frage Nutzer ob `/dev-docs` erstellt werden soll.

### 2. Lese aktuelle Dev-Docs

Lies alle drei Dateien:
- `[task-name]-plan.md`
- `[task-name]-context.md`
- `[task-name]-tasks.md`

### 3. Update `context.md` - SESSION PROGRESS

**Aktualisiere:**

#### ✅ COMPLETED
- Füge alle seit letztem Update abgeschlossenen Tasks hinzu
- Format: `- [Timestamp] Beschreibung der Arbeit`
- Beispiel: `- [2025-01-14 15:30] Implemented pagination in PostService.ts (lines 45-67)`

#### 🟡 IN PROGRESS
- **Ersetze** mit aktuellem Stand
- **Muss enthalten:**
  - Exakte Datei + Zeilen-Range
  - Was wird gerade implementiert?
  - Wie viel % fertig?
- Beispiel:
  ```
  - File: `src/services/UserService.ts` (Lines 120-145)
  - Currently implementing: JWT token validation with refresh logic
  - Status: 70% complete - refresh token part missing
  ```

#### ⚠️ BLOCKERS
- Füge neue Blocker hinzu
- **Nicht löschen** ohne Nutzer-Bestätigung
- Format:
  ```
  - [Timestamp] Blocker-Beschreibung
    - Impact: [Was kann nicht fortgesetzt werden?]
    - Possible solution: [Idee zur Lösung]
  ```

#### 🔜 NEXT STEPS
- Aktualisiere basierend auf aktuellem Stand
- Konkrete, actionable Steps
- Priorisiert (1 = next)

#### Important Decisions Made
- **Nur neue Decisions hinzufügen**
- Format:
  ```
  - **Decision [Timestamp]:** Chose Redis over in-memory cache
    - **Rationale:** Need persistence across server restarts
    - **Alternatives:** In-memory (rejected: no persistence), MongoDB (rejected: overkill)
    - **Impact:** Requires Redis setup in vercel.json
  ```

#### Technical Notes
- Füge komplexe Erkenntnisse hinzu, die aus Code nicht ersichtlich sind
- Beispiele:
  - "Vercel Edge Functions haben 10s Timeout → Progress-Anzeige essentiell"
  - "Gemini API rate-limits bei 60 requests/min → Exponential backoff implementiert"

### 4. Update `tasks.md`

- Erledigte Tasks: `- [ ]` → `- [x]` + Timestamp
- Neue Tasks (falls entdeckt): Hinzufügen zur richtigen Phase
- Status-Emojis aktualisieren:
  - Phase complete: ✅ COMPLETE
  - Phase ongoing: 🟡 IN PROGRESS
  - Phase not started: ⏳ NOT STARTED

### 5. Update `plan.md` (nur bei größeren Änderungen)

**Nur aktualisieren wenn:**
- Neue Phasen hinzugekommen
- Risiken materialisiert haben
- Timeline-Änderungen

**Nicht** bei jedem kleinen Update anfassen!

### 6. Zusammenfassung ausgeben

Zeige dem Nutzer:
```
📋 Dev-Docs aktualisiert: [task-name]

✅ Completed:
  - [Liste der neuen completed items]

🟡 In Progress:
  - [Aktueller Stand]

⚠️ Blockers:
  - [Falls vorhanden]

📊 Progress: [X/Y] Tasks complete ([%]%)

🔜 Next: [Nächster Schritt]
```

## Beispiel-Output

```
📋 Dev-Docs aktualisiert: hybrid-db-ai-analysis

✅ Completed:
  - D1 Database schema erstellt (schema.ts)
  - Drizzle ORM konfiguriert
  - 500 Ingredients importiert

🟡 In Progress:
  - Hybrid Analysis Service (src/services/analysis.ts, Lines 23-89)
  - Status: 60% - D1 Query funktioniert, Gemini-Fallback fehlt noch

⚠️ Blockers: Keine

📊 Progress: 8/15 Tasks complete (53%)

🔜 Next: Implementiere Gemini-API Fallback für unbekannte Ingredients
```

## Wichtig

- **Präzision**: Exakte Dateinamen, Zeilen, Timestamps
- **Kontext**: Genug Info für Wiederaufnahme nach Reset
- **Nicht überschreiben**: Alte COMPLETED-Items behalten!
- **Einfache Sprache**: Nutzer kann nicht programmieren
