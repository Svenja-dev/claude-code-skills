---
name: clarify-spec
description: |
  Klaert einen Auftrag NUR wenn er echt mehrdeutig ist und eigenes Recherchieren
  (Grep/Glob/Read der Projektdateien) die Unklarheit nicht aufloest.

  NICHT triggern bei: kurzen Auftraegen, vagen Verben allein ("fix X", "mach Y besser"),
  fehlenden Dateinamen. Das sind normale Alltagsauftraege — die werden durch
  Eigenrecherche + Senior-Entscheidung erledigt, nicht durch Rueckfragen.

  Triggern NUR bei echter Mehrdeutigkeit: das Ziel selbst ist unklar oder
  widerspruechlich, mehrere grundlegend verschiedene Interpretationen sind moeglich,
  oder es fehlt Information die nirgends im Repo steht.

  Wenn er triggert: ALLE Fragen EINMAL gebuendelt (ein AskUserQuestion-Aufruf,
  bis 4 Fragen) — danach autonom durcharbeiten, kein Stopp pro Schritt.
  Escape: "mach einfach" / "keine Rueckfragen" / "entscheide selbst" ueberspringt komplett.
triggers:
  - /clarify
  - /spec
  - /was-genau
  - /praezisieren
  - /klaeren
---

# Clarify-Spec v3.0: Auftragsklaerung mit hoher Schwelle

## Grundhaltung

Dieser Skill ist **kein Reflex**. Sein Vorgaenger (v2.0 mit aggressiver
Rueckfrage-Schwelle) hat eine Frage-Schleife erzeugt, in der Lara nur noch
getippt hat statt Arbeit voranzubringen. Das ist der Fehler, den v3.0 verhindert.

Die Regel ist: **Erst selbst nachsehen. Dann eine Senior-Entscheidung treffen.
Nur wenn eine echte Ziel-Mehrdeutigkeit bleibt — einmal gebuendelt fragen.**

Ein kurzer Auftrag ist kein Problem. Ein vages Verb ist kein Problem. Ein fehlender
Dateiname ist kein Problem — den findet man mit Grep. Ein *echt mehrdeutiges Ziel*
ist ein Problem.

## Wann dieser Skill triggert (hohe Schwelle)

NUR wenn nach eigener Recherche mindestens eines davon zutrifft:

| Echte Mehrdeutigkeit | Beispiel |
|---|---|
| Das Ziel selbst ist unklar/widerspruechlich | "mach es wie besprochen" — es gibt keine Notiz, was besprochen wurde |
| Mehrere grundlegend verschiedene Interpretationen | "raeum die Auth auf" — koennte Refactor, Logging, Token-Rotation oder Tests heissen, alle plausibel |
| Information fehlt, die NIRGENDS im Repo steht | "nutz die neue API" — keine API im Code, kein Doc, kein Issue |
| Irreversible Aktion mit unklarem Scope | "loesch die alten Branches" — welche genau? unwiederbringlich |

## Wann dieser Skill NICHT triggert

Bei all dem: NICHT fragen — recherchieren und arbeiten.

- Kurzer Auftrag ("fix den Export-Bug") → Bug suchen, fixen.
- Vages Verb ("mach die Seite besser") → wenn der Kontext den Mangel klarmacht
  (offensichtlicher Bug, kaputtes Layout): beheben. Wenn wirklich offen: EINE
  gebuendelte Frage, was "besser" konkret heisst — aber erst nach Ansehen der Seite.
- Kein Dateiname genannt → Glob/Grep findet die Datei.
- "wie immer" / "das uebliche" → Git-History und bestehende Patterns zeigen das Uebliche.

## Workflow

### Phase 1: Eigenrecherche zuerst (immer, still, ohne User)

Bevor irgendeine Frage gestellt wird:

1. Relevante Dateien suchen (Glob/Grep) und lesen.
2. CLAUDE.md / AGENTS.md / Memory pruefen.
3. Git-History und aehnliche bestehende Implementierungen ansehen.
4. No-Touch-Zones identifizieren.

Nach Phase 1 ist die Frage in den allermeisten Faellen beantwortet. Dann: **direkt
arbeiten, Phase 2-4 ueberspringen.**

### Phase 2: Echtheits-Pruefung der Unklarheit

Bleibt nach Phase 1 etwas offen — pruefen: Ist das eine **echte
Ziel-Mehrdeutigkeit** (Tabelle oben) oder nur ein Detail, das eine
Senior-Entscheidung verträgt?

- Detail, das man vernuenftig selbst entscheiden kann → entscheiden, Annahme im
  Ergebnis dokumentieren, weiterarbeiten.
- Echte Ziel-Mehrdeutigkeit → Phase 3.

### Phase 3: EIN gebuendelter Fragen-Block

Wenn gefragt werden muss: **alle offenen Punkte auf einmal** ueber das
`AskUserQuestion`-Tool (bis zu 4 Fragen gleichzeitig). Nicht nacheinander, nicht
ueber mehrere Nachrichten verteilt.

Fragen-Prioritaet — nur was wirklich offen ist:

| Prio | Typ | Wann fragen |
|------|-----|-------------|
| 1 | ZIEL | Das Ziel selbst ist mehrdeutig — welche Interpretation? |
| 2 | SCOPE | Bei irreversiblen Aktionen: was genau ist betroffen? |
| 3 | INFO | Information fehlt, die nirgends im Repo steht |

WAS/WO-Fragen ("welche Datei?", "Frontend oder Backend?") gehoeren NICHT hierher —
die beantwortet Phase 1.

### Phase 4: Nach den Antworten — autonom

Sobald die Antworten da sind: **durcharbeiten bis fertig.** Keine weitere
Rueckfrage, kein Approval-Checkpoint pro Schritt, kein erneutes Klaeren. Nur ein
echter, vorher unsichtbarer Blocker rechtfertigt eine weitere Frage.

## Escape Hatches

Klaerung wird komplett uebersprungen bei:
- "Mach einfach" / "Entscheide selbst" / "Keine Rueckfragen"
- "Egal, hauptsache X funktioniert" / "Just do it"

Bei Escape: mit bestem Wissen ausfuehren, getroffene Annahmen am Ende kurz nennen.

## Verhaeltnis zu prompt-architect

`prompt-architect` triggert NICHT mehr automatisch nach diesem Skill. Wenn ein
strukturierter Prompt gebraucht wird, ruft der User `/prompt-architect` explizit auf.

## Erfolgs-Metrik

Der Skill ist erfolgreich wenn:
- Lara NICHT in einer Frage-Schleife sitzt.
- Normale Alltagsauftraege ohne Rueckfrage erledigt werden.
- Gefragt wird nur bei echter Mehrdeutigkeit — und dann genau einmal.
- Keine "das meinte ich nicht"-Situationen, weil Phase 1 den Kontext liefert.
