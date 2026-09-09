# Ruben Schultka · Portfolio

Individuelles, deutschsprachiges Portfolio für einen angehenden Fachinformatiker für Systemintegration. Im Mittelpunkt stehen das Nero-V-Projekt und die praktische Remoteverwaltung von Rack-Servern.

## Stackentscheidung

**Astro, TypeScript und eigenes CSS.** Diese inhaltsorientierte Website benötigt weder eine SPA noch ein Backend. Astro erzeugt beim Build statisches HTML. Wenig JavaScript ergänzt den Arbeitsfelder-Explorer, die Abschnittsmarkierung, das Disclosure-Feedback und die Kopierfunktion. Projekt-Einblicke funktionieren mit nativen `details`-Elementen auch ohne JavaScript. Kein UI-Framework und keine Animationsbibliothek.

Manrope und Barlow Condensed werden mit Fontsource lokal ausgeliefert. Infrastruktur- und Servergrafiken sind eigene SVG-/CSS-Illustrationen; sie sind keine Screenshots und behaupten keine reale Netzwerktopologie. Die Darstellung der 400 Nutzer ist der im Briefing genannte Höchstwert, keine Live-Messung.

## Lokal starten

Voraussetzung: Node.js **22.12+** (oder eine neuere unterstützte Version) und npm. Getestet mit Node.js 26.5.0.

```sh
npm ci
npm run dev
```

Die lokale Adresse wird im Terminal ausgegeben (standardmäßig `http://localhost:4321`).

```sh
npm run check        # Astro- und TypeScript-Prüfung
npm run lint         # ESLint für Astro, TypeScript und JavaScript
npm run format:check # Einheitliche Quellcode-Formatierung prüfen
npm run build        # Statische Website nach dist/
npm run preview      # Produktionsbuild lokal ansehen
```

## Browserprüfungen

```sh
npx playwright install chromium
npm run build
npm test
```

Die Tests prüfen 360, 390, 768, 1024, 1440 und 1920 Pixel, horizontales Overflow, Projekt-Einblicke, interne Links, öffentliche Metadaten, das Weglassen privater Angaben, Tastaturbedienung, Clipboard, Reduced Motion und Kernfunktionen ohne JavaScript. axe-core prüft WCAG A/AA automatisiert. Das ersetzt keine vollständige manuelle Barrierefreiheitsprüfung.

## Struktur

```text
src/
  components/             Navigation, Icons, Projektansicht, Infrastruktur
  content/portfolio.ts    Öffentliche Inhalte und markierte Datenprüfung
  content/legal.ts        Anschrift für Rechtstexte und geprüfter Hostinganbieter
  layouts/Layout.astro   Dokument, SEO und lokale Schrift
  pages/                 Portfolio, Impressum, Datenschutz, 404, robots.txt, Sitemap
  scripts/               Progressive Interaktionen ohne Framework
  styles/global.css      Gestaltung, Responsive, Bewegung, Druckansicht
public/                  Favicon, Apple-Touch-Icon und Open-Graph-Bild
scripts/                 Reproduzierbare Erzeugung der PNG-Assets
tests/                   Playwright und axe-core
private/profile.json     Nur lokal: vollständige Kontaktdaten
```

`node scripts/generate-assets.mjs` erzeugt die bereits enthaltenen PNG-Dateien neu. Sharp wird ausschließlich dafür eingesetzt und gelangt nicht in den Browser.

## Inhalte und bewusste Entscheidungen

- Texte, Technologien, Zeiträume und Kontaktdaten werden in `src/content/portfolio.ts` gepflegt. Keine erfundenen Ergebnisse, Referenzen, Qualifikationen oder Erfahrungsjahre.
- Der Status lautet **„Angehender Fachinformatiker für Systemintegration“**. Ein Ausbildungsbetrieb oder Ausbildungsbeginn wurde nicht genannt und daher nicht behauptet.
- **Zu prüfen:** Der angegebene Service-Learning-Zeitraum „August 2024 – Januar 2024“ ist widersprüchlich. Originalwert und Prüfmarker sind in der Content-Datei hinterlegt. Öffentlich erscheint der neutrale Text „Service-Learning“.
- Zur TÜV Rheinland Akademie wird nur „Berufsvorbereitung“ genannt. Zeitraum, Abschluss und Tätigkeiten bleiben offen.
- Englisch: „Obere Mittelstufe“, keine abgeleitete CEFR-Stufe.
- Das Geburtsdatum bleibt ausschließlich in `private/profile.json`. Dieser Ordner ist von Git ausgeschlossen, wird nirgends importiert und nicht nach `dist/` kopiert. Die Anschrift wurde auf ausdrücklichen Wunsch nach einem Impressum in `src/content/legal.ts` aufgenommen und erscheint ausschließlich in Impressum und Datenschutz. Die Portfolio-Startseite zeigt weiterhin nur Berlin.
- Ein Kontaktformular ist nicht notwendig: E-Mail, Telefon und eine progressive Kopierfunktion sind direkt nutzbar. Keine externen Tracking- oder Schriftanfragen.
- Die Navigation bleibt auch mobil direkt sichtbar; kein zusätzliches Menü oder Menü-JavaScript ist erforderlich.
- Eine Druckansicht ist enthalten. Sie enthält die öffentlichen Angaben und dient nicht als vollständiger privater Lebenslauf.

## Deployment

Das Projekt kann auf jedem statischen Webhost betrieben werden. Build-Befehl: `npm run build`. Ausgabeordner: **`dist`**. Kein Node-Server ist im Produktionsbetrieb nötig.

Vor dem Produktionsbuild **`SITE_URL` als Umgebungsvariable** auf die tatsächliche HTTPS-Origin setzen, ohne Unterpfad. Zum Beispiel im Hosting-Dashboard. Lokal in PowerShell:

```powershell
$env:SITE_URL = 'https://eigene-domain.de'
npm run build
npm run preview
```

Die Domain im Beispiel muss durch die eigene ersetzt werden. Ohne konfigurierte Domain werden bewusst keine erfundene Canonical-URL und keine Sitemap-Adresse in `robots.txt` veröffentlicht; die Sitemap bleibt leer. Mit `SITE_URL` entstehen korrekte Canonical-/Open-Graph-URLs, absolute Bild-URLs und eine Sitemap mit Startseite, Impressum und Datenschutz. `.env.example` dokumentiert die Variable; die Build-Konfiguration liest die Prozessumgebung.

Die Anwendung setzt Deployment im Domainwurzelverzeichnis voraus. HTTPS beim Host aktivieren. Die Hosting-Konfiguration sollte komprimierte Auslieferung und langfristiges Caching für gehashte `/_astro/`-Assets verwenden. HTML beim erneuten Deployment aktualisieren lassen.

## Gestaltung und Zugänglichkeit

Die Revision verbindet eine helle technische Arbeitsfläche mit Graphit, Kobalt und einer dunklen Nero-V-Projektfläche. Barlow Condensed trägt Namen und Projekttitel, Manrope die Texte. Der Arbeitsfelder-Explorer lässt Entwicklung, Infrastruktur und Betrieb gezielt hervorheben und erläutert den Bezug zu den tatsächlichen Projekten. Das auditierte Bewegungskonzept ist in `plans/README.md` dokumentiert.

Semantische Landmarken, ein Sprunglink, sichtbare Fokusmarkierungen, native Disclosure-Elemente und Live-Rückmeldungen unterstützen die Bedienung. `prefers-reduced-motion` deaktiviert Bewegung und weiches Scrollen; statische Zustandsfarben und Rückmeldungen bleiben. Der Hero wird einmal eingeblendet. Der Explorer verwendet unterbrechbare 250-ms-Transitions, Details 200-ms-WAAPI-Feedback und Buttons 160-ms-Druckfeedback. Keine Daueranimation oder Scroll-Reveals. Inhalte und die erste Explorer-Ansicht sind ohne JavaScript vorhanden.

## Rechtstexte und NovaCloud

Impressum und Datenschutz sind von jeder Seite erreichbar. Hostinganbieter laut Nutzer: NovaCloud-Hosting. Betreiberangaben wurden am 09.09.2026 anhand des [NovaCloud-Impressums](https://novacloud-hosting.com/imprint) und der [Anbieter-Datenschutzhinweise](https://www.iubenda.com/privacy-policy/76982670/legal) geprüft. Zusätzliche Grundlagen: [§ 18 MStV](https://www.gesetze-bayern.de/Content/Document/MStV-18), [§ 5 DDG](https://www.gesetze-im-internet.de/ddg/__5.html) und [DSGVO](https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=de).

Der tatsächliche Webserver ist nicht Teil dieses Arbeitsverzeichnisses. Vor öffentlichem Betrieb müssen dessen Protokollierung/Löschung, etwaige vorgeschaltete CDN-Dienste sowie die Auftragsverarbeitung mit dem Anbieter mit der Datenschutzerklärung abgeglichen werden. Es werden weder eine konkrete Aufbewahrungsfrist noch ein abgeschlossener AV-Vertrag behauptet. Die Datenschutzhinweise des Hostinganbieters beschreiben auch dessen eigene Website und wurden nicht als Funktionsliste dieses Portfolios übernommen. Die Rechtstexte sind auf die bekannte Umsetzung abgestimmt, keine Zusicherung rechtlicher Vollständigkeit.

Reale Core Web Vitals lassen sich erst mit produktivem Hosting und echten Nutzungsdaten beurteilen. Die lokale Browserprüfung liefert keine erfundenen Performance-Scores.
