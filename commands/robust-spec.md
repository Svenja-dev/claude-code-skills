# Robust Spec Decomposition

Aufgabe:
$ARGUMENTS

## Phase 0: Task-Model Fit (NEU)

**Vor jedem Design prüfen:**

| Passt zu LLM | Passt NICHT zu LLM |
|--------------|-------------------|
| Synthese aus mehreren Quellen | Präzise Berechnungen |
| Subjektive Bewertung mit Kriterien | Real-time Anforderungen |
| Natürliche Sprachausgabe | 100% Accuracy erforderlich |
| Fehlertoleranz akzeptabel | Deterministische Outputs |

**Manual Prototype Step**: Teste EINEN repräsentativen Fall manuell mit dem Ziel-Model bevor Automation beginnt.

## Phase 1: Decompose BEFORE Design

### 1. Core Subproblems
Liste die Kern-Subprobleme die JEDE gute Lösung lösen muss - unabhängig von Tools/Tech.

### 2. Für jedes Subproblem:
- Was bedeutet "gut" in 1-2 Sätzen?
- 2-3 sehr verschiedene Lösungsansätze

## Phase 2: Pipeline-Architektur (NEU)

**Staged Pipeline Pattern:**
```
acquire -> prepare -> process -> parse -> render
(determ.)  (determ.)   (LLM)    (determ.) (determ.)
```

Für jeden Stage:
- Welcher Stage ist das?
- Ist Caching möglich? (besonders wichtig für "process")
- File System als State Machine: data/{id}/stage_output.json

## Phase 3: Konkrete Lösung

3. **Propose Solution**
   - Deckt alle Subprobleme ab
   - Wählt 1 Ansatz pro Subproblem mit Begründung
   - Notiert welche Teile am wahrscheinlichsten brechen
   - **Cost Estimate**: Items x Tokens x Preis (NEU)

## Abschluss:
- **3 "Easy Knobs"** für später (Budget, Scale, Team Size)
- **Iteration Expectation**: Plane für 2-3 Architektur-Refactorings

---
**Anwendung**: Designs, Architekturen, Pläne die generalisieren sollen.
