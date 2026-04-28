# Übung 10 – UI Prototyping / Mockup
**Projekt:** Stadium Tracker  
**Tool:** Figma  

---

## Link zum Prototyp

🔗 [Figma Mockup – Stadion-Tracker](https://www.figma.com/design/CooiE2cF4AOjLH7drOVrI1/Stadion-Tracker-Mockup?node-id=0-1&t=NNZY7nulQ1XS5bl3-1)

---

## Screens

| Frame | Beschreibung |
|-------|-------------|
| 01_Dashboard | Übersicht mit StatCards, Home vs. Away-Chart, Nächster Besuch, Länder-Breakdown |
| 02_Besuche | Liste aller Stadionbesuche mit Ergebnis, Datum, Notiz |
| 02_1_Besuch_Hinzufügen | Formular: Stadion, Datum, Teams, Ergebnis, Home/Away, Notiz |
| 03_Bucketlist | Liste der Wunschstadien mit "Als besucht markieren"-Button |
| 03_1_BucketList_Hinzufügen | Formular: Stadionname, Stadt, Land, Kapazität |
| 04_Karte | Interaktive Übersichtskarte mit besuchten Stadien (grün) und Bucket List (orange) |

---

## Designentscheide

### Mobile-first
Die App wurde für Mobilgeräte (375–390px Breite) konzipiert, da Stadionbesuche hauptsächlich unterwegs erfasst werden. Ein Nutzer steht nach dem Spiel im Stadion und möchte den Besuch direkt auf dem Smartphone eintragen. Desktop wäre für diesen Use Case weniger praktisch.

### Navigation: Bottom Tab Bar
Statt einer Top-Menü-Navigation wurde eine **Bottom Tab Bar** mit 4 Tabs gewählt (Dashboard, Besuche, Bucket List, Karte). Begründung:
- Daumen-freundlich auf Mobilgeräten (erreichbar mit einer Hand)
- Alle Hauptbereiche sind jederzeit sichtbar und direkt erreichbar
- Entspricht dem bekannten Muster von iOS/Android-Apps (intuitiv)

### Farbsystem
| Farbe | Hex | Verwendung |
|-------|-----|------------|
| Primary Green | `#1D9E75` | Aktive Elemente, Buttons, Erfolg (Win), aktiver Tab |
| Accent Orange | `#D85A30` | Sekundäre Buttons, Bucket-List-Badge, Away-Indikator |
| Gray | `#888780` | Inaktive Tabs, Labels, Sekundärtext |
| Red | `#E24B4A` | Loss-Indikator |


### Komponenten
- **Bottom Navigation** als wiederverwendbare Komponente → Änderungen wirken sich auf alle Screens aus
- **StatCards** für Kennzahlen auf dem Dashboard (Stadien, Besuche, Länder, Win-Rate)
- **VisitRow** für Einträge in der Besuchsliste (W/L/D-Badge, Ergebnis, Datum, Notiz)
- **StadiumCard** für Bucket-List-Einträge

### Formulare als Overlay (kein eigener Screen)
Die "Hinzufügen"-Formulare (Besuch erfassen, Stadion zur Bucket List hinzufügen) wurden als **Overlay-Screens** gestaltet, die den bestehenden Screen überlagern. Dies gibt dem Nutzer das Gefühl, den Kontext nicht zu verlassen.

### Karte
Die Karte zeigt besuchte Stadien (grüne Marker) und Bucket-List-Stadien (orange Marker) auf einer Übersichtskarte. Darunter eine sortierte Liste aller Stadien. Dies gibt einen geografischen Überblick über die eigene "Fussball-Reise".

---

### Workflow Tab-Navigation

```
Jeder Tab in der Bottom Navigation verlinkt direkt auf den entsprechenden Screen:

Dashboard ──→ 01_Dashboard
Besuche   ──→ 02_Besuche
Bucketlist──→ 03_Bucketlist
Karte     ──→ 04_Karte
```

## KI-Deklaration

- Dummy-Daten (Stadionnamen, Spielergebnisse, Daten) wurden mit Unterstützung von Claude (Anthropic) generiert
- Icons: Iconify Plugin (Material Symbols)
