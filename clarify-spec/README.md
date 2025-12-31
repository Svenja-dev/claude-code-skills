# clarify-spec

**Automatische Auftragsklärung für Claude Code**

[![Claude Code Skill](https://img.shields.io/badge/Claude%20Code-Skill-blue)](https://github.com/anthropics/skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Problem

Du gibst Claude einen vagen Auftrag → Claude rät was gemeint ist → Ergebnis passt nicht → Nacharbeit und Frustration.

```
User: "Mach den Export besser"
Claude: *implementiert irgendwas*
User: "Das meinte ich nicht..."
```

## Lösung

Dieser Skill **aktiviert sich automatisch** bei vagen Aufträgen und stellt gezielte Rückfragen BEVOR Code geschrieben wird.

```
User: "Mach den Export besser"
Claude: "Kurze Rückfrage:
         1. Welchen Export? (PPTX / Markdown / beide)
         2. Was genau stört dich am aktuellen Export?
         (Oder sag 'mach einfach')"
User: "PPTX, das Logo fehlt"
Claude: "Präzisierter Auftrag:
         Ziel: Logo zum PPTX-Export hinzufügen
         Datei: presentationBuilder.ts
         Soll ich loslegen?"
```

## Installation

### Option 1: Manuell kopieren
```bash
# In dein Skills-Verzeichnis kopieren
cp -r clarify-spec ~/.claude/skills/
```

### Option 2: Git clone
```bash
cd ~/.claude/skills
git clone https://github.com/YOUR_USERNAME/clarify-spec.git
```

## Aktivierung

### Automatisch (empfohlen)

Der Skill aktiviert sich **automatisch** bei:

| Signal | Beispiel |
|--------|----------|
| Kurzer Auftrag (<20 Wörter) | "Mach den Export besser" |
| Keine Dateinamen | "Optimiere die Performance" |
| Vage Verben | besser, optimieren, fixen, machen |
| Unsichere Sprache | irgendwie, vielleicht, mal eben |

### Manuell

```
/clarify
/spec
/was-genau
```

## Workflow

```
┌─────────────────────────────────────────────────┐
│ 1. VAGHEITS-CHECK                               │
│    Auftrag < 20 Wörter? Keine Dateinamen?       │
│    Vage Verben?                                 │
│              ↓                                  │
│ 2. KONTEXT SAMMELN (still)                      │
│    Relevante Dateien, CLAUDE.md prüfen          │
│              ↓                                  │
│ 3. RÜCKFRAGEN (2-4)                             │
│    Was genau? Wo? Erfolgskriterium?             │
│              ↓                                  │
│ 4. STRUKTURIERTER AUFTRAG                       │
│    Ziel, Scope, Erfolgskriterien                │
│              ↓                                  │
│ 5. BESTÄTIGUNG                                  │
│    ja → Ausführen                               │
│    nein → Abbrechen                             │
│    anpassen → Modifizieren                      │
└─────────────────────────────────────────────────┘
```

## Escape Hatches

Du kannst die Klärung überspringen:

- `"Mach einfach"`
- `"Entscheide selbst"`
- `"Keine Rückfragen"`

## Beispiele

### Vager Auftrag

```
User: "Optimiere die Performance"

Claude: "Welche Performance meinst du?
1. Ladezeit der Seite?
2. API Response Time?
3. Build-Zeit?
4. Bundle Size?"
```

### Klarer Auftrag (keine Nachfrage)

```
User: "Füge in ResultsDisplay.tsx einen Download-Button hinzu
       der die Analyse als .md Datei speichert"

Claude: *führt direkt aus*
```

## Konfiguration

Der Skill ist absichtlich **aggressiv** konfiguriert:

> **LIEBER EINMAL ZU OFT NACHFRAGEN als falsch implementieren.**

Wenn dir das zu viel ist, nutze "mach einfach" zum Überspringen.

## Kompatibilität

- Claude Code CLI
- Claude Desktop (mit Skills-Support)
- Alle Projekte (keine projekt-spezifischen Abhängigkeiten)

## Lizenz

MIT License - siehe [LICENSE](LICENSE)

## Autor

Dresden AI Insights
[dresdenaiinsights.com](https://www.dresdenaiinsights.com)

---

*Entwickelt für fabrikIQ, nutzbar für jedes Projekt.*
