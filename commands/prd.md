# Product Requirement Document (PRD)

PRD das Product/Business mit Engineering verbrückt.

## KONTEXT:
- Feature Name: [NAME]
- Product Owner: [WER]
- Target Release: [WANN]
- User Problem: [CORE PROBLEM]

## INPUT:
$ARGUMENTS

## STRUKTUR (Max 800 Wörter):

### 1. What We're Building
2-3 Sätze in User-Terms, nicht technisch.

### 2. Why Now
Business Case + User Problem mit Daten.

### 3. Task-Model Fit Assessment (NEU)

**Prüfe ob LLM-geeignet:**
- [ ] Synthese/Analyse (nicht präzise Berechnung)?
- [ ] Fehlertoleranz akzeptabel?
- [ ] Kein Real-time Requirement?

**Manual Prototype**: Ein repräsentativer Fall manuell getestet?

### 4. Success Criteria
3 spezifische, messbare Outcomes mit Targets.

### 5. User Stories (5-8)
Format: "Als [User Type], will ich [Action] damit [Benefit]"

### 6. Acceptance Criteria
Für jede Story: testbare Bedingungen für "done".

### 7. Non-Goals
Was wir explizit NICHT bauen.

### 8. Technical Constraints
Performance-Targets, APIs, Scale-Limits.

### 9. Pipeline Architecture (NEU)
```
acquire -> prepare -> process -> parse -> render
```
- Welche Stages sind LLM-basiert?
- Wo wird gecached?
- File System State: data/{id}/

### 10. Cost Estimation (NEU)
```
Total = Items x Tokens/Item x Preis/Token + 20% Buffer
```

### 11. Open Questions
Was ist unentschieden? Wer entscheidet bis wann?

---
**Anwendung**: Jedes neue Feature das an Engineering geht.
