# clarify-spec

**Auftragsklärung mit hoher Schwelle für Claude Code**

[![Claude Code Skill](https://img.shields.io/badge/Claude%20Code-Skill-blue)](https://github.com/anthropics/skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Problem

Du gibst Claude einen Auftrag, der wirklich mehrere Ziele bedeuten kann. Ohne kurze Klärung würde Claude eine Richtung wählen, die vielleicht nicht gemeint war.

```
User: "Räum die Auth auf"
Claude: *ändert Token-Handling, obwohl eigentlich Tests gemeint waren*
User: "Das meinte ich nicht..."
```

## Lösung

Dieser Skill klärt nur dann, wenn nach eigener Recherche eine echte Ziel-Mehrdeutigkeit bleibt. Kurze Aufträge, vage Verben und fehlende Dateinamen sind kein Grund für Rückfragen: Claude sucht zuerst selbst im Projekt und trifft dann eine Senior-Entscheidung.

```
User: "Räum die Auth auf"
Claude: *prüft Repo, Issues und bestehende Auth-Dateien*
Claude: "Kurze Klärung:
         1. Meinst du Refactor, Tests oder Token-Rotation?
         2. Soll produktives Login-Verhalten unverändert bleiben?"
User: "Tests, Verhalten unverändert"
Claude: *arbeitet danach autonom bis fertig*
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

### Automatisch mit hoher Schwelle

Der Skill aktiviert sich nur, wenn nach eigener Recherche mindestens eines davon bleibt:

| Signal | Beispiel |
|--------|----------|
| Ziel ist widersprüchlich | "mach es wie besprochen", aber es gibt keine Notiz |
| Mehrere grundverschiedene Ziele sind plausibel | "räum die Auth auf" kann Refactor, Tests oder Token-Rotation heißen |
| Information fehlt im Repo | "nutz die neue API", aber es gibt keine API-Doku |
| Irreversible Aktion mit unklarem Scope | "lösch die alten Branches" |

Nicht auslösen bei kurzen Aufträgen, fehlenden Dateinamen oder vagen Verben allein. Das sind normale Alltagsaufträge.

### Manuell

```
/clarify
/spec
/was-genau
```

## Workflow

```
┌─────────────────────────────────────────────────┐
│ 1. EIGENRECHERCHE                              │
│    Grep/Glob/Read, CLAUDE.md/AGENTS.md, History │
│              ↓                                  │
│ 2. ECHTE MEHRDEUTIGKEIT?                       │
│    Ziel offen, Info fehlt, irreversibler Scope  │
│              ↓                                  │
│ 3. FRAGEN EINMAL BÜNDELN                       │
│    Max. 4 Fragen in einem AskUserQuestion-Aufruf│
│              ↓                                  │
│ 4. AUTONOM DURCHARBEITEN                       │
│    Keine Frage-Schleife, kein Stopp pro Schritt │
└─────────────────────────────────────────────────┘
```

## Escape Hatches

Du kannst die Klärung überspringen:

- `"Mach einfach"`
- `"Entscheide selbst"`
- `"Keine Rückfragen"`

## Beispiele

### Mehrdeutiger Auftrag

```
User: "Räum die Auth auf"

Claude: *prüft Auth-Dateien und Projektkontext*
Claude: "Welche Richtung meinst du?
1. Refactor ohne Verhaltensänderung
2. Mehr Tests für bestehendes Verhalten
3. Token-/Session-Logik ändern"
```

### Klarer Auftrag (keine Nachfrage)

```
User: "Füge in ResultsDisplay.tsx einen Download-Button hinzu
       der die Analyse als .md Datei speichert"

Claude: *führt direkt aus*
```

## Konfiguration

Der Skill ist absichtlich zurückhaltend konfiguriert:

> **Erst selbst recherchieren. Nur echte Ziel-Mehrdeutigkeit einmal klären. Danach autonom arbeiten.**

Wenn du gar keine Klärung möchtest, nutze "mach einfach" zum Überspringen.

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
