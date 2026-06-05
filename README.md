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
  - **Dashboard:** Gesamtübersicht mit Statistiken (Anzahl Stadien, Besuche, Länder), Länder-Breakdown, Lieblingsclubs-Sektion mit W/D/L-Bilanz und Win-Rate pro Club sowie den letzten Besuchen.
  - **Besuche erfassen & verwalten:** Formular zur Erfassung neuer Stadionbesuche mit Stadion, Stadt, Land, Datum, Teams, Ergebnis und optionalen Notizen. Chronologische Liste aller bisherigen Besuche mit Löschen-Funktion.
  - **Bucket List:** _(geplant)_ Wunsch-Stadien mit Name, Stadt, Land und Kapazität hinzufügen. Stadien können als "besucht" markiert werden und wechseln dann in die Besuchshistorie.
  - **Interaktive Karte:** Europakarte mit farbcodierten CircleMarkern — Grün für besuchte Stadien, Orange für Bucket-List-Stadien. Klick auf einen Marker öffnet einen Tooltip mit Stadionname und Ort. Eine scrollbare Stadionliste unterhalb der Karte erlaubt Navigation per Klick (flyTo auf den Marker). Mehrfach besuchte Stadien werden als ein Marker mit Besuchszähler dargestellt.

- **Annahmen [Optional]:**
  - Fussballfans möchten ihre Stadionbesuche aktiv dokumentieren und nicht nur in Erinnerungen behalten.
  - Eine visuelle Darstellung auf einer Karte motiviert Fans, weitere Stadien zu besuchen.
  - Die Kombination aus Tracking und Bucket List erzeugt einen "Sammel-Effekt", der zur regelmässigen Nutzung anregt.

- **Abgrenzung [Optional]:**
  - Kein Social/Sharing-Feature (Login, öffentliche Profile, Besuche anderer User finden) — bewusst verworfen wegen Scope und Zeitrahmen des Prototyps (siehe Sketch-Phase, Variante D).
  - Keine globale Win-Rate über alle Spiele — bewusst entfernt, da eine Win-Rate ohne Teamkontext inhaltlich sinnlos ist (ein "W" bedeutet je nach Fan-Zugehörigkeit etwas anderes). Die Win-Rate wird stattdessen pro Lieblingsclub angezeigt (siehe Erweiterung 4.4).
  - Kein globales W/D/L-Badge auf einzelnen Besuchen — entfernt, da W/D/L nur im Kontext eines Lieblingsclubs aussagekräftig ist. Die Badges bleiben als Komponente erhalten und werden pro Club in der `FavoriteClubCard` verwendet.
  - Keine Stadion-Detailseite mit Fotos und Bewertungen.
  - Keine Filter- und Suchfunktion für Besuche (z. B. nach Land, Ergebnis, Zeitraum) — als Erweiterung geplant.
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
  2. Das Dashboard zeigt ihm seine aktuellen Statistiken: 6 Stadien besucht, 8 Besuche, 3 Länder sowie die W/D/L-Bilanz seiner Lieblingsclubs.
  3. Er sieht die Lieblingsclubs-Sektion mit Win-Rate pro Club und die letzten Besuche.
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
  | Dashboard | Übersicht & Motivation | Stats (Stadien, Besuche, Länder), Lieblingsclubs mit W/D/L-Bilanz und Win-Rate pro Club, Länder-Breakdown, letzte Besuche |
  | Besuche | Erfassen & Browsen | Formular zur Erfassung neuer Besuche, chronologische Liste aller Besuche mit W/D/L-Badges |
  | Bucket List | Wunschliste verwalten | _(geplant)_ Stadien zur Bucket List hinzufügen, als besucht markieren |
  | Karte | Geographische Visualisierung | Interaktive Leaflet-Karte, CircleMarker (Grün = besucht, Orange = Bucket List), Tooltip bei Marker-Klick, Stadionliste mit flyTo-Navigation, Legende |

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
  - **Kartenbibliothek:** Leaflet.js (v1.x) — clientseitige interaktive Karte mit OpenStreetMap-Tiles
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
  │   │   ├── besuche/
  │   │   │   ├── +page.svelte        # Besuche-Seite (Liste + Formular)
  │   │   │   └── +page.server.js     # Besuche CRUD-Operationen
  │   │   ├── bucket-list/
  │   │   │   ├── +page.svelte        # Bucket-List-Seite
  │   │   │   └── +page.server.js     # Bucket-List CRUD-Operationen
  │   │   └── karte/
  │   │       ├── +page.svelte        # Leaflet-Karte (nur client-seitig)
  │   │       └── +page.server.js     # Aggregation visits + bucket_list mit Koordinaten
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

  - **`VisitCard.svelte`** — Die zentrale wiederverwendbare Komponente des Projekts. Sie zeigt einen einzelnen Stadionbesuch mit Stadionname, Ort, Spielergebnis, Datum, optionalen Notizen, Bearbeiten- und Löschen-Button. Die Komponente akzeptiert drei Props: `visit` (Besuchsdaten), `showDelete` (steuert den Löschen-Button) und `compact` (kompakte Variante für das Dashboard). **Designentscheidung:** Das W/D/L-Badge wurde bewusst aus der `VisitCard` entfernt, da ein Ergebnis-Badge ohne Teamkontext keine Aussagekraft hat — ein "W" bedeutet je nach Fan-Zugehörigkeit etwas anderes. Der Badge-Code bleibt in der Komponente erhalten (als `ResultBadge.svelte`), wird aber nur noch in der `FavoriteClubCard` verwendet.

  - **`FavoriteClubCard.svelte`** — Zeigt einen einzelnen Lieblingsclub mit W/D/L-Bilanz und Win-Rate-Balken. Props: `club` (Objekt mit `name`, `shortName`, `stadiumName`, `totalGames`, `wins`, `draws`, `losses`, `winRate`). Die Win-Rate ist hier sinnvoll, weil sie sich auf einen konkreten Club bezieht — alle Spiele, bei denen dieser Club mitgespielt hat, werden gezählt. Die Farbe des Prozentwerts ist dynamisch: grün bei ≥50%, rot bei <50%.

  _(Weitere Komponenten wie TabBar, StatCard, StadiumCard wurden ebenfalls als eigenständige Komponenten ausgelagert.)_

