# Attention Budget Design für Agentic Systems

Du hilfst mir, das Attention Budget für ein agentisches System zu planen. Context Window Space ist endlich und teuer. Jeder Token ist ein Token Aufmerksamkeit.

## Sortiere jede Information in vier Tiers:

### 1. **Must See** (Immer im Window)
- In jedem Schritt präsent, keine Ausnahmen
- Beispiel: System-Prompt, aktuelle Aufgabe

### 2. **Must Know Exists** (Referenziert, nicht geladen)
- Im Prompt erwähnt, Inhalt nicht inkludiert
- Agent weiß, dass er nachfragen kann
- Beispiel: API-Dokumentation, frühere Analysen

### 3. **Fetch When Needed** (On-Demand)
- Nicht erwähnt bis relevant
- Wird bei Bedarf abgerufen
- Beispiel: Fehler-Logs, Monitoring-Daten

### 4. **Never Read Again** (Verarbeitet & verworfen)
- Einmal verarbeitet, komprimiert oder verworfen
- Nie wieder vollständig gelesen
- Beispiel: Raw API Responses, Zwischenergebnisse

## Challenge für jedes Item:
> "Was bricht, wenn das eine Tier nach unten wandert?"

Wenn nichts bricht → nach unten verschieben.

## Ziel:
Context Window so klein wie möglich bei korrektem Verhalten - für Kosten, Kohärenz und Debuggability.

## Agent beschreiben:
$ARGUMENTS

---
Stelle mir nacheinander Fragen, um dieses Attention Budget zu erstellen. Starte jetzt.
