# Impact Analysis vor Code-Änderungen

Bevor du Code änderst, führe diese Analyse durch:

## 1. Betroffene Dateien identifizieren
- Welche Dateien werden direkt geändert?
- Welche Dateien importieren/nutzen diese Dateien?
- Welche Tests müssen angepasst werden?

## 2. Risiko-Bewertung
- **LOW**: Nur eine Datei, keine externen Abhängigkeiten
- **MEDIUM**: 2-5 Dateien, interne Abhängigkeiten
- **HIGH**: >5 Dateien, externe APIs, Datenbank-Schema

## 3. No-Touch Zones prüfen
Werden folgende kritische Dateien berührt?
- [ ] api/auth.ts - Authentifizierung
- [ ] api/analyze.ts - Kern-Analyse
- [ ] vercel.json - DSGVO Region
- [ ] src/utils/fileParser.ts - Sampling

**Wenn JA**: Explizite Bestätigung erforderlich!

## 4. Error Propagation Assessment (NEU)

**Downstream-Analyse:**
- Welche Komponenten konsumieren Output dieser Änderung?
- Können Fehler in dieser Änderung zu Downstream-Fehlern führen?
- Gibt es Validierung zwischen Stages?

**Mitigation:**
- [ ] Output-Validierung vor Weitergabe an nächste Stage
- [ ] Retry-Logic mit Circuit Breaker
- [ ] Idempotente Operationen wo möglich

## 5. Pipeline Stage Assessment (NEU)

Welcher Pipeline-Stage ist diese Änderung?
```
acquire -> prepare -> process -> parse -> render
```

- **acquire/prepare/parse/render**: Deterministisch, leicht testbar
- **process (LLM)**: Teuer, cachen, Ergebnis-Dateien persistent halten

## 6. Rollback-Plan
- Wie kann die Änderung rückgängig gemacht werden?
- git checkout -- <file> oder git reset HEAD~1?
- **TTL**: Max 3 Iterationen, dann eskalieren

## Änderung analysieren:
$ARGUMENTS