- **Daten & Schnittstellen:**

  Die Daten werden in einer MongoDB Atlas Datenbank (Cluster: `cluster0.v3hjcar.mongodb.net`, Datenbank: `stadiontracker`) gespeichert. Die Datenbank ist in drei Collections aufgeteilt, wobei `visits` und `bucket_list` über eine Fremdschlüsselbeziehung (`stadiumId`) auf die `stadiums`-Collection referenzieren (normalisiertes Schema):

  **Datenbankschema (Entity-Relationship-Diagramm):**

  ```mermaid
  erDiagram
      STADIUMS {
          ObjectId _id PK
          string Name
          string Town
          string Nation
          number Capacity
          number Latitude
          number Longitude
      }

      VISITS {
          ObjectId _id PK
          ObjectId stadiumId FK
          string homeTeam
          string awayTeam
          number scoreHome
          number scoreAway
          string result
          boolean isHome
          string date
          string notes
          date createdAt
      }

      BUCKET_LIST {
          ObjectId _id PK
          ObjectId stadiumId FK
          date addedAt
      }

      FAVORITE_CLUBS {
          ObjectId _id PK
          string name
          string shortName
          ObjectId stadiumId FK
          date addedAt
      }

      STADIUMS ||--o{ VISITS : "has"
      STADIUMS ||--o{ BUCKET_LIST : "is on"
      STADIUMS ||--o| FAVORITE_CLUBS : "home of"
  ```

  **Collections im Detail:**

  - **stadiums** — Referenz-Collection für alle Stadien. Wird beim Erfassen eines Besuchs angelegt oder wiederverwendet, falls das Stadion bereits existiert.
    ```json
    {
      "_id": "ObjectId (automatisch generiert)",
      "Name": "Signal Iduna Park",
      "Town": "Dortmund",
      "Nation": "Deutschland",
      "Capacity": 81365,
      "Latitude": 51.4926,
      "Longitude": 7.4519
    }
    ```

  - **visits** — Enthält alle Stadionbesuche. Referenziert das zugehörige Stadion via `stadiumId`.
    ```json
    {
      "_id": "ObjectId (automatisch generiert)",
      "stadiumId": "ObjectId (Referenz auf stadiums._id)",
      "homeTeam": "Borussia Dortmund",
      "awayTeam": "FC Bayern München",
      "scoreHome": 3,
      "scoreAway": 1,
      "result": "W",
      "isHome": false,
      "date": "2024-09-14",
      "notes": "Gelbe Wand war unglaublich laut!",
      "createdAt": "2024-09-14T20:00:00.000Z"
    }
    ```

  - **bucket_list** — Wunsch-Stadien des Nutzers. Referenziert das gewünschte Stadion via `stadiumId`.
    ```json
    {
      "_id": "ObjectId (automatisch generiert)",
      "stadiumId": "ObjectId (Referenz auf stadiums._id)",
      "addedAt": "2024-09-14T20:00:00.000Z"
    }
    ```

  - **favorite_clubs** — Lieblingsclubs des Nutzers. Referenziert das Heimstadion des Clubs via `stadiumId`. Wird für die Win-Rate-Berechnung pro Club verwendet.
    ```json
    {
      "_id": "ObjectId (automatisch generiert)",
      "name": "SC Freiburg",
      "shortName": "SCF",
      "stadiumId": "ObjectId (Referenz auf stadiums._id)",
      "addedAt": "2026-05-07T00:00:00.000Z"
    }
    ```

  **Begründung der Normalisierung:** Stadion-Metadaten (Name, Ort, Koordinaten, Kapazität) werden einmalig in der `stadiums`-Collection gespeichert. `visits` und `bucket_list` referenzieren das Stadion nur via `stadiumId`. Dies vermeidet Datenduplikation und ermöglicht serverseitige Aggregationen (z. B. alle Besuche eines Stadions, Marker für die Karte) per MongoDB `$lookup`.

  Die Daten werden über SvelteKit Form Actions (Server-side) verwaltet. Die `+page.server.js`-Dateien enthalten `load()`-Funktionen zum Laden der Daten und `actions` für Create- und Delete-Operationen. Das Dashboard aggregiert die Daten serverseitig zur Berechnung der Statistiken (unique Stadien, Länder, Länder-Breakdown, letzte Besuche) sowie für die Lieblingsclubs-Sektion: Per `$lookup` auf die `visits`-Collection wird pro Club die W/D/L-Bilanz und Win-Rate berechnet (case-insensitiver Vergleich auf `homeTeam`/`awayTeam`).

  Der MongoDB Connection String wird als Environment Variable (`MONGODB_URI`) gespeichert — lokal in der `.env`-Datei (nicht im Repository) und auf Netlify als Environment Variable konfiguriert. Die Datenbankverbindung wird in `src/lib/db.js` zentral hergestellt und in allen Server-Routen importiert.

