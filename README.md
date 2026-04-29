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
  - **Dashboard:** Gesamtübersicht mit Statistiken (Anzahl Stadien, Besuche, Länder, Win-Rate), W/D/L-Bilanz, Länder-Breakdown und den letzten Besuchen.
  - **Besuche erfassen & verwalten:** Formular zur Erfassung neuer Stadionbesuche mit Stadion, Stadt, Land, Datum, Teams, Ergebnis und optionalen Notizen. Chronologische Liste aller bisherigen Besuche mit Löschen-Funktion.
  - **Bucket List:** _(geplant)_ Wunsch-Stadien mit Name, Stadt, Land und Kapazität hinzufügen. Stadien können als "besucht" markiert werden und wechseln dann in die Besuchshistorie.
  - **Interaktive Karte:** _(geplant)_ Europakarte mit farbcodierten Markern — Grün für besuchte Stadien, Orange für Bucket-List-Stadien. Klick auf einen Marker zeigt Details im Tooltip.

- **Annahmen [Optional]:**
  - Fussballfans möchten ihre Stadionbesuche aktiv dokumentieren und nicht nur in Erinnerungen behalten.
  - Eine visuelle Darstellung auf einer Karte motiviert Fans, weitere Stadien zu besuchen.
  - Die Kombination aus Tracking und Bucket List erzeugt einen "Sammel-Effekt", der zur regelmässigen Nutzung anregt.

- **Abgrenzung [Optional]:**
  - Kein Social/Sharing-Feature (Login, öffentliche Profile, Besuche anderer User finden) — bewusst verworfen wegen Scope und Zeitrahmen des Prototyps (siehe Sketch-Phase, Variante D).
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
  3. Er sieht die W/D/L-Bilanz und die letzten Besuche.
  4. Luca wechselt zum Tab "Besuche" und tippt auf "+ Neuer Besuch".
  5. Er gibt das Stadion (Letzigrund), Stadt (Zürich), Land (Schweiz), Datum, Teams (FC Zürich vs. FC Basel), Ergebnis (2:1) und eine Notiz ein.
  6. Klick auf "Besuch speichern" — eine Erfolgsmeldung erscheint und der neue Besuch erscheint oben in der Liste.
  7. Luca wechselt zum Dashboard und sieht die aktualisierten Stats.

- **Mockup:** Ein klickbares Mockup wurde erstellt, das die vier Hauptscreens (Dashboard, Besuche, Bucket List, Karte) mit dem definierten Design-System zeigt. Das Mockup dient als visuelle Referenz für die Prototype-Phase.
  - _URL: [Figma-Link hier einfügen]_

### 3.4 Prototype

#### 3.4.1. Entwurf (Design)

- **Informationsarchitektur:**

  Die App ist in vier gleichwertige Hauptbereiche unterteilt, erreichbar über eine fixierte Tab-Bar (unten auf Mobile, oben auf Desktop):

  | Tab | Funktion | Inhalt |
  |---|---|---|
  | Dashboard | Übersicht & Motivation | Stats (Stadien, Besuche, Länder, Win-Rate), W/D/L-Bilanz, Länder-Breakdown, letzte Besuche |
  | Besuche | Erfassen & Browsen | Formular zur Erfassung neuer Besuche, chronologische Liste aller Besuche mit W/D/L-Badges |
  | Bucket List | Wunschliste verwalten | _(geplant)_ Stadien zur Bucket List hinzufügen, als besucht markieren |
  | Karte | Geographische Visualisierung | _(geplant)_ Interaktive Karte mit farbcodierten Markern |

  Die Navigation folgt dem bekannten Tab-Bar-Pattern (wie Instagram, Spotify). Jeder Tab ist eigenständig und hat keine verschachtelten Unterseiten — die Formulare öffnen sich inline innerhalb des jeweiligen Tabs.

- **User Interface Design:**

  Das Design folgt einem eigens entwickelten Design-System mit den Corporate-Farben Primary Green (#1D9E75), Accent Orange (#D85A30), Red (#E24B4A) und Gray (#888780). Die Typografie basiert auf DM Sans (Überschriften und Fliesstext) und JetBrains Mono (Badges, Scores).

  _Screenshots der fertigen Screens: [Screenshots hier einfügen]_

- **Designentscheidungen:**

  **Mobile-first:** Die App wurde für Mobilgeräte (375–390px Breite) konzipiert, da Stadionbesuche hauptsächlich unterwegs erfasst werden. Desktop wird unterstützt mit einer maximalen Content-Breite von 720px.

  **Navigation: Bottom Tab Bar:** Statt einer Top-Menü-Navigation wurde eine Bottom Tab Bar mit 4 Tabs gewählt. Begründung: Daumen-freundlich auf Mobilgeräten, alle Hauptbereiche jederzeit sichtbar und direkt erreichbar, und entspricht dem bekannten Muster von iOS/Android-Apps.

  **Farbsystem:**

  | Farbe | Hex | Verwendung |
  |-------|-----|------------|
  | Primary Green | `#1D9E75` | Aktive Elemente, Buttons, Siege (W), aktiver Tab |
  | Accent Orange | `#D85A30` | Bucket-List-Badge, Away-Indikator |
  | Gray | `#888780` | Inaktive Tabs, Labels, Unentschieden (D) |
  | Red | `#E24B4A` | Niederlagen (L), Lösch-Aktionen |

  **Logo:** Stadion von oben (ovale Form) mit Location-Pin in Orange auf dunklem Hintergrund mit grüner Umrandung. Tagline: "Track your ground".

#### 3.4.2. Umsetzung (Technik)

- **Technologie-Stack:**
  - **Frontend-Framework:** SvelteKit (Svelte 5 mit Runes-Modus) — HTML/CSS/JavaScript
  - **Datenbank:** MongoDB Atlas (Free Tier, Cloud-hosted) mit der `mongodb` Node.js Library
  - **Fonts:** DM Sans und JetBrains Mono (Google Fonts)
  - **Styling:** Eigenes CSS mit Scoped Styles pro Komponente (kein CSS-Framework wie Bootstrap)

- **Tooling:**
  - **IDE:** Visual Studio Code mit Svelte-Extension
  - **Versionsverwaltung:** Git & GitHub
  - **Deployment:** Netlify (Continuous Deployment via GitHub, `@sveltejs/adapter-netlify`)
  - **Design:** Claude Design (für Mockup-Erstellung), Figma (für UI-Prototyping)
  - **KI-Tools:** Siehe Kapitel 6 (KI-Deklaration)

- **Struktur & Komponenten:**

  ```
  StadionTracker/
  ├── src/
  │   ├── lib/
  │   │   ├── components/
  │   │   │   └── VisitCard.svelte    # Wiederverwendbare Besuchskarte
  │   │   ├── assets/
  │   │   │   └── stadium_tracker_*   # Logo-Dateien
  │   │   ├── db.js                   # MongoDB-Verbindung
  │   │   └── index.js
  │   ├── routes/
  │   │   ├── +layout.svelte          # Globales Layout
  │   │   ├── +page.svelte            # Dashboard (Startseite)
  │   │   ├── +page.server.js         # Dashboard Server-Logik
  │   │   └── besuche/
  │   │       ├── +page.svelte        # Besuche-Seite (Liste + Formular)
  │   │       └── +page.server.js     # Besuche CRUD-Operationen
  │   └── app.html
  ├── doku/
  │   ├── Mockups/
  │   ├── README.md
  │   └── VORLAGE_README.md
  ├── .env                            # MongoDB Connection String (nicht im Repo)
  ├── svelte.config.js                # Netlify-Adapter konfiguriert
  ├── package.json
  └── README.md
  ```

  **Wiederverwendbare Komponenten:**

  - **`VisitCard.svelte`** — Die zentrale wiederverwendbare Komponente des Projekts. Sie zeigt einen einzelnen Stadionbesuch mit W/D/L-Badge, Stadionname, Ort, Spielergebnis, Datum, optionalen Notizen und einem Löschen-Button. Die Komponente akzeptiert drei Props: `visit` (Besuchsdaten), `showDelete` (steuert den Löschen-Button) und `compact` (kompakte Variante für das Dashboard). Die Entscheidung, die VisitCard als Komponente auszulagern, wurde getroffen, weil der gleiche Besuchseintrag an zwei Stellen verwendet wird — auf der Besuche-Seite als vollständige Karte mit Löschen-Funktion und auf dem Dashboard als kompakte Vorschau der letzten Besuche. Ohne Komponente wäre der Code für Badge-Logik, Datumsformatierung und Styling doppelt vorhanden gewesen. Durch die Props `showDelete` und `compact` kann dieselbe Komponente flexibel in beiden Kontexten eingesetzt werden.

  _(Weitere Komponenten wie TabBar, StatCard, StadiumCard werden in der nächsten Entwicklungsphase als eigenständige Komponenten ausgelagert.)_

- **Daten & Schnittstellen:**

  Die Daten werden in einer MongoDB Atlas Datenbank (Cluster: `cluster0.v3hjcar.mongodb.net`, Datenbank: `stadiontracker`) gespeichert. Aktuell gibt es eine Collection:

  - **visits** — Enthält alle Stadionbesuche mit folgender Dokumentstruktur:
    ```json
    {
      "_id": "ObjectId (automatisch generiert)",
      "stadium": "Signal Iduna Park",
      "city": "Dortmund",
      "country": "Deutschland",
      "homeTeam": "Borussia Dortmund",
      "awayTeam": "FC Bayern München",
      "scoreHome": 3,
      "scoreAway": 1,
      "date": "2024-09-14",
      "notes": "Gelbe Wand war unglaublich laut!",
      "createdAt": "2024-09-14T20:00:00Z"
    }
    ```

  Die Daten werden über SvelteKit Form Actions (Server-side) verwaltet. Die `+page.server.js`-Dateien enthalten `load()`-Funktionen zum Laden der Daten und `actions` für Create- und Delete-Operationen. Das Dashboard aggregiert die Daten aus der visits-Collection serverseitig zur Berechnung der Statistiken (unique Stadien, Länder, Win-Rate, W/D/L-Bilanz, Länder-Breakdown).

  Der MongoDB Connection String wird als Environment Variable (`MONGODB_URI`) gespeichert — lokal in der `.env`-Datei (nicht im Repository) und auf Netlify als Environment Variable konfiguriert. Die Datenbankverbindung wird in `src/lib/db.js` zentral hergestellt und in allen Server-Routen importiert.

- **Deployment:** Die App ist deployt auf Netlify: _[stadiontracker.netlify.app — URL hier bestätigen]_

- **Besondere Entscheidungen:**
  - **Svelte 5 Runes-Modus:** Das Projekt verwendet Svelte 5 mit dem neuen Runes-Modus (`$props()`, `$state()`, `$effect()`, `onclick` statt `on:click`). Dies erforderte Anpassungen gegenüber der gängigen Svelte-4-Syntax, bietet aber eine modernere und explizitere Reaktivität.
  - **Eigenes CSS statt Bootstrap:** Obwohl Bootstrap im Modul behandelt wurde, wurde bewusst auf eigenes CSS mit Scoped Styles gesetzt. Begründung: Das eigene Design-System mit spezifischen Farben, Radien und Typografie hätte ständige Bootstrap-Overrides erfordert. Svelte's Scoped Styles (CSS pro Komponente) sind für diesen Ansatz besser geeignet.
  - **Inline-Formulare statt separate Seiten:** Die Formulare zur Erfassung von Besuchen öffnen sich inline per Toggle innerhalb des jeweiligen Tabs. Dies vermeidet Seitenwechsel und hält den Flow kompakt — besonders wichtig auf Mobile.
  - **Keine Authentifizierung:** Da der Prototyp für einen einzelnen Nutzer konzipiert ist, wurde bewusst auf Login/Registrierung verzichtet. Dies reduziert die Komplexität erheblich und ermöglicht die Fokussierung auf die Kernfunktionalität.
  - **Network Access 0.0.0.0/0:** Für MongoDB Atlas wurde der Zugriff von allen IP-Adressen erlaubt, da Netlify keine feste IP hat. Für einen Prototyp ist dies akzeptabel.

### 3.5 Validate

_Die Evaluation findet in Woche 14 (18.–23. Mai 2026) statt. Bis zum 19.05.2026 muss eine deployete Version 1 für das Testing bereitstehen._

- **URL der getesteten Version:** _[URL hier einfügen nach Deployment]_

- **Ziele der Prüfung:**
  - Können Nutzende einen neuen Stadionbesuch innerhalb von 2 Minuten vollständig erfassen?
  - Ist die W/D/L-Badge-Logik (Sieg/Unentschieden/Niederlage) ohne Erklärung verständlich?
  - Empfinden die Nutzenden das Dashboard als motivierend und informativ?
  - Ist die Navigation zwischen Dashboard und Besuche intuitiv?
  - Welche Informationen fehlen oder sind überflüssig?

- **Vorgehen:** _[nach Durchführung ausfüllen]_

- **Stichprobe:** _[nach Durchführung ausfüllen]_

- **Aufgaben/Szenarien:**
  - **Aufgabe 1:** "Du warst gestern im Letzigrund beim Spiel FC Zürich gegen FC Basel. Das Ergebnis war 2:1 für FCZ. Erfasse diesen Besuch in der App."
  - **Aufgabe 2:** "Finde heraus, in wie vielen verschiedenen Ländern du schon Stadien besucht hast."
  - **Aufgabe 3:** "Lösche einen bestehenden Besuch aus der Liste."
  - **Aufgabe 4:** "Schaue dir auf dem Dashboard an, wie deine Gesamtbilanz (Siege/Unentschieden/Niederlagen) aussieht."

- **Kennzahlen & Beobachtungen:** _[nach Durchführung ausfüllen]_

- **Zusammenfassung der Resultate:** _[nach Durchführung ausfüllen]_

- **Abgeleitete Verbesserungen:** _[nach Durchführung ausfüllen]_

## 4. Erweiterungen [Optional]

_Dieses Kapitel wird nach Abschluss der Prototype- und Validate-Phase ergänzt, falls Erweiterungen über den Mindestumfang hinaus implementiert werden._

> **Hinweis:** Jede Erweiterung ist separat nach dem folgenden Schema zu beschreiben.

### 4.1 Dashboard mit Statistiken
- **Beschreibung & Nutzen:** Die Startseite zeigt eine Gesamtübersicht mit vier Statistik-Karten (Stadien, Besuche, Länder, Win-Rate), einer W/D/L-Bilanz als Fortschrittsbalken, einem Länder-Breakdown und den letzten 5 Besuchen. Dies gibt dem Nutzer sofortige Orientierung und Motivation.
- **Wo umgesetzt:**
  - **Frontend:** `src/routes/+page.svelte` — Stats-Grid, W/D/L-Bar, Länder-Liste, letzte Besuche mit VisitCard-Komponente
  - **Backend:** `src/routes/+page.server.js` — Serverseitige Aggregation der Statistiken aus der visits-Collection (unique Sets für Stadien/Länder, Win/Draw/Loss-Zählung)
  - **Datenbank:** MongoDB-Queries mit `.find()`, Aggregation in JavaScript
- **Referenz:** Screenshot Dashboard in Kap. 3.4.1
- **Aus Evaluation abgeleitet?:** Nein, war von Beginn an als Kern-Feature geplant.

### 4.2 VisitCard als wiederverwendbare Komponente
- **Beschreibung & Nutzen:** Die Darstellung eines einzelnen Stadionbesuchs wurde als eigenständige Svelte-Komponente (`VisitCard.svelte`) ausgelagert. Sie wird sowohl auf der Besuche-Seite (mit Löschen-Button) als auch auf dem Dashboard (kompakte Variante ohne Löschen) verwendet. Dies vermeidet Code-Duplikation und stellt ein konsistentes Erscheinungsbild sicher.
- **Wo umgesetzt:**
  - **Komponente:** `src/lib/components/VisitCard.svelte` — Props: `visit`, `showDelete`, `compact`
  - **Verwendung:** `src/routes/+page.svelte` (Dashboard) und `src/routes/besuche/+page.svelte` (Besuche-Seite)
- **Referenz:** Beschreibung in Kap. 3.4.2 (Struktur & Komponenten)
- **Aus Evaluation abgeleitet?:** Nein, Entscheidung aus Code-Qualitätsgründen.

## 5. Projektorganisation [Optional]

- **Repository & Struktur:** Das Projekt wird in einem GitHub-Repository verwaltet. Die Dokumentation (README.md) liegt im Root-Verzeichnis. Der Sourcecode befindet sich im `src/`-Ordner, unterteilt in `lib/` (wiederverwendbare Module und Komponenten) und `routes/` (Seiten und Server-Logik). Das Repository ist für die Dozierenden zugänglich (Usernamen: mmeisterhans und bkuehnis).
  - _URL: [GitHub-Repository-URL hier einfügen]_

- **Commit-Praxis:** Sprechende Commit-Messages in deutscher Sprache, die beschreiben, was geändert wurde. Beispiele bisheriger Commits:
  - "Übung 11: Hauptworkflow Besuche (CRUD), MongoDB-Anbindung, Netlify-Deployment"
  - "Passwort-Datei entfernt, gitignore aktualisiert"
  - "VisitCard-Komponente erstellt und in Besuche + Dashboard integriert"

## 6. KI-Deklaration

### 6.1 KI-Tools

- **Eingesetzte Tools:**
  - **Claude (Anthropic):** Claude Opus / Sonnet via claude.ai — für Ideenfindung, Design-System-Entwicklung, Prompt-Erstellung, Dokumentation, Code-Unterstützung und Debugging
  - **Claude Design:** Separates Tool zur Erstellung von UI-Mockups basierend auf einem detaillierten Design-Prompt
  - **Claude Copilot (VS Code):** Für Code-Generierung direkt in der IDE, z. B. Erstellung der VisitCard-Komponente anhand eines vorbereiteten Prompts
  - _[Weitere Tools hier ergänzen, falls verwendet, z. B. GitHub Copilot, ChatGPT, etc.]_

- **Zweck & Umfang:**
  - **Ideenfindung & Konzeption:** Claude wurde eingesetzt, um die HMW-Frage zu formulieren, Varianten in der Sketch-Phase zu entwickeln und die Entscheidungskriterien für die Decide-Phase zu strukturieren.
  - **Design-System:** Das vollständige Design-System (Farbpalette, Typografie, Spacing, Komponenten) wurde in Zusammenarbeit mit Claude erarbeitet und als detaillierter Design-Prompt dokumentiert (siehe `claude-design-prompt-stadium-tracker.md`).
  - **Mockup-Erstellung:** Ein 9-sektiger Design-Prompt wurde für Claude Design erstellt, um Mockups zu generieren.
  - **Dokumentation:** Die Projektdokumentation (README.md) wurde mit Claude-Unterstützung strukturiert und formuliert.
  - **Code-Implementierung:** Claude hat die initialen SvelteKit-Dateien für den Hauptworkflow erstellt (Besuche-Seite mit Formular und Server-Logik, Dashboard mit Statistiken, MongoDB-Verbindung). Der Code wurde anschliessend manuell angepasst und getestet. Für die VisitCard-Komponente wurde ein detaillierter Prompt in Claude erstellt und dann via Claude Copilot in VS Code umgesetzt.
  - **Debugging:** Claude hat bei der Fehlerbehebung unterstützt, z. B. Svelte 4 → Svelte 5 Runes-Migration (`export let` → `$props()`, `on:click` → `onclick`, `$:` → `$effect()`), falsches Arbeitsverzeichnis im Terminal, und Netlify-Deployment-Konfiguration.

- **Eigene Leistung (Abgrenzung):**
  - Die Problemanalyse, Zielgruppendefinition und persönliche Motivation für das Projekt stammen vollständig vom Autor.
  - Die Entscheidung für das Projekt "Stadium Tracker" (vs. alternativer Idee "Intelligenter Lernplaner") wurde eigenständig getroffen.
  - Die Sketch-Varianten wurden konzeptionell selbst erarbeitet; Claude hat bei der Ausformulierung und Strukturierung unterstützt.
  - Die Entscheidung für Variante C (Dashboard-zentriert) und die Verwerfung von Variante D (Social) basiert auf eigenem Urteil.
  - Das Design-System (Farbwahl, Logo-Konzept "Track your ground") wurde in iterativer Zusammenarbeit mit Claude entwickelt — die finalen Entscheidungen lagen beim Autor.
  - Setup und Konfiguration (GitHub-Repository, MongoDB Atlas, Netlify-Deployment, Environment Variables) wurden eigenständig durchgeführt, mit Anleitungen von Claude.
  - Code wurde von Claude generiert, aber manuell in die IDE übertragen, getestet und bei Bedarf angepasst (z. B. Svelte 5 Fixes).
  - Die Usability-Evaluation wird eigenständig geplant, durchgeführt und ausgewertet.

### 6.2 Prompt-Vorgehen

Beim Prompting wurde ein iterativer Ansatz verfolgt:

1. **Projektkontext aufbauen:** Zu Beginn wurde Claude ein umfassender Projektkontext gegeben — Modul-Anforderungen, Bewertungskriterien, Zielgruppe, Semesterprogramm. Dieses Wissen wurde in einem Claude-Projekt als Knowledge-Base hinterlegt, sodass alle Folge-Prompts auf diesen Kontext zugreifen können.

2. **Schrittweises Vorgehen:** Statt eines einzelnen grossen Prompts wurde phasenweise gearbeitet — zuerst Ideenfindung, dann Sketch-Varianten, dann Design-System, dann Mockup-Prompt, dann Code-Implementierung. Jeder Schritt baute auf dem vorherigen auf.

3. **Design-Prompt als zentrales Artefakt:** Der 9-sektige Design-Prompt (`claude-design-prompt-stadium-tracker.md`) beschreibt das gesamte UI in präziser, strukturierter Form — von Farbcodes über Pixel-Angaben bis zu Beispieldaten. Dieser Prompt wurde über mehrere Iterationen verfeinert.

4. **Gezielte Prompts für Copilot:** Für die VisitCard-Komponente wurde ein separater, detaillierter Prompt geschrieben, der dem Claude Copilot in VS Code exakt vorgibt, welche Datei zu erstellen ist, welche Props die Komponente hat, welche Svelte-5-Syntax zu verwenden ist, und welche bestehenden Dateien umgebaut werden müssen. Dieser Ansatz hat sich als effektiver erwiesen als generische Prompts.

5. **Kritische Prüfung:** Alle KI-Outputs wurden kritisch geprüft und bei Bedarf angepasst. Insbesondere musste generierter Svelte-Code von Svelte-4-Syntax auf Svelte-5-Runes umgeschrieben werden.

### 6.3 Reflexion

**Nutzen:**
KI-Tools waren besonders wertvoll bei der Strukturierung umfangreicher Dokumente, bei der Code-Generierung für repetitive Aufgaben (CRUD-Operationen, CSS-Styling), und beim Debugging. Die Möglichkeit, ein Projekt mit Knowledge-Base in Claude anzulegen, war hilfreich, um den Kontext über viele Gespräche hinweg zu erhalten. Der detaillierte Prompt für den Copilot hat gezeigt, dass präzise Vorgaben zu deutlich besserem Output führen als vage Anweisungen.

**Grenzen:**
Claude generierte initial Svelte-4-Code, obwohl das Projekt Svelte 5 mit Runes verwendet. Dies erforderte manuelle Nacharbeit (`export let` → `$props()`, `on:click` → `onclick`, `$:` → `$effect()`). Claude Design ist ein separates Tool ohne Zugriff auf das Claude-Projekt — der Design-Prompt musste daher als eigenständiges, vollständiges Dokument erstellt werden. Zudem kann KI keine echten Nutzerfeedbacks simulieren — die Usability-Evaluation muss mit realen Testpersonen durchgeführt werden.

**Risiken & Qualitätssicherung:**
Das grösste Risiko beim KI-Einsatz ist die Übernahme von generierten Inhalten ohne kritische Reflexion. Um dem entgegenzuwirken, wurden alle generierten Varianten und Entscheidungen explizit begründet und hinterfragt. Technischer Code wurde lokal getestet und nicht blind übernommen — mehrere Svelte-5-Inkompatibilitäten wurden so entdeckt und behoben. Die Verantwortung für Korrektheit, Urheberrecht und Qualität liegt vollständig beim Autor.

## 7. Anhang [Optional]

- **Quellen & Referenzen:**
  - Polarsteps (https://www.polarsteps.com) — Referenz-App für Reise-Tracking-Konzept
  - DM Sans Font (Google Fonts) — Hauptschrift
  - JetBrains Mono Font (Google Fonts) — Monospace-Schrift für Badges
  - Stadium Tracker Logo — Eigenentwicklung (Stadion von oben + Location-Pin)

- **Projektartefakte:**
  - `claude-design-prompt-stadium-tracker.md` — Vollständiger Design-Prompt für Claude Design (9 Sektionen)
  - `stadium_tracker_logo.png` — Logo der App
  - `prompt_visitcard_komponente.md` — Detaillierter Prompt für die VisitCard-Komponentenerstellung via Copilot
  - Figma-Mockup: _[URL hier einfügen]_

- **Testskript & Materialien:** _[nach Evaluation ergänzen — Link/Datei]_

- **Rohdaten/Auswertung:** _[nach Evaluation ergänzen — Link/Datei]_