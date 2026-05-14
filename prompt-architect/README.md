# prompt-architect

**Best-Practice Prompt Generator fuer Claude 4.x (Dezember 2025)**

## Problem

Du gibst Claude einen Auftrag und das Ergebnis ist nicht optimal, weil:
- Der Prompt zu vage ist
- Wichtiger Kontext fehlt
- Keine Erfolgskriterien definiert sind
- Claude nicht weiss, welches Format erwartet wird

## Loesung

Dieser Skill transformiert Anforderungen in strukturierte Best-Practice Prompts.

Basiert auf:
- **Nate B. Jones** Prompting Playbook 2025 (4 Beginner Moves)
- **Anthropic** Claude 4.x Official Best Practices
- **Pipelines over Prompts** Philosophie

## Installation

mkdir -p ~/.claude/skills/prompt-architect
cp SKILL.md README.md ~/.claude/skills/prompt-architect/

## Verwendung

### Mit vorheriger Klärung

1. User gibt vagen Auftrag
2. clarify-spec klaert nur bei echter Ziel-Mehrdeutigkeit und nur einmal gebuendelt
3. User ruft /prompt-architect explizit auf
4. prompt-architect transformiert den geklaerten Kontext in einen Best-Practice Prompt
5. Ausfuehrung mit Quality Gates

### Standalone

/prompt-architect Fuege Export-Button zu ResultsDisplay hinzu

## Die 4 Beginner Moves

| Move | Was es macht | Beispiel |
|------|--------------|----------|
| Shape | Definiert exakten Output | TypeScript-Datei mit Interface X |
| Context | Sammelt relevante Infos | CLAUDE.md, betroffene Dateien |
| Silent Plan | Laesst Claude intern planen | consider your approach first |
| Self-Check | Verifikations-Checkliste | Before responding, verify... |

## Claude 4.x Patterns

- **Explizitheit + Modifier**: Go beyond the basics
- **Context + Motivation**: WARUM erklaert WAS
- **Examples beat Adjectives**: Zeigen statt beschreiben
- **XML-Tags**: Strukturierte Sektionen
- **Uncertainty Permission**: Reduziert Halluzinationen

## Workflow

clarify-spec (optional, nur bei echter Mehrdeutigkeit)
       |
       v
expliziter /prompt-architect Aufruf
       |
       v
prompt-architect (Best-Practice Prompt)
       |
       v
  /supervisor (Quality Gates)
       |
       v
  Fertiges Ergebnis

## Lizenz

MIT License

## Autor

Dresden AI Insights
www.dresdenaiinsights.com