- **Deployment:** Die App ist deployt auf Netlify: _[stadiontracker.netlify.app — URL hier bestätigen]_

- **Besondere Entscheidungen:**
  - **Svelte 5 Runes-Modus:** Das Projekt verwendet Svelte 5 mit dem neuen Runes-Modus (`$props()`, `$state()`, `$effect()`, `onclick` statt `on:click`). Dies erforderte Anpassungen gegenüber der gängigen Svelte-4-Syntax, bietet aber eine modernere und explizitere Reaktivität.
  - **Eigenes CSS statt Bootstrap:** Obwohl Bootstrap im Modul behandelt wurde, wurde bewusst auf eigenes CSS mit Scoped Styles gesetzt. Begründung: Das eigene Design-System mit spezifischen Farben, Radien und Typografie hätte ständige Bootstrap-Overrides erfordert. Svelte's Scoped Styles (CSS pro Komponente) sind für diesen Ansatz besser geeignet.
  - **Inline-Formulare statt separate Seiten:** Die Formulare zur Erfassung von Besuchen öffnen sich inline per Toggle innerhalb des jeweiligen Tabs. Dies vermeidet Seitenwechsel und hält den Flow kompakt — besonders wichtig auf Mobile.
  - **Keine Authentifizierung:** Da der Prototyp für einen einzelnen Nutzer konzipiert ist, wurde bewusst auf Login/Registrierung verzichtet. Dies reduziert die Komplexität erheblich und ermöglicht die Fokussierung auf die Kernfunktionalität.
  - **Network Access 0.0.0.0/0:** Für MongoDB Atlas wurde der Zugriff von allen IP-Adressen erlaubt, da Netlify keine feste IP hat. Für einen Prototyp ist dies akzeptabel.
  - **Leaflet nur client-seitig laden:** Leaflet setzt ein DOM-Objekt voraus und ist nicht SSR-kompatibel. Die Bibliothek (inkl. CSS) wird deshalb ausschliesslich über einen dynamischen Import innerhalb von `onMount` geladen (`const L = (await import('leaflet')).default`). Dies verhindert Server-Fehler beim Build und stellt sicher, dass Leaflet erst initialisiert wird, wenn das `<div>`-Element im DOM vorhanden ist. `onMount` ist in Svelte 5 für externe Bibliotheken weiterhin erlaubt.
  - **MongoDB-Aggregation für die Karte:** Die Karten-Seite aggregiert die `visits`-Collection mit `$group` nach `stadiumId`, um doppelte Besuche desselben Stadions zusammenzuführen und den `visitCount` zu berechnen. Anschliessend werden die Stadionkoordinaten (`Latitude`, `Longitude`) via `$lookup` auf die `stadiums`-Collection aufgelöst. Die `bucket_list`-Collection wird parallel mit `Promise.all` abgefragt, um die Ladezeit zu minimieren.

### 3.5 Validate

- **URL der getesteten Version:** https://stadiontracker.netlify.app

- **Ziele der Prüfung:**
  - Können Nutzende einen neuen Stadionbesuch innerhalb von 2 Minuten vollständig erfassen?
  - Ist die W/D/L-Badge-Logik (Sieg/Unentschieden/Niederlage) ohne Erklärung verständlich?
  - Empfinden die Nutzenden das Dashboard als motivierend und informativ?
  - Ist die Navigation zwischen Dashboard und Besuche intuitiv?
  - Welche Informationen fehlen oder sind überflüssig?

- **Vorgehen:** Moderierter, szenario-basierter Usability Test, on-site. Die Testpersonen haben die App auf einem Laptop geöffnet und die vier Aufgaben nacheinander bearbeitet. Die Aufgabentexte wurden auf einem separaten Gerät angezeigt. Der Tester hat beobachtet und Notizen im Feedback Grid festgehalten, ohne einzugreifen. Nach allen Aufgaben folgte eine kurze Nachbesprechung mit offenen Fragen.

- **Stichprobe:**

  | Code | Name | Alter | Beruf | Erfahrung mit ähnlichen Apps |
  |------|------|-------|-------|------------------------------|
  | TP-1 | Manuel Bächler | 24 | Automatiker, Bühler AG | Gelegentlich (z.B. Strava) |
  | TP-2 | Thomas Behnke | 52 | Informatiker, Bühler AG | Kaum vorhanden |

---

#### Aufgaben / Szenarien

**Aufgabe 1 – Besuch erfassen**
> Du warst gestern im Letzigrund beim Spiel FC Zürich gegen FC Basel. Das Ergebnis war 2:1 für FCZ. Erfasse diesen Besuch in der App.

**Aufgabe 2 – Länderstatistik nachschlagen**
> Finde heraus, in wie vielen verschiedenen Ländern du schon Stadien besucht hast.

**Aufgabe 3 – Besuch löschen**
> Lösche einen bestehenden Besuch aus der Liste.

**Aufgabe 4 – Clubbilanz auf Dashboard lesen**
> Schaue dir auf dem Dashboard an, wie die Bilanz deines Lieblingsclubs aussieht (Siege/Unentschieden/Niederlagen und Win-Rate).

---

#### Feedback Grid – TP-1 (Manuel Bächler)

_Datum: 04.06.2026 · Version: stadiontracker.netlify.app_

| + Was hat gut funktioniert / gefallen? | - Was hat nicht funktioniert / gefehlt / gestört? |
|---|---|
| Navigation zwischen den Tabs war sofort klar | Hat beim Stadion-Suchfeld lange gewartet, ob Vorschläge erscheinen |
| Dashboard-Übersicht wirkt motivierend, Statistiken auf einen Blick | War nach dem Speichern unsicher, ob der Besuch wirklich gespeichert wurde |
| Design wirkt aufgeräumt und übersichtlich | Lieblingsclub-Eingabe war auf Dashboard nicht sofort sichtbar |

| * Welche neuen Ideen / Anforderungen sind aufgekommen? | ? Was war unklar? |
|---|---|
| Fotos zu einem Besuch hochladen | W/D/L-Badges — hat kurz überlegt, was die Abkürzungen bedeuten |
| Liste aller Clubs, Lieblingsclub per Herz favorisieren | Was der Unterschied zwischen «als besucht markieren» und «Entfernen» ist |

---

#### Feedback Grid – TP-2 (Thomas Behnke)

_Datum: 04.06.2026 · Version: stadiontracker.netlify.app_

| + Was hat gut funktioniert / gefallen? | - Was hat nicht funktioniert / gefehlt / gestört? |
|---|---|
| Idee der App sofort verstanden — «sowas wie ein Tagebuch für Stadionbesuche» | Stadionsuche frustrierend: «Letzigrund» eingegeben, kein Hinweis ob Stadion gefunden wurde |
| Tab-Icons als Orientierung hilfreich | Kein Hinweis, was nach dem Speichern passiert ist |
| W/D/L-Bilanz auf Dashboard übersichtlich und direkt verständlich | Texte teilweise auf Deutsch, teilweise auf Englisch |

| * Welche neuen Ideen / Anforderungen sind aufgekommen? | ? Was war unklar? |
|---|---|
| Filter nach Land oder Saison auf der Besuche-Seite | Wieso sind Besuche nicht klickbar, obwohl sie bei Hover selektiert werden? |
| Export-Funktion (z.B. als PDF oder Liste) | |

---

#### Kennzahlen & Beobachtungen

| Aufgabe | TP-1 Erfolg | TP-1 Auffälligkeiten | TP-2 Erfolg | TP-2 Auffälligkeiten |
|---------|-------------|----------------------|-------------|----------------------|
| 1 – Besuch erfassen | Erfolgreich | Hat einwandfrei funktioniert | Nicht erfolgreich | «Letzigrund» falsch geschrieben, kein Feedback — verunsicherter Nutzer |
| 2 – Länderstatistik | Erfolgreich | Dashboard direkt geöffnet, Zahl sofort gefunden | Mit Umweg | Hat zuerst auf der Karte gesucht |
| 3 – Besuch löschen | Mit Umweg | Lösch-Icon erst beim zweiten Durchgang entdeckt | Mit Umweg | Lösch-Button nicht sofort sichtbar |
| 4 – Clubbilanz lesen | Nicht erfolgreich | W/U/N-Abkürzungen nicht verständlich | Erfolgreich | Sofort verstanden, positiv kommentiert |

_Legende: Erfolgreich = ohne Probleme abgeschlossen · Mit Umweg = gezögert oder falsch geklickt · Nicht erfolgreich = Aufgabe nicht abgeschlossen_

---

#### Issues

> Schweregrade: 0 = Kein Problem · 1 = Kosmetisch · 2 = Klein (tiefe Prio) · 3 = Gross (hohe Prio) · 4 = Katastrophe

---

**Issue 1**

| Attribut | Beschreibung |
|----------|-------------|
| **Ort** | Besuche – Stadion-Suchfeld |
| **Problem** | TP-2 konnte Aufgabe 1 nicht abschliessen, weil «Letzigrund» kein direktes Ergebnis lieferte und keine Rückmeldung erschien ob das Stadion gefunden wurde. Der korrekte Name im Datensatz lautet «Stadion Letzigrund». |
| **Ursache** | Suchfeld erfordert exakte Übereinstimmung mit dem Stadionnamen im Datensatz. Kein Autocomplete, kein Dropdown mit Vorschlägen, keine Fehlermeldung bei null Treffern. |
| **Empfehlung** | Autocomplete-Dropdown beim Tippen einblenden; bei keinem Treffer Meldung «Kein Stadion gefunden – bitte Schreibweise prüfen» anzeigen. |
| **Szenario** | Aufgabe 1 |
| **Schweregrad** | 4 – Usability-Katastrophe (blockiert zentralen Workflow) |
| **Testperson(en)** | TP-1, TP-2 |

