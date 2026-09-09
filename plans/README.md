# Gestaltungs- und Bewegungsrevision

Direkte Überarbeitung vom Nutzer angefordert. `improve-animations` liefert das Audit; die ausdrücklich gewünschte Umsetzung erfolgt als Frontend-Revision. Kleines Repository, lokale Prüfung ohne Subagenten. Kein Git-Commit vorhanden.

| Priorität | Schwere | Ausgangsstelle                          | Befund                                                       | Ziel                                                      |
| --------- | ------- | --------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| 1         | MEDIUM  | `src/components/Project.astro`; CSS:448 | Plus bewegt sich, Inhalt springt.                            | 200-ms-Inhaltsübergang, native Details erhalten.          |
| 2         | LOW     | `src/styles/global.css:220`             | Hover-Verschiebung ohne Pointer-Abfrage, kein Druckfeedback. | Hover auf feinen Pointer begrenzen, 160-ms-Druckfeedback. |
| 3         | LOW     | `src/styles/global.css:788–791`         | Zwei ähnliche Hero-Einblendungen, keine gemeinsamen Tokens.  | Ein Einstieg, gemeinsame Kurven.                          |

Zusätzliche sinnvolle Zustandswechsel: neuer Arbeitsfelder-Explorer, Clipboard-Erfolg und Navigation. Keine Daueranimation, Parallax oder simulierte Live-Metriken.

## Visuelles Konzept

Verglichen: dunkle Rack-Ansicht; helle technische Arbeitsfläche; rein typografische Editorial-Seite. Gewählt: technische Arbeitsfläche, da die dunkle Split-Hero-Komposition ausdrücklich zurückgewiesen wurde.

Palette: Papier `#eeeee8`, Graphit `#202824`, Linien `#ccd0c8`, Kobalt `#244aca`, dunkles Blau `#172a3b`, Weiß `#fafbf7`. Barlow Condensed 600 für Namen und Projekttitel, Manrope für Text. Breiter Namenszug über asymmetrischem Berufsprofil und erkundbarer Systemzeichnung. Eigenständige dunkle Nero-V-Fläche, Hosting mit Rack-Motiv, heller Werdegang.

## Selbstständiger Ausführungsplan

1. `src/styles/global.css`: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` und `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`. UI-Übergänge 160–250 ms.
2. `src/components/SystemExplorer.astro`: native Buttons mit `aria-pressed`, unveränderte Fokusposition, erklärendes Textpanel. Diagramme über unterbrechbare Opazität-/Transform-Transitions in 250 ms. Keine Intervalle oder animierten Layoutmaße.
3. `src/scripts/interactions.ts`: native Details progressiv mit WAAPI von 200 ms ergänzen; vorhandene Animation vor Toggle abbrechen. Tastatur und Reduced Motion ohne Transformbewegung.
4. Buttons: `scale(0.97)` für 160 ms beim Drücken; räumliche Hoverzustände nur unter `(hover: hover) and (pointer: fine)`. Reduced Motion behält statische Farben/Textfeedback.
5. `npm run check`, `npm run lint`, `npm run build`, `npm test`. Explorer schnell während eines Übergangs wechseln. Tastatur, 360–1920 px, Reduced Motion, deaktiviertes JS. Bewegung zusätzlich langsam visuell prüfen. Keine Interaktionssperre beim Einstieg.

Keine neue Motion-Bibliothek. Rechtstexte liegen außerhalb des Motion-Audits.
