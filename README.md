# Projektdokumentation - Stadium Tracker

## Inhaltsverzeichnis

1. [Ausgangslage](#1-ausgangslage)
2. [Lösungsidee](#2-lösungsidee)
3. [Vorgehen & Artefakte](#3-vorgehen--artefakte)
    1. [Understand & Define](#31-understand--define)
    2. [Sketch](#32-sketch)
    3. [Decide](#33-decide)
    4. [Prototype](#34-prototype)
    5. [Validate](#35-validate)
4. [Erweiterungen [Optional]](#4-erweiterungen-optional)
5. [Projektorganisation [Optional]](#5-projektorganisation-optional)
6. [KI-Deklaration](#6-ki-deklaration)
7. [Anhang [Optional]](#7-anhang-optional)

> **Hinweis:** Massgeblich sind die im **Unterricht** und auf **Moodle** kommunizierten Anforderungen.

<!-- WICHTIG: DIE KAPITELSTRUKTUR DARF NICHT VERÄNDERT WERDEN! -->

## 1. Ausgangslage

Fussballfans besuchen regelmässig Spiele in verschiedenen Stadien — im Inland wie im Ausland. Dabei sammeln sie über die Jahre eine Vielzahl an Erlebnissen: Derbys, Auswärtsfahrten, Siege und Niederlagen. Doch es gibt aktuell keine spezialisierte Anwendung, die es ermöglicht, diese Stadionbesuche systematisch festzuhalten, auf einer Karte zu visualisieren und eine persönliche "Bucket List" für Wunsch-Stadien zu führen. Bestehende Reise-Tracker-Apps wie Polarsteps decken den allgemeinen Reisebereich ab, bieten aber keine fussballspezifischen Funktionen wie Spielergebnisse, Home/Away-Zuordnung oder Win-Rate-Statistiken.

- **Problem:** Fussballfans haben keine einfache Möglichkeit, ihre Stadionbesuche digital zu dokumentieren, zu visualisieren und mit einer Wunschliste zukünftiger Stadien zu kombinieren. Bestehende Apps sind entweder zu allgemein (Reise-Tracker) oder bieten keine Kombination aus Besuchshistorie, interaktiver Karte und Bucket List. Die Erlebnisse gehen so oft verloren oder sind nur fragmentarisch in Fotos und Erinnerungen vorhanden.

- **Ziele:** Entwicklung eines funktionsfähigen Web-Prototyps, der Fussballfans ermöglicht, ihre Stadionbesuche zu erfassen, statistisch auszuwerten, auf einer interaktiven Karte darzustellen und eine Bucket List mit Wunsch-Stadien zu pflegen. Der Prototyp soll die im Modul Prototyping vermittelte Methodik (Design Sprint) anwenden und mit echten Nutzenden evaluiert werden.

- **Primäre Zielgruppe:** Fussballfans im Alter von 18–35 Jahren, die regelmässig Spiele live im Stadion besuchen und ihre Erlebnisse festhalten möchten. Sie sind technikaffin, nutzen Smartphones im Alltag und haben Freude daran, ihre Erlebnisse zu tracken und zu teilen — ähnlich wie bei Fitness- oder Reise-Tracking-Apps.

- **Weitere Stakeholder [Optional]:** Freundeskreise von Fussballfans (potenzielle Nutzer für soziale Features in einer späteren Version), Stadionbetreiber und Reiseanbieter (könnten von aggregierten Daten profitieren).

## 2. Lösungsidee

Der **Stadium Tracker** ist eine responsive Webapplikation (Mobile-first), die Fussballfans eine zentrale Plattform bietet, um ihre Stadionerlebnisse festzuhalten und motivierend zu visualisieren. Die App kombiniert drei Kernkonzepte: eine Besuchshistorie mit Spieldetails, eine visuelle Stadion-Karte und eine persönliche Bucket List — inspiriert von Reise-Tracker-Apps wie Polarsteps, aber spezialisiert auf Fussballstadien.

**HMW-Frage:** *Wie könnten wir Fussballfans helfen, ihre Stadionerlebnisse einfach festzuhalten und motivierend zu visualisieren, welche Stadien sie bereits besucht haben und welche noch auf ihrer Bucket List stehen?*

- **Kernfunktionalität:**
  - **Dashboard:** Gesamtübersicht mit Statistiken (Anzahl Stadien, Besuche, Länder, Win-Rate), Home/Away-Verteilung, nächstem geplantem Besuch, Länder-Breakdown und den letzten Besuchen.
  - **Besuche erfassen & verwalten:** Formular zur Erfassung neuer Stadionbesuche mit Stadion, Datum, Teams, Ergebnis, Home/Away-Zuordnung und optionalen Notizen. Chronologische Liste aller bisherigen Besuche.
  - **Bucket List:** Wunsch-Stadien mit Name, Stadt, Land und Kapazität hinzufügen. Stadien können als "besucht" markiert werden und wechseln dann in die Besuchshistorie.
  - **Interaktive Karte:** Europakarte mit farbcodierten Markern — Grün für besuchte Stadien, Orange für Bucket-List-Stadien. Klick auf einen Marker zeigt Details im Tooltip.

- **Annahmen [Optional]:**
  - Fussballfans möchten ihre Stadionbesuche aktiv dokumentieren und nicht nur in Erinnerungen behalten.
  - Eine visuelle Darstellung auf einer Karte motiviert Fans, weitere Stadien zu besuchen.
  - Die Kombination aus Tracking und Bucket List erzeugt einen "Sammel-Effekt", der zur regelmässigen Nutzung anregt.

- **Abgrenzung [Optional]:**
  - Kein Social/Sharing-Feature (Login, öffentliche Profile, Besuche anderer User finden) — bewusst verworfen wegen Scope und Zeitrahmen des Prototyps (siehe Sketch-Phase, Variante C).
  - Keine Stadion-Detailseite mit Fotos und Bewertungen.
  - Keine Filter- und Suchfunktion für Besuche (z. B. nach Land, Ergebnis, Zeitraum).
  - Keine Statistik-Charts (Balkendiagramme etc.).
  - Keine Hotel/Restaurant-Tipps pro Besuch.

## 3. Vorgehen & Artefakte

Die Durchführung erfolgt phasenbasiert gemäss der Design-Sprint-Methodik, die im Modul Prototyping vermittelt wurde. Die fünf Phasen — Understand & Define, Sketch, Decide, Prototype, Validate — werden nacheinander durchlaufen. Im Folgenden werden die wichtigsten Ergebnisse je Phase dokumentiert.

### 3.1 Understand & Define

- **Zielgruppenverständnis:**
  - **Problemraum:** Freizeit / Sport-Erlebnisse festhalten
  - **Recherche:** Analyse bestehender Apps im Bereich Reise-Tracking und Sport-Erlebnis-Dokumentation. Polarsteps wurde als zentrale Referenz identifiziert — eine App, die Reisen visuell auf einer Karte dokumentiert, aber keinen Fussball-Fokus bietet. Weitere recherchierte Apps zeigten: Es gibt aktuell keine Anwendung, die Besuchshistorie und interaktive Karte spezialisiert für Fussballstadien kombiniert.
  - **Proto-Persona — "Luca" (25, Zürich):** Studiert Wirtschaftsinformatik, besucht regelmässig Spiele des FC Zürich im Letzigrund und reist für Auswärtsspiele in andere Schweizer Städte. Einmal jährlich besucht er ein grosses Stadion im Ausland (z. B. Signal Iduna Park, Allianz Arena). Luca nutzt Strava für sein Lauftraining und Polarsteps für Reisen — ihm fehlt aber ein äquivalentes Tool für seine Stadionbesuche. Er möchte sehen, wie viele Stadien er schon "gesammelt" hat und welche noch auf seiner Liste stehen.

- **Wesentliche Erkenntnisse:**
  - Es existiert keine App, die Besuchshistorie mit Spieldetails und eine interaktive Stadion-Karte kombiniert.
  - Polarsteps dient als Inspiration für das visuelle Karten-Konzept, muss aber auf Fussball-spezifische Datenfelder erweitert werden (Teams, Ergebnis, Home/Away).
  - Der "Sammeleffekt" (wie bei Briefmarken oder Länder-Checklisten) ist ein starker Motivator für die Zielgruppe.
  - Mobile-first ist essenziell, da Fans die App typischerweise unterwegs im Stadion oder auf dem Weg dorthin nutzen.
  - Einfache, schnelle Erfassung ist wichtiger als vollständige Detailtiefe — Notizen und Zusatzinfos sollen optional sein.

### 3.2 Sketch

In der Sketch-Phase wurden drei Varianten für die Grundstruktur der App erarbeitet, die sich in ihrem primären Interaktionsparadigma unterscheiden. Zusätzlich wurde eine vierte Variante (Social/Sharing) skizziert und bewusst verworfen.

- **Variantenüberblick:**

  **Variante A — Listenbasiert (Chronik-Fokus):**
  Die App ist primär als chronologische Liste aufgebaut. Der Einstieg zeigt eine scrollbare Timeline aller Besuche (ähnlich einem Instagram-Feed). Die Karte und Statistiken sind sekundäre Ansichten, erreichbar über ein Menü. Der Fokus liegt auf dem Storytelling der einzelnen Besuche — jeder Eintrag kann mit ausführlichen Notizen und Details versehen werden.
  - *Stärke:* Einfache, vertraute Interaktion (Scroll-Muster). Gut für Fans, die gerne über ihre Erlebnisse schreiben.
  - *Schwäche:* Die Karte und der Sammeleffekt treten in den Hintergrund. Weniger motivierend als visuelle Ansätze.

  **Variante B — Kartenbasiert (Geo-Fokus):**
  Die Karte steht im Zentrum — sie ist der Einstiegsscreen. Alle Stadien werden sofort visuell auf einer Europakarte dargestellt. Von dort aus navigiert der User zu Detailansichten der einzelnen Stadien. Statistiken werden als Overlay auf der Karte angezeigt.
  - *Stärke:* Sofortige visuelle Wirkung, starker Sammeleffekt ("Wie viele Punkte habe ich schon?"). Inspiriert zum Erkunden neuer Stadien.
  - *Schwäche:* Besuche erfassen ist umständlich (erst Stadion auf Karte finden, dann Details eingeben). Auf kleinen Screens ist die Karte schwer bedienbar.

  **Variante C — Dashboard-zentriert (Übersichts-Fokus):**
  Der Einstieg ist ein Dashboard mit den wichtigsten Kennzahlen und einer kompakten Übersicht. Vier gleichwertige Tabs (Dashboard, Besuche, Bucket List, Karte) ermöglichen einen schnellen Wechsel zwischen den Funktionsbereichen. Jeder Tab hat eine klar definierte Aufgabe.
  - *Stärke:* Ausgewogene Kombination aller Features. Der User sieht sofort seine Fortschritte (Stats) und kann gezielt in die gewünschte Funktion navigieren. Skaliert gut auf Mobile durch Tab-Bar.
  - *Schwäche:* Das Dashboard muss viele Informationen kompakt darstellen, ohne überladen zu wirken.

  **Variante D — Social/Sharing (bewusst verworfen):**
  Erweiterung einer der obigen Varianten um Login-Funktionalität, öffentliche Profile, die Möglichkeit, Besuche anderer User zu sehen und zu suchen, sowie Hotels/Bars/Restaurants pro Besuch zu teilen.
  - *Stärke:* Community-Effekt, Empfehlungen von anderen Fans.
  - *Schwäche:* Massiv erhöhter Scope (Auth, Datenbank-Design für Multi-User, Datenschutz). Für den Zeitrahmen und Prototyp-Fokus nicht realistisch.
  - **Entscheidung:** Bewusst verworfen. Das Social-Feature wird als Ausblick für Version 2.0 dokumentiert, nicht als Teil des Prototyps. Die Begründung: Der Prototyp soll die Kernfunktionalität (Erfassen, Visualisieren, Bucket List) validieren, bevor soziale Features hinzukommen. Der Zeitrahmen des Semesterprojekts lässt keine solide Implementierung zu.

- **Skizzen:** Die Varianten wurden als grobe Wireframes/Papier-Skizzen erstellt, die den Screenaufbau und die Navigation der jeweiligen Variante zeigen. Variante A zeigt einen vertikalen Feed mit Karten-Icon im Menü, Variante B eine Vollbild-Karte mit Bottom-Sheet für Details, Variante C ein 4-Tab-Layout mit Dashboard als Einstieg.

### 3.3 Decide

- **Gewählte Variante & Begründung:**

  **Variante C (Dashboard-zentriert)** wurde gewählt. Die Entscheidung basierte auf folgenden Kriterien:

  | Kriterium | Variante A (Liste) | Variante B (Karte) | Variante C (Dashboard) |
  |---|---|---|---|
  | Übersichtlichkeit | Mittel — gut für einzelne Besuche, schwach für Gesamtbild | Schwach — Karte allein zeigt keine Stats | **Stark** — Dashboard zeigt sofort Fortschritte |
  | Sammeleffekt / Motivation | Schwach | Stark (visuelle Karte) | **Stark** (Stats + Karte kombiniert) |
  | Mobile-Tauglichkeit | Gut (Scroll-Muster) | Schwach (Karte auf kleinem Screen) | **Gut** (Tab-Bar-Pattern bekannt) |
  | Erfassungsflow | Gut (direkt in der Liste) | Umständlich | **Gut** (eigener Tab) |
  | Erweiterbarkeit | Mittel | Schwach | **Stark** (neue Tabs/Sections möglich) |
  | Scope-Realismus | Einfach | Mittel | **Machbar** |

  Variante C bietet die beste Balance aus Übersichtlichkeit, Motivation (Stats + Karte), Mobile-Tauglichkeit und realistischem Scope. Die Tab-Struktur ist ein bewährtes Muster aus bekannten Apps und ermöglicht eine klare Trennung der Funktionsbereiche.

- **End-to-End-Ablauf:**

  **User Journey Map — "Luca erfasst seinen Stadionbesuch":**
  1. Luca öffnet die Stadium Tracker App auf seinem Smartphone.
  2. Das Dashboard zeigt ihm seine aktuellen Statistiken: 6 Stadien besucht, 8 Besuche, 3 Länder, 50% Win-Rate.
  3. Er sieht die Karte des nächsten geplanten Besuchs (Camp Nou, Barcelona) mit Countdown.
  4. Luca wechselt zum Tab "Besuche" und tippt auf "+ Besuch erfassen".
  5. Er wählt das Stadion (Letzigrund), gibt Datum, Teams (FC Zürich vs. FC Basel), Ergebnis (1:1), Home/Away (Home) und eine Notiz ein.
  6. Klick auf "Besuch speichern" — der neue Besuch erscheint oben in der Liste.
  7. Luca wechselt zum Dashboard und sieht die aktualisierten Stats.
  8. Er wechselt zur Karte und sieht alle seine besuchten Stadien als grüne Punkte.
  9. Er öffnet die Bucket List und überprüft, welche Stadien er als nächstes besuchen möchte.

- **Mockup:** Ein klickbares Mockup wurde erstellt, das die vier Hauptscreens (Dashboard, Besuche, Bucket List, Karte) mit dem definierten Design-System zeigt. Das Mockup dient als visuelle Referenz für die Prototype-Phase.
  - _URL: [Figma-Link hier einfügen]_
  - Screenshots der vier Screens sind im Anhang verfügbar.

### 3.4 Prototype

#### 3.4.1. Entwurf (Design)

- **Informationsarchitektur:**

  Die App ist in vier gleichwertige Hauptbereiche unterteilt, erreichbar über eine fixierte Tab-Bar (unten auf Mobile, oben auf Desktop):

  | Tab | Funktion | Inhalt |
  |---|---|---|
  | Dashboard | Übersicht & Motivation | Stats (Stadien, Besuche, Länder, Win-Rate), Home/Away-Bar, nächster Besuch, Länder-Breakdown, letzte Besuche |
  | Besuche | Erfassen & Browsen | Formular zur Erfassung neuer Besuche, chronologische Liste aller Besuche mit W/D/L-Badges und Details |
  | Bucket List | Wunschliste verwalten | Stadien zur Bucket List hinzufügen, als besucht markieren, Kapazitäts-Info |
  | Karte | Geographische Visualisierung | Interaktive Europakarte mit farbcodierten Markern (Grün = besucht, Orange = Bucket List), Stadionliste |

  Die Navigation folgt dem bekannten Tab-Bar-Pattern (wie Instagram, Spotify). Jeder Tab ist eigenständig und hat keine verschachtelten Unterseiten — die Formulare öffnen sich inline innerhalb des jeweiligen Tabs.

- **User Interface Design:**

  Das Design folgt einem eigens entwickelten Design-System mit den Corporate-Farben Primary Green (#1D9E75), Accent Orange (#D85A30), Red (#E24B4A) und Gray (#888780). Die Typografie basiert auf DM Sans (Überschriften und Fliesstext) und JetBrains Mono (Badges, Countdowns, Code-Elemente).

  - **Dashboard-Screen:** Zeigt vier StatCards im 2×2-Grid (Stadien, Besuche, Länder, Win-Rate), eine Home/Away-Verteilungs-Bar, eine NextVisitCard mit Countdown zum nächsten geplanten Besuch, den Länder-Breakdown mit Besuchszahlen pro Land, und die vier neusten Besuche mit W/D/L-Badges.
  - **Besuche-Screen:** Header mit "+ Besuch erfassen"-Button, der ein inline-Formular öffnet. Darunter die chronologische Besuchsliste mit VisitCards (Spielinfo, Stadion, Datum, Home/Away-Badge, optionale Notiz).
  - **Bucket List-Screen:** Header mit "+ Stadion hinzufügen"-Button (Orange). Stadion-Karten mit Name, Ort, Kapazität und "Als besucht markieren"-Button.
  - **Karten-Screen:** Interaktive Europakarte mit grünen (besucht) und orangen (Bucket List) Markern. Klick auf Marker zeigt Tooltip. Darunter eine sortierte Stadionliste.

  _Screenshots der fertigen Screens: [Screenshots hier einfügen]_

**Designentscheide**

**Mobile-first** <br>
Die App wurde für Mobilgeräte (375–390px Breite) konzipiert, da Stadionbesuche hauptsächlich unterwegs erfasst werden. Ein Nutzer steht nach dem Spiel im Stadion und möchte den Besuch direkt auf dem Smartphone eintragen. Desktop wäre für diesen Use Case weniger praktisch.

**Navigation: Bottom Tab Bar** <br>
Statt einer Top-Menü-Navigation wurde eine **Bottom Tab Bar** mit 4 Tabs gewählt (Dashboard, Besuche, Bucket List, Karte). Begründung:
- Daumen-freundlich auf Mobilgeräten (erreichbar mit einer Hand)
- Alle Hauptbereiche sind jederzeit sichtbar und direkt erreichbar
- Entspricht dem bekannten Muster von iOS/Android-Apps (intuitiv)

**Farbsystem**
| Farbe | Hex | Verwendung |
|-------|-----|------------|
| Primary Green | `#1D9E75` | Aktive Elemente, Buttons, Erfolg (Win), aktiver Tab |
| Accent Orange | `#D85A30` | Sekundäre Buttons, Bucket-List-Badge, Away-Indikator |
| Gray | `#888780` | Inaktive Tabs, Labels, Sekundärtext |
| Red | `#E24B4A` | Loss-Indikator |
  <br>
  - **Logo:** Stadion von oben (ovale Form) mit Location-Pin in Orange auf dunklem Hintergrund mit grüner Umrandung. Tagline: "Track your ground".

#### 3.4.2. Umsetzung (Technik)

- **Technologie-Stack:**
  - **Frontend-Framework:** SvelteKit (mit HTML/CSS/JavaScript)
  - **Datenbank:** MongoDB (Anbindung gemäss Übungen im Modul)
  - **Karten-Bibliothek:** _[z. B. Leaflet.js oder SVG-basierte Eigenlösung — hier einfügen]_
  - **Fonts:** DM Sans (Google Fonts), JetBrains Mono (Google Fonts)
  - **Styling:** Eigenes CSS mit Custom Properties (CSS-Variablen für das Design-System)

- **Tooling:**
  - **IDE:** Visual Studio Code
  - **Erweiterungen:** Svelte for VS Code, Prettier, ESLint
  - **Versionsverwaltung:** Git & GitHub
  - **Deployment:** Netlify (Continuous Deployment via GitHub)
  - **Design:** Claude Design (für Mockup-Erstellung), Figma (für UI-Prototyping)
  - **KI-Tools:** Siehe Kapitel 6 (KI-Deklaration)

- **Struktur & Komponenten:**

  Die SvelteKit-Projektstruktur folgt dem Standard-Layout:

  ```
  STADIONTRACKER/
  ├── src/
  │   ├── lib/
  │   │   ├── assets/          # Favicon, Logo
  │   │   └── index.js         # Shared utilities
  │   ├── routes/
  │   │   ├── +layout.svelte   # Globales Layout mit Tab-Bar
  │   │   └── +page.svelte     # Hauptseite (oder pro Tab eine Route)
  │   └── app.html             # HTML-Template
  ├── static/
  │   └── robots.txt
  ├── doku/
  │   └── VORLAGE_README.md
  ├── package.json
  ├── svelte.config.js
  ├── vite.config.js
  └── README.md                # Diese Dokumentation
  ```

  **Wichtige Komponenten:**
  - `StatCard` — Wiederverwendbare Statistik-Karte (Icon, Label, Wert, optionaler Farbakzent)
  - `VisitCard` — Einzelner Besuchseintrag mit W/D/L-Badge, Spielinfo, Home/Away-Tag
  - `StadiumCard` — Bucket-List-Karte mit "Als besucht markieren"-Aktion
  - `NextVisitCard` — Hervorgehobene Karte für den nächsten geplanten Besuch mit Countdown
  - `TabBar` — Fixierte Navigation mit 4 Tabs (Dashboard, Besuche, Bucket List, Karte)
  - `MapMarker` — Grüner/Oranger Marker für die Kartenansicht
  - `CountryRow` — Zeile im Länder-Breakdown
  - `InputField` — Einheitliches Formular-Input-Element
  - `Button` — Varianten: primary-green, primary-orange, outline-green, danger

- **Daten & Schnittstellen:**

  Die Daten werden in einer MongoDB-Datenbank gespeichert. Es gibt zwei zentrale Collections:

  - **visits** — Enthält alle Stadionbesuche mit Feldern: Stadionname, Stadt, Land, Datum, Heimteam, Auswärtsteam, Heim-Tore, Auswärts-Tore, Home/Away, Notizen.
  - **bucketlist** — Enthält die Wunsch-Stadien mit: Stadionname, Stadt, Land, Kapazität, Koordinaten (Lat/Lng).

  Die Daten werden über SvelteKit Form Actions (Server-side) erstellt, gelesen und aktualisiert. Das Dashboard aggregiert die Daten aus der visits-Collection zur Anzeige der Statistiken.

- **Deployment:** _[Netlify-URL hier einfügen]_

- **Besondere Entscheidungen:**
  - **Inline-Formulare statt separate Seiten:** Die Formulare zur Erfassung von Besuchen und Bucket-List-Stadien öffnen sich inline per Toggle innerhalb des jeweiligen Tabs. Dies vermeidet Seitenwechsel und hält den Flow kompakt — besonders wichtig auf Mobile.
  - **Keine Authentifizierung:** Da der Prototyp für einen einzelnen Nutzer konzipiert ist, wurde bewusst auf Login/Registrierung verzichtet. Dies reduziert die Komplexität erheblich und ermöglicht die Fokussierung auf die Kernfunktionalität.
  - **Statische Karte vs. Leaflet:** _[Entscheidung hier dokumentieren, sobald getroffen — z. B. ob eine interaktive Leaflet-Karte oder eine SVG-basierte statische Karte verwendet wird]_
  - **Koordinaten manuell hinterlegt:** Für den Prototyp werden die Stadion-Koordinaten manuell in der Datenbank hinterlegt, statt eine Geocoding-API anzubinden. Dies ist für den Prototyp-Scope ausreichend.

### 3.5 Validate

_Die Evaluation findet in Woche 14 (18.–23. Mai 2026) statt. Bis zum 19.05.2026 muss eine deployete Version 1 für das Testing bereitstehen._

- **URL der getesteten Version:** _[URL hier einfügen nach Deployment]_

- **Ziele der Prüfung:**
  - Können Nutzende einen neuen Stadionbesuch innerhalb von 2 Minuten vollständig erfassen?
  - Ist die Karten-Visualisierung (Grün = besucht, Orange = Bucket List) ohne Erklärung verständlich?
  - Verstehen Nutzende die Funktion "Als besucht markieren" in der Bucket List?
  - Empfinden die Nutzenden das Dashboard als motivierend und informativ?
  - Welche Informationen fehlen oder sind überflüssig?

- **Vorgehen:** _[moderiert/unmoderiert; remote/on-site — nach Durchführung ausfüllen]_

- **Stichprobe:** _[Mit wem wurde getestet? Profil; Anzahl — nach Durchführung ausfüllen]_

- **Aufgaben/Szenarien:**
  - **Aufgabe 1:** "Du warst gestern im Letzigrund beim Spiel FC Zürich gegen FC Basel. Das Ergebnis war 2:1 für FCZ. Erfasse diesen Besuch in der App."
  - **Aufgabe 2:** "Du möchtest nächstes Jahr das Wembley Stadium in London besuchen. Füge es zu deiner Bucket List hinzu."
  - **Aufgabe 3:** "Du hast das Camp Nou nun endlich besucht. Markiere es als besucht."
  - **Aufgabe 4:** "Finde heraus, in wie vielen verschiedenen Ländern du schon Stadien besucht hast."
  - **Aufgabe 5:** "Schaue dir auf der Karte an, wo deine besuchten Stadien liegen. Finde das Stade Vélodrome."

- **Kennzahlen & Beobachtungen:** _[nach Durchführung ausfüllen — z. B. Erfolgsquote pro Aufgabe, Zeitbedarf, qualitative Findings]_

- **Zusammenfassung der Resultate:** _[nach Durchführung ausfüllen — 2–4 Sätze]_

- **Abgeleitete Verbesserungen:** _[nach Durchführung ausfüllen — priorisierte Liste mit Begründungen]_

## 4. Erweiterungen [Optional]

_Dieses Kapitel wird nach Abschluss der Prototype- und Validate-Phase ergänzt, falls Erweiterungen über den Mindestumfang hinaus implementiert werden._

> **Hinweis:** Jede Erweiterung ist separat nach dem folgenden Schema zu beschreiben.

### 4.1 _[Beispiel: Interaktive Karte mit Leaflet.js]_
- **Beschreibung & Nutzen:** _[nach Umsetzung ausfüllen]_
- **Wo umgesetzt:** _[nach Umsetzung ausfüllen]_
- **Referenz:** _[nach Umsetzung ausfüllen]_
- **Aus Evaluation abgeleitet?:** _[nach Evaluation ausfüllen]_

## 5. Projektorganisation [Optional]

- **Repository & Struktur:** Das Projekt wird in einem GitHub-Repository verwaltet. Die Dokumentation (README.md) liegt im Root-Verzeichnis. Der Sourcecode befindet sich im `src/`-Ordner, unterteilt in `lib/` (wiederverwendbare Module) und `routes/` (Seiten und Layouts). Das Repository ist für die Dozierenden zugänglich (Usernamen: mmeisterhans und bkuehnis).
  - _URL: [GitHub-Repository-URL hier einfügen]_

- **Issue-Management:** _[z. B. GitHub Issues für Bugs und Feature-Requests, oder einfach ein manuelles Tracking — nach Bedarf ausfüllen]_

- **Commit-Praxis:** Sprechende Commit-Messages in deutscher oder englischer Sprache, die beschreiben, was geändert wurde (z. B. "Dashboard StatCards implementiert", "Bucket List Formular hinzugefügt", "Fix: Win-Rate Berechnung korrigiert").

## 6. KI-Deklaration

### 6.1 KI-Tools

- **Eingesetzte Tools:**
  - **Claude (Anthropic):** Claude Opus / Sonnet via claude.ai — für Ideenfindung, Design-System-Entwicklung, Prompt-Erstellung, Dokumentation, Code-Unterstützung
  - **Claude Design:** Separates Tool zur Erstellung von UI-Mockups basierend auf einem detaillierten Design-Prompt
  - _[Weitere Tools hier ergänzen, falls verwendet, z. B. GitHub Copilot, ChatGPT, etc.]_

- **Zweck & Umfang:**
  - **Ideenfindung & Konzeption:** Claude wurde eingesetzt, um die HMW-Frage zu formulieren, Varianten in der Sketch-Phase zu entwickeln und die Entscheidungskriterien für die Decide-Phase zu strukturieren.
  - **Design-System:** Das vollständige Design-System (Farbpalette, Typografie, Spacing, Komponenten) wurde in Zusammenarbeit mit Claude erarbeitet und als detaillierter Design-Prompt dokumentiert (siehe `claude-design-prompt-stadium-tracker.md`).
  - **Mockup-Erstellung:** Ein 9-sektiger Design-Prompt (Projektübersicht, Design-System, Navigation, 4 Screen-Beschreibungen, Flows, Komponenten, Breakpoints, Barrierefreiheit, Erweiterungsideen) wurde für Claude Design erstellt, um pixelgenaue Mockups zu generieren.
  - **Dokumentation:** Die Projektdokumentation (README.md) wurde mit Claude-Unterstützung strukturiert und formuliert.
  - **Code-Unterstützung:** _[Hier beschreiben, in welchem Umfang KI bei der Code-Implementierung eingesetzt wurde — z. B. SvelteKit-Komponenten, CSS-Styling, MongoDB-Queries]_

- **Eigene Leistung (Abgrenzung):**
  - Die Problemanalyse, Zielgruppendefinition und persönliche Motivation für das Projekt stammen vollständig vom Autor.
  - Die Entscheidung für das Projekt "Stadium Tracker" (vs. alternativer Idee "Intelligenter Lernplaner") wurde eigenständig getroffen.
  - Die Sketch-Varianten wurden konzeptionell selbst erarbeitet; Claude hat bei der Ausformulierung und Strukturierung unterstützt.
  - Die Entscheidung für Variante C (Dashboard-zentriert) und die Verwerfung von Variante D (Social) basiert auf eigenem Urteil.
  - Das Design-System (Farbwahl, Logo-Konzept "Track your ground", Designsprache) wurde in iterativer Zusammenarbeit mit Claude entwickelt — die finalen Entscheidungen lagen beim Autor.
  - Die technische Implementierung in SvelteKit wurde _[eigenständig / mit KI-Unterstützung — genauer beschreiben]_ umgesetzt.
  - Die Usability-Evaluation wird eigenständig geplant, durchgeführt und ausgewertet.

### 6.2 Prompt-Vorgehen

Beim Prompting wurde ein iterativer Ansatz verfolgt:

1. **Projektkontext aufbauen:** Zu Beginn wurde Claude ein umfassender Projektkontext gegeben — Modul-Anforderungen, Bewertungskriterien, Zielgruppe, Semesterprogramm. Dieses Wissen wurde in einem Claude-Projekt als Knowledge-Base hinterlegt, sodass alle Folge-Prompts auf diesen Kontext zugreifen können.

2. **Schrittweises Vorgehen:** Statt eines einzelnen grossen Prompts wurde phasenweise gearbeitet — zuerst Ideenfindung, dann Sketch-Varianten, dann Design-System, dann Mockup-Prompt. Jeder Schritt baute auf dem vorherigen auf.

3. **Design-Prompt als zentrales Artefakt:** Der 9-sektige Design-Prompt (`claude-design-prompt-stadium-tracker.md`) ist das Kernstück der KI-Nutzung. Er beschreibt das gesamte UI in präziser, strukturierter Form — von Farbcodes über Pixel-Angaben bis zu Beispieldaten. Dieser Prompt wurde über mehrere Iterationen verfeinert und dient sowohl für Claude Design (Mockup) als auch als Referenz für die Code-Implementierung.

4. **Kritische Prüfung:** Alle KI-Outputs wurden kritisch geprüft und bei Bedarf angepasst. Insbesondere bei der Entscheidungsfindung (Sketch/Decide) wurden eigene Überlegungen gegenüber KI-Vorschlägen priorisiert.

### 6.3 Reflexion

**Nutzen:**
KI-Tools waren besonders wertvoll bei der Strukturierung und Formulierung umfangreicher Dokumente (Design-Prompt, Dokumentation), bei der systematischen Erarbeitung von Varianten und bei der konsistenten Anwendung des Design-Systems über alle Screens hinweg. Die Möglichkeit, ein Projekt mit Knowledge-Base in Claude anzulegen, war hilfreich, um den Kontext über viele Gespräche hinweg zu erhalten.

**Grenzen:**
Claude Design ist ein separates Tool ohne Zugriff auf das Claude-Projekt. Der Design-Prompt musste daher als eigenständiges, vollständiges Dokument erstellt werden, das keinen weiteren Kontext voraussetzt. Zudem kann KI keine echten Nutzerfeedbacks simulieren — die Usability-Evaluation muss mit realen Testpersonen durchgeführt werden.

**Risiken & Qualitätssicherung:**
Das grösste Risiko beim KI-Einsatz ist die "Übernahme" von generierten Inhalten ohne kritische Reflexion. Um dem entgegenzuwirken, wurden alle generierten Varianten und Entscheidungen explizit begründet und hinterfragt. Technischer Code wurde getestet und nicht blind übernommen. Die Verantwortung für Korrektheit, Urheberrecht und Qualität liegt vollständig beim Autor.

## 7. Anhang [Optional]

- **Quellen & Referenzen:**
  - Polarsteps (https://www.polarsteps.com) — Referenz-App für Reise-Tracking-Konzept
  - DM Sans Font (Google Fonts) — Hauptschrift
  - JetBrains Mono Font (Google Fonts) — Monospace-Schrift für Badges
  - Stadium Tracker Logo — Eigenentwicklung (Stadion von oben + Location-Pin)

- **Projektartefakte:**
  - `claude-design-prompt-stadium-tracker.md` — Vollständiger Design-Prompt für Claude Design (9 Sektionen)
  - `stadium_tracker_logo.png` — Logo der App
  - Figma-Mockup: _[URL hier einfügen]_

- **Testskript & Materialien:** _[nach Evaluation ergänzen — Link/Datei]_

- **Rohdaten/Auswertung:** _[nach Evaluation ergänzen — Link/Datei]_