---

**Issue 2**

| Attribut | Beschreibung |
|----------|-------------|
| **Ort** | Besuche – Formular «Besuch eintragen» |
| **Problem** | Nach dem Speichern erscheint keine Bestätigungsmeldung. Beide Testpersonen waren unsicher, ob der Eintrag gespeichert wurde. |
| **Ursache** | Kein visuelles Feedback (Toast/Erfolgsmeldung) nach dem Absenden des Formulars implementiert. |
| **Empfehlung** | Kurze Erfolgsmeldung («Besuch gespeichert») direkt nach dem Speichern anzeigen, z.B. als Toast-Notification. |
| **Szenario** | Aufgabe 1 |
| **Schweregrad** | 3 – Grosses Problem (hohe Priorität) |
| **Testperson(en)** | TP-1, TP-2 |

---

**Issue 3**

| Attribut | Beschreibung |
|----------|-------------|
| **Ort** | Dashboard – Lieblingsclubs |
| **Problem** | Beide Testpersonen fanden keinen Lösch-Button um einen Lieblingsclub wieder zu entfernen. |
| **Ursache** | Die Lösch-Funktion für Lieblingsclubs wurde nicht implementiert. |
| **Empfehlung** | Entfernen-Button pro FavoriteClubCard ergänzen, analog zur Löschfunktion bei Besuchen. |
| **Szenario** | Aufgabe 3 |
| **Schweregrad** | 2 – Kleines Problem (tiefe Priorität) |
| **Testperson(en)** | TP-1, TP-2 |

---

**Issue 4**

| Attribut | Beschreibung |
|----------|-------------|
| **Ort** | Dashboard – W/U/N-Badges |
| **Problem** | TP-1 konnte Aufgabe 4 nicht abschliessen, weil die Abkürzungen W/U/N nicht verständlich waren. |
| **Ursache** | Die Badges verwenden deutsche Abkürzungen (U = Unentschieden, N = Niederlage) die im Fussballkontext unüblich sind. International gebräuchlich ist W/D/L (Win/Draw/Loss). |
| **Empfehlung** | Badges in W/D/L umbenennen und einen Tooltip ergänzen: «W = Win, D = Draw, L = Loss». |
| **Szenario** | Aufgabe 4 |
| **Schweregrad** | 2 – Kleines Problem (tiefe Priorität) |
| **Testperson(en)** | TP-1 |

---

**Issue 5**

| Attribut | Beschreibung |
|----------|-------------|
| **Ort** | Allgemein – Sprache der Benutzeroberfläche |
| **Problem** | TP-2 bemerkte, dass Texte in der App teilweise auf Deutsch und teilweise auf Englisch sind, was inkonsistent und unprofessionell wirkt. |
| **Ursache** | Keine einheitliche Sprachentscheidung bei der Entwicklung getroffen (z.B. «Besuche» neben «Bucket List», «Entfernen» neben «Delete»). |
| **Empfehlung** | Entweder konsequent Deutsch oder konsequent Englisch — bei einer Schweizer Fussball-Zielgruppe empfiehlt sich Deutsch. Ausnahmen wie etablierte Anglizismen (z.B. «W/D/L») sind vertretbar. |
| **Szenario** | Allgemein |
| **Schweregrad** | 1 – Kosmetisches Problem |
| **Testperson(en)** | TP-2 |

---

#### Zusammenfassung der Resultate

Das grundlegende Konzept von StadionTracker war für beide Testpersonen sofort verständlich — TP-2 beschrieb die App spontan als «Tagebuch für Stadionbesuche», was exakt der Absicht entspricht. Das Dashboard wurde als übersichtlich und motivierend wahrgenommen, die W/D/L-Bilanz wurde von TP-2 direkt positiv kommentiert. Kritischster Befund ist die Stadionsuche: TP-2 konnte Aufgabe 1 nicht abschliessen, weil keine Rückmeldung erschien ob das eingegebene Stadion gefunden wurde — der fehlende Autocomplete blockiert den zentralen Workflow der App. Ebenfalls fehlt nach dem Speichern jegliches Feedback, was beide Testpersonen verunsichert hat. Die W/U/N-Abkürzungen auf den Badges waren für TP-1 nicht verständlich, wodurch Aufgabe 4 nicht abgeschlossen werden konnte. Insgesamt bestätigen die Tests, dass das Konzept trägt — die Hauptprobleme liegen im Feedback-Verhalten der App und in der Konsistenz einzelner Bezeichnungen.

---

#### Abgeleitete Verbesserungen

| Priorität | Verbesserung | Begründung | Umgesetzt? |
|-----------|-------------|------------|------------|
| Hoch | Autocomplete-Dropdown in Stadionsuche | Issue 1, Schweregrad 4 – blockiert zentralen Workflow, TP-2 konnte Aufgabe 1 nicht abschliessen | Nein – geplant |
| Hoch | Erfolgsmeldung (Toast) nach Speichern eines Besuchs | Issue 2, Schweregrad 3 – beide TPs unsicher ob Eintrag gespeichert wurde | Nein – geplant |
| Mittel | Lösch-Funktion für Lieblingsclubs implementieren | Issue 3, Schweregrad 2 – kein Entfernen-Button vorhanden, beide TPs betroffen | Nein – geplant |
| Mittel | W/U/N-Badges in W/D/L umbenennen + Tooltip ergänzen | Issue 4, Schweregrad 2 – TP-1 konnte Aufgabe 4 nicht abschliessen | Nein – geplant |
| Tief | Einheitliche Sprache (Deutsch) konsequent durchsetzen | Issue 5, Schweregrad 1 – Sprachmischung wirkt inkonsistent | Nein – abwägen |

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

### 4.3 Interaktive Stadion-Karte (Leaflet)
- **Beschreibung & Nutzen:** Die Karte-Seite (`/karte`) visualisiert alle besuchten und auf der Bucket List gespeicherten Stadien auf einer interaktiven Europakarte. Farbcodierte CircleMarker (Grün = besucht, Orange = Bucket List) geben sofort Orientierung. Ein Klick auf einen Marker öffnet einen Tooltip mit Stadionname und Ort; ein erneuter Klick schliesst ihn. Unterhalb der Karte listet eine scrollbare Stadionliste alle Einträge beider Kategorien auf — ein Klick auf einen Listeneintrag lässt die Karte zum gewählten Stadion fliegen (`flyTo`) und öffnet den Tooltip automatisch. Mehrfach besuchte Stadien werden auf der Karte als ein Marker angezeigt; in der Liste erscheint ein Badge mit der Besuchsanzahl (z. B. `3×`).
- **Wo umgesetzt:**
  - **Backend:** `src/routes/karte/+page.server.js` — Zwei parallele MongoDB-Aggregationen (`Promise.all`): `visits` wird via `$group` nach `stadiumId` zusammengeführt (visitCount) und via `$lookup` mit den Stadionkoordinaten angereichert; `bucket_list` wird direkt per `$lookup` auf `stadiums` aufgelöst. Stadien ohne Koordinaten werden vom Server zurückgegeben, aber clientseitig ohne Marker dargestellt.
  - **Frontend:** `src/routes/karte/+page.svelte` — Leaflet wird per dynamischem Import in `onMount` geladen (SSR-sicher). Die Karte initialisiert sich auf Europa (center `[48, 10]`, zoom 5) mit OpenStreetMap-Tiles. Marker-Referenzen werden in einem `markers`-Objekt nach ID gespeichert, damit Listenklicks direkt den richtigen Marker ansprechen können. Reaktiver State (`$state`) steuert die Hervorhebung der selektierten Listenzeile.
- **Referenz:** Kap. 3.4.2, Besondere Entscheidungen (Leaflet nur client-seitig; MongoDB-Aggregation für die Karte)
- **Aus Evaluation abgeleitet?:** Nein, war von Beginn an als Kern-Feature geplant (vgl. Kap. 2, Lösungsidee).

### 4.4 Lieblingsclubs mit Win-Rate
- **Beschreibung & Nutzen:** Eine neue Sektion auf dem Dashboard zeigt die Lieblingsclubs des Nutzers mit ihrer W/D/L-Bilanz und Win-Rate. Pro Club wird angezeigt: Clubname, Kürzel, Heimstadion, Anzahl Spiele, W/D/L-Badges und ein farbcodierter Win-Rate-Balken (grün ≥50%, rot <50%). Neue Clubs können über ein togglebares Inline-Formular direkt auf dem Dashboard hinzugefügt werden.
- **Designentscheidungen:**
  - **Win-Rate entfernt aus globalem Dashboard** — Eine globale Win-Rate über alle Besuche wurde bewusst entfernt, da sie ohne Teamkontext keine Aussagekraft hat. Ein "W" bei einem Spiel bedeutet je nach Fan-Zugehörigkeit ein Sieg oder eine Niederlage. Die Win-Rate wird stattdessen pro Lieblingsclub berechnet und angezeigt.
  - **W/D/L-Badge entfernt aus VisitCard** — Das Badge wurde aus der Besuchskarte entfernt aus demselben Grund: Ohne Wissen, welchem Team der Fan zugehört, ist das Ergebnis nicht interpretierbar. Die Badge-Komponente (`ResultBadge.svelte`) bleibt erhalten und wird in der `FavoriteClubCard` verwendet.
  - **Inline-Formular statt separate Seite** — Konsistent mit dem Rest der App öffnet sich das Formular per Toggle inline, ohne Seitenwechsel.
- **Wo umgesetzt:**
  - **Datenbank:** Neue Collection `favorite_clubs` (Felder: `name`, `shortName`, `stadiumId` FK, `addedAt`)
  - **Backend:** `src/routes/+page.server.js` — MongoDB-Aggregation auf `favorite_clubs` mit `$lookup` auf `visits` (case-insensitiver Vergleich auf `homeTeam`/`awayTeam`), `$addFields` für W/D/L-Zählung und Win-Rate-Berechnung, `$lookup` auf `stadiums` für Stadionname. Neue Form Action `addFavoriteClub`.
  - **Komponente:** `src/lib/components/FavoriteClubCard.svelte` — Props: `club` (name, shortName, stadiumName, totalGames, wins, draws, losses, winRate)
  - **Frontend:** `src/routes/+page.svelte` — Lieblingsclubs-Sektion mit 2-spaltigem Grid, togglebarem Inline-Formular (Clubname, Kürzel, Heimstadion-Dropdown)
- **Aus Evaluation abgeleitet?:** Nein, Entscheidung aus inhaltlichen Qualitätsgründen (Win-Rate ohne Teamkontext sinnlos).

### 4.5 Autocomplete-Stadionsuche (aus Evaluation abgeleitet)

- **Beschreibung & Nutzen:** Das Stadion-Suchfeld beim Erfassen eines neuen Besuchs wurde durch eine Autocomplete-Suche ersetzt. Beim Tippen ab zwei Zeichen erscheint ein Dropdown mit passenden Stadien aus der Datenbank (Name, Stadt, Land). Bei keinem Treffer erscheint die Meldung «Kein Stadion gefunden – bitte Schreibweise prüfen». Nach der Auswahl wird die `stadiumId` als Hidden Field gesetzt — manuelle Eingabe von Stadt und Land entfällt damit vollständig.
- **Wo umgesetzt:**
  - **API-Route:** `src/routes/api/stadiums/+server.js` — GET-Endpoint mit MongoDB `$match` (case-insensitiv) und `$group` zur Deduplizierung identischer Stadionnamen. Gibt maximal 8 Treffer zurück.
  - **Frontend:** <br>
  **-** `src/routes/besuche/+page.svelte` - Neuer State `stadiumQuery`, `stadiumSuggestions`, `selectedStadium`. Funktion `searchStadiums()` ruft den API-Endpoint auf. Funktion `selectStadium()` setzt das ausgewählte Stadion und schliesst das Dropdown.
   <br>
  **-** `src/routes/bucket-list/+page.svelte` - Gleiche Autocomplete-Logik 
  wie auf der Besuche-Seite. Das manuelle Formular (Stadionname, Stadt, Land, 
  Kapazität) wurde ersetzt. Stadt und Land werden automatisch aus dem Datensatz 
  übernommen. Der Speichern-Button ist deaktiviert solange kein Stadion ausgewählt ist.
- **Aus Evaluation abgeleitet?:** Ja — Issue 1, Schweregrad 4. TP-2 konnte Aufgabe 1 nicht abschliessen weil «Letzigrund» keine Ergebnisse lieferte.

---

### 4.6 Toast-Notifications nach Aktionen (aus Evaluation abgeleitet)

- **Beschreibung & Nutzen:** Nach dem Speichern, Löschen oder anderen Aktionen erscheint eine kurze Toast-Notification am unteren Bildschirmrand, die nach 3 Sekunden automatisch verschwindet. Dies gibt dem Nutzer sofortiges Feedback, ob eine Aktion erfolgreich war. Fehlermeldungen erscheinen als roter Toast. Ersetzt die bisherigen statischen Alert-Blöcke, die nach einem Seitenreload verschwanden.
- **Wo umgesetzt:**
  - **`src/routes/besuche/+page.svelte`** — Toast für «Besuch gespeichert», «Besuch gelöscht» und Fehlermeldungen.
  - **`src/routes/bucket-list/+page.svelte`** — Toast für «Stadion zur Bucket List hinzugefügt», «Stadion als besucht markiert», «Stadion entfernt» und Fehlermeldungen.
  - **`src/routes/+page.svelte`** — Toast für «Lieblingsclub hinzugefügt», «Lieblingsclub entfernt» und Fehlermeldungen.
  - Jede Seite implementiert die gleiche `showToast(message, type)`-Funktion mit `setTimeout` für Auto-close nach 3000ms. CSS-Animation `slideUp` für sanftes Einblenden.
- **Aus Evaluation abgeleitet?:** Ja — Issue 2, Schweregrad 3. Beide Testpersonen waren nach dem Speichern unsicher, ob der Eintrag wirklich gespeichert wurde.

---

### 4.7 Lösch-Funktion für Lieblingsclubs (aus Evaluation abgeleitet)

- **Beschreibung & Nutzen:** Lieblingsclubs können nun über ein Lösch-Icon (Mülleimer) direkt auf der `FavoriteClubCard` entfernt werden. Das Icon erscheint in der oberen rechten Ecke der Karte und wird bei Hover rot hervorgehoben. Nach dem Löschen erscheint ein Toast («Lieblingsclub entfernt»).
- **Wo umgesetzt:**
  - **Backend:** `src/routes/+page.server.js` — Neue Form Action `deleteFavoriteClub`, die den Club anhand des Namens aus der `favorite_clubs`-Collection löscht.
  - **Komponente:** `src/lib/components/FavoriteClubCard.svelte` — Neues Prop `onDelete`, Trash2-Icon aus lucide-svelte, neues `.card-header`-Layout für Name + Delete-Button nebeneinander.
  - **Frontend:** `src/routes/+page.svelte` — Neue Funktion `deleteClub(name)` ruft die Server Action auf und lädt die Seite neu.
- **Aus Evaluation abgeleitet?:** Ja — Issue 3, Schweregrad 2. Beide Testpersonen fanden keinen Weg, einen einmal hinzugefügten Lieblingsclub wieder zu entfernen.

---

### 4.8 W/D/L-Badges mit Tooltip (aus Evaluation abgeleitet)

- **Beschreibung & Nutzen:** Die Ergebnis-Badges in der `FavoriteClubCard` wurden von den deutschen Abkürzungen W/U/N auf die international gebräuchlichen W/D/L (Win/Draw/Loss) umgestellt. Zusätzlich wurde jedem Badge ein `title`-Attribut als Tooltip hinzugefügt («W = Win (Sieg)», «D = Draw (Unentschieden)», «L = Loss (Niederlage)»), der bei Hover erscheint.
- **Wo umgesetzt:**
  - **Komponente:** `src/lib/components/FavoriteClubCard.svelte` — Badge-Labels und title-Attribute angepasst.
- **Aus Evaluation abgeleitet?:** Ja — Issue 4, Schweregrad 2. TP-1 konnte Aufgabe 4 nicht abschliessen, weil die deutschen Abkürzungen W/U/N im internationalen Fussballkontext ungebräuchlich sind.

---

### 4.9 Sprachkonsistenz — bewusste Entscheidung (aus Evaluation abgeleitet)

- **Beschreibung:** TP-2 bemängelte in der Evaluation, dass Texte in der App teilweise auf Deutsch und teilweise auf Englisch sind. Nach Analyse des Befunds wurde entschieden, die Sprachmischung beizubehalten und nicht zu vereinheitlichen.
- **Begründung:** Die App ist grundsätzlich auf Deutsch — alle Menüs, Labels, Formulare und Meldungen sind deutschsprachig. Englische Begriffe in der App (Bucket List, Stadium Tracker, W/D/L) sind etablierte Anglizismen, die im Fussball- und Tech-Kontext international verbreitet sind und von der primären Zielgruppe (18–35-jährige, technikaffine Fussballfans) verstanden werden. Eine vollständige Eindeutschung («Wunschliste» statt «Bucket List», «Stadion-Verfolger» statt «Stadium Tracker») würde den Charakter der App verändern und wirkt im Kontext von Sport-Tracking-Apps weniger zeitgemäss.
- **Ausblick v2.0:** Als zukünftige Erweiterung ist eine Sprachumschaltung (Deutsch / Englisch) geplant, um weitere Zielgruppen anzusprechen — insbesondere internationale Fussballfans ausserhalb der Deutschschweiz.
- **Aus Evaluation abgeleitet?:** Ja — Issue 5, Schweregrad 1. Bewusst nicht umgesetzt, da die Sprachmischung einer inhaltlichen Logik folgt.

---

## Aktualisierte Verbesserungstabelle (3.5)

Ersetze die bestehende «Abgeleitete Verbesserungen»-Tabelle in Kapitel 3.5 durch:

| Priorität | Verbesserung | Begründung | Umgesetzt? |
|-----------|-------------|------------|------------|
| Hoch | Autocomplete-Dropdown in Stadionsuche | Issue 1, Schweregrad 4 – blockiert zentralen Workflow, TP-2 konnte Aufgabe 1 nicht abschliessen | Ja – siehe Kap. 4.5 |
| Hoch | Erfolgsmeldung (Toast) nach Speichern eines Besuchs | Issue 2, Schweregrad 3 – beide TPs unsicher ob Eintrag gespeichert wurde | Ja – siehe Kap. 4.6 |
| Mittel | Lösch-Funktion für Lieblingsclubs implementieren | Issue 3, Schweregrad 2 – kein Entfernen-Button vorhanden, beide TPs betroffen | Ja – siehe Kap. 4.7 |
| Mittel | W/U/N-Badges in W/D/L umbenennen + Tooltip ergänzen | Issue 4, Schweregrad 2 – TP-1 konnte Aufgabe 4 nicht abschliessen | Ja – siehe Kap. 4.8 |
| Tief | Einheitliche Sprache durchsetzen | Issue 5, Schweregrad 1 – Sprachmischung wirkt inkonsistent | Nein – bewusste Entscheidung, siehe Kap. 4.9 |

## 5. Projektorganisation [Optional]

- **Repository & Struktur:** Das Projekt wird in einem GitHub-Repository verwaltet. Die Dokumentation (README.md) liegt im Root-Verzeichnis. Der Sourcecode befindet sich im `src/`-Ordner, unterteilt in `lib/` (wiederverwendbare Module und Komponenten) und `routes/` (Seiten und Server-Logik). Das Repository ist für die Dozierenden zugänglich (Usernamen: mmeisterhans und bkuehnis).
  - _URL: [GitHub-Repository-URL hier einfügen]_

- **Commit-Praxis:** Sprechende Commit-Messages in deutscher Sprache, die beschreiben, was geändert wurde. Beispiele bisheriger Commits:
  - `feat: add favorite clubs section to dashboard with inline form`
  - `fix: remove win-rate stat and W/D/L badge from UI display`
  - "Übung 11: Hauptworkflow Besuche (CRUD), MongoDB-Anbindung, Netlify-Deployment"
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
  - Leaflet.js (https://leafletjs.com) — Open-Source-Kartenbibliothek für die interaktive Karte
  - OpenStreetMap (https://www.openstreetmap.org) — Kartenkacheln (Tile Layer) für die Leaflet-Karte
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