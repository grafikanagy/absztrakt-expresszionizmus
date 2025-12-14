# Items.json API Documentation

## Overview

The `items.json` file contains a structured collection of abstract expressionism artwork metadata. This dataset includes 20 carefully curated artworks from prominent abstract expressionist artists, organized with comprehensive metadata for educational and research purposes.

**Dataset Version:** 1.0
**Last Updated:** 2024
**Total Records:** 20 artworks
**Primary Language:** Hungarian (with English artwork titles)

---

## Table of Contents

1. [Data Structure](#data-structure)
2. [Field Specifications](#field-specifications)
3. [Data Types and Constraints](#data-types-and-constraints)
4. [Usage Examples](#usage-examples)
5. [Validation Rules](#validation-rules)
6. [Integration Guidelines](#integration-guidelines)
7. [Common Queries](#common-queries)

---

## Data Structure

The `items.json` file contains a JSON array of artwork objects. Each object represents a single artwork with standardized metadata fields.

### Schema Overview

```json
{
  "sorszám": <number>,
  "fejezet": <string>,
  "alkotó": <string>,
  "cím": <string>,
  "link": <string (URL)>,
  "évszám": <number|string>,
  "technika": <string>,
  "méret_cm": <string>,
  "irányzat": <string>,
  "kulcsszavak": [<string>, ...],
  "kapcsolódó_kérdések": [<string>, ...]
}
```

---

## Field Specifications

### Core Metadata Fields

#### `sorszám` (Serial Number)
- **Type:** Integer
- **Required:** Yes
- **Description:** Unique sequential identifier for each artwork in the collection
- **Range:** 1-20
- **Example:** `1`, `15`, `20`
- **Usage:** Primary key for referencing artworks, useful for ordering and indexing

#### `fejezet` (Chapter)
- **Type:** String
- **Required:** Yes
- **Description:** The chapter or section classification within the abstract expressionism taxonomy
- **Format:** May include chapter number and/or technique name
- **Possible Values:**
  - `"20 / Drip painting"`
  - `"Az absztrakt expresszionizmus / Drip painting"`
  - `"Az absztrakt expresszionizmus / Action painting"`
  - `"Az absztrakt expresszionizmus / Color field painting"`
- **Example:** `"Az absztrakt expresszionizmus / Color field painting"`
- **Usage:** Categorizes artworks by movement sub-genre and teaching module

#### `alkotó` (Artist)
- **Type:** String
- **Required:** Yes
- **Description:** Full name of the artist who created the artwork
- **Format:** `"[First Name] [Last Name]"`
- **Artists in Dataset:**
  - Jackson Pollock
  - Robert Motherwell
  - Willem de Kooning
  - Franz Kline
  - Mark Rothko
  - Barnett Newman
  - Clyfford Still
- **Example:** `"Mark Rothko"`
- **Usage:** Artist attribution and filtering by creator

#### `cím` (Title)
- **Type:** String
- **Required:** Yes
- **Description:** Official title of the artwork, typically in English
- **Format:** May include catalog numbers, descriptive titles, or "Untitled"
- **Examples:**
  - `"Number 5"`
  - `"Woman I."`
  - `"Vir Heroicus Sublimis"`
  - `"Untitled (Black on Gray)"`
- **Usage:** Primary identification of the artwork

#### `link` (Image URL)
- **Type:** String (URL)
- **Required:** Yes
- **Description:** Direct URL to the artwork's image hosted on imgbb.com
- **Format:** `https://i.ibb.co/[id]/[filename].jpg`
- **Example:** `"https://i.ibb.co/8ntwT4Tb/Jackson-Pollock-Number-5-1948.jpg"`
- **Image Format:** JPEG
- **Usage:** Display artwork images in applications, galleries, or educational materials
- **Note:** Ensure proper attribution and copyright compliance when using images

#### `évszám` (Year)
- **Type:** Number OR String (for ranges)
- **Required:** Yes
- **Description:** Year or year range when the artwork was created
- **Formats:**
  - Single year: `1948` (Number)
  - Year range: `"1950–1952"` (String with en-dash)
  - Year range alternative: `"1944–1945"` (String)
- **Examples:**
  - `1948`
  - `"1950–1952"`
  - `"1963–1964"`
- **Usage:** Chronological sorting, timeline visualization, historical context
- **Important:** When parsing, check data type to handle both single years and ranges

### Technical Details Fields

#### `technika` (Technique)
- **Type:** String
- **Required:** Yes
- **Description:** Detailed description of the materials and techniques used in creating the artwork
- **Format:** Materials listed in Hungarian, often with technique name in parentheses
- **Components:**
  - Materials: olaj (oil), akril (acrylic), zománcfesték (enamel paint), lakk (lacquer)
  - Support: vásznon (on canvas), farostlemezen (on fiberboard)
  - Techniques: drip painting, action painting, etc.
- **Examples:**
  - `"olaj, lakk és zománcfesték farostlemezen (drip painting)"`
  - `"zománcfesték, üvegdarabok és szilánkok vásznon (drip painting)"`
  - `"akril vásznon"`
  - `"színes litográfia fehér papi­ron"`
- **Usage:** Understanding artistic process, materials research, conservation data

#### `méret_cm` (Dimensions in Centimeters)
- **Type:** String
- **Required:** Yes
- **Description:** Physical dimensions of the artwork in centimeters
- **Format:** `"[height] × [width] cm"` (using multiplication sign ×)
- **Example:** `"243,8 × 121,9 cm"`
- **Note:** Hungarian decimal separator is comma (,) not period (.)
- **Usage:** Scale comparison, exhibition planning, spatial requirements
- **Parsing Tip:** To extract numeric values, replace comma with period and parse the pattern `\d+,\d+`

### Classification Fields

#### `irányzat` (Movement/Style)
- **Type:** String
- **Required:** Yes
- **Description:** Art movement(s) or style classification, may include multiple comma-separated values
- **Format:** Comma-separated list of movements
- **Common Values:**
  - `"Absztrakt expresszionizmus"` (Abstract Expressionism)
  - `"Action painting"`
  - `"Color field painting"`
  - `"Lírai absztrakció"` (Lyrical Abstraction)
  - `"Gesztusfestészet"` (Gestural Painting)
  - `"Figuratív gesztusfestészet"` (Figurative Gestural Painting)
  - `"Minimalista absztrakció"` (Minimalist Abstraction)
  - `"Szürrealista automatizmus"` (Surrealist Automatism)
- **Examples:**
  - `"Action painting, absztrakt expresszionizmus"`
  - `"Color field painting, lírai absztrakció"`
  - `"Korai absztrakt expresszionizmus, szürrealista automatizmus hatása"`
- **Usage:** Movement-based filtering, style analysis, art history categorization

#### `kulcsszavak` (Keywords)
- **Type:** Array of Strings
- **Required:** Yes
- **Description:** Thematic keywords that capture key artistic concepts, techniques, or characteristics of the artwork
- **Length:** Typically 3-5 keywords per artwork
- **Format:** Array of lowercase Hungarian strings
- **Keyword Categories:**
  - **Technical:** `"gesztusfestészet"`, `"drip technika"`, `"zips motívum"`
  - **Aesthetic:** `"fekete-fehér kontraszt"`, `"színmező"`, `"ritmus és mozgás"`
  - **Conceptual:** `"spirituális transzcendencia"`, `"politikai emlékezet"`, `"automatizmus"`
  - **Historical:** `"New York-i iskola"`, `"spanyol polgárháború"`
- **Example:**
  ```json
  [
    "gesztusfestészet",
    "automatikus festés",
    "New York-i iskola",
    "pszichológiai expresszió"
  ]
  ```
- **Usage:** Search indexing, thematic analysis, educational tagging, semantic clustering

#### `kapcsolódó_kérdések` (Related Questions)
- **Type:** Array of Strings
- **Required:** Yes
- **Description:** Pedagogical questions designed to encourage critical thinking and deeper analysis of the artwork
- **Length:** Typically 2 questions per artwork
- **Format:** Array of Hungarian questions
- **Question Types:**
  - Comparative analysis
  - Historical context
  - Technical inquiry
  - Conceptual interpretation
  - Artist intention
- **Example:**
  ```json
  [
    "Miben különbözik Pollock drip technikája a hagyományos ecsethasználattól?",
    "Hogyan tükrözi a Number 5 a művész pszichológiai önkifejezését?"
  ]
  ```
- **Usage:** Educational curriculum, discussion prompts, assessment questions, interactive learning

---

## Data Types and Constraints

### Summary Table

| Field | Type | Required | Unique | Default | Constraints |
|-------|------|----------|--------|---------|-------------|
| `sorszám` | Integer | Yes | Yes | - | 1 ≤ value ≤ 20 |
| `fejezet` | String | Yes | No | - | Non-empty |
| `alkotó` | String | Yes | No | - | Valid artist name |
| `cím` | String | Yes | No | - | Non-empty |
| `link` | String (URL) | Yes | Yes | - | Valid HTTPS URL |
| `évszám` | Number\|String | Yes | No | - | Year 1900-2100 or range |
| `technika` | String | Yes | No | - | Non-empty |
| `méret_cm` | String | Yes | No | - | Pattern: `\d+,?\d* × \d+,?\d* cm` |
| `irányzat` | String | Yes | No | - | Non-empty |
| `kulcsszavak` | Array[String] | Yes | No | - | 1 ≤ length ≤ 10 |
| `kapcsolódó_kérdések` | Array[String] | Yes | No | - | 1 ≤ length ≤ 5 |

### Validation Notes

1. **URL Validation:** All `link` values must be valid HTTPS URLs pointing to imgbb.com
2. **Year Format:** `évszám` accepts both numeric years (e.g., `1948`) and string ranges (e.g., `"1950–1952"`)
3. **Dimension Format:** `méret_cm` uses Hungarian decimal notation (comma separator)
4. **Array Fields:** Both `kulcsszavak` and `kapcsolódó_kérdések` must be non-empty arrays

---

## Usage Examples

### Example 1: Complete Artwork Record

```json
{
  "sorszám": 1,
  "fejezet": "20 / Drip painting",
  "alkotó": "Jackson Pollock",
  "cím": "Number 5",
  "link": "https://i.ibb.co/8ntwT4Tb/Jackson-Pollock-Number-5-1948.jpg",
  "évszám": 1948,
  "technika": "olaj, lakk és zománcfesték farostlemezen (drip painting)",
  "méret_cm": "243,8 × 121,9 cm",
  "irányzat": "Action painting, absztrakt expresszionizmus",
  "kulcsszavak": [
    "gesztusfestészet",
    "automatikus festés",
    "New York-i iskola",
    "pszichológiai expresszió"
  ],
  "kapcsolódó_kérdések": [
    "Miben különbözik Pollock drip technikája a hagyományos ecsethasználattól?",
    "Hogyan tükrözi a Number 5 a művész pszichológiai önkifejezését?"
  ]
}
```

### Example 2: Artwork with Year Range

```json
{
  "sorszám": 6,
  "fejezet": "Az absztrakt expresszionizmus / Action painting",
  "alkotó": "Willem de Kooning",
  "cím": "Woman I.",
  "link": "https://i.ibb.co/h1Ys8cK8/Willem-de-Kooning-Woman-I-1950-52.jpg",
  "évszám": "1950–1952",
  "technika": "olaj vásznon",
  "méret_cm": "192,7 × 147,3 cm",
  "irányzat": "Absztrakt expresszionizmus, figuratív gesztusfestészet",
  "kulcsszavak": [
    "nőalak",
    "erő és agresszió",
    "gesztusfestészet",
    "figurativitás és absztrakció"
  ],
  "kapcsolódó_kérdések": [
    "Hogyan értelmezhető a nőalak ambivalenciája de Kooning 'Woman' sorozatában?",
    "Milyen szerepet játszik a festés folyamata a kép végső hatásában?"
  ]
}
```

### Example 3: Color Field Painting

```json
{
  "sorszám": 12,
  "fejezet": "Az absztrakt expresszionizmus / Color field painting",
  "alkotó": "Mark Rothko",
  "cím": "No. 61 (Rust and Blue)",
  "link": "https://i.ibb.co/L43FpkV/Mark-Rothko-No-61-Rust-and-Blue-1953.jpg",
  "évszám": 1953,
  "technika": "olaj vásznon",
  "méret_cm": "292,7 cm × 233,7 cm",
  "irányzat": "Color field painting, lírai absztrakció",
  "kulcsszavak": [
    "színmező",
    "spirituális transzcendencia",
    "melankólia",
    "lebegő forma"
  ],
  "kapcsolódó_kérdések": [
    "Miként hoz létre Rothko érzelmi intenzitást kizárólag a színek viszonyrendszerével?",
    "Miért tekinthető a 'Rust and Blue' a color field festészet egyik csúcspontjának?"
  ]
}
```

---

## Validation Rules

### JSON Schema (Draft-07)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "items": {
    "type": "object",
    "required": [
      "sorszám",
      "fejezet",
      "alkotó",
      "cím",
      "link",
      "évszám",
      "technika",
      "méret_cm",
      "irányzat",
      "kulcsszavak",
      "kapcsolódó_kérdések"
    ],
    "properties": {
      "sorszám": {
        "type": "integer",
        "minimum": 1,
        "maximum": 20,
        "description": "Unique sequential identifier"
      },
      "fejezet": {
        "type": "string",
        "minLength": 1,
        "description": "Chapter or section classification"
      },
      "alkotó": {
        "type": "string",
        "minLength": 1,
        "description": "Artist full name"
      },
      "cím": {
        "type": "string",
        "minLength": 1,
        "description": "Artwork title"
      },
      "link": {
        "type": "string",
        "format": "uri",
        "pattern": "^https://",
        "description": "HTTPS URL to artwork image"
      },
      "évszám": {
        "oneOf": [
          {
            "type": "integer",
            "minimum": 1900,
            "maximum": 2100
          },
          {
            "type": "string",
            "pattern": "^\\d{4}(–\\d{4})?$"
          }
        ],
        "description": "Year or year range"
      },
      "technika": {
        "type": "string",
        "minLength": 1,
        "description": "Materials and technique description"
      },
      "méret_cm": {
        "type": "string",
        "pattern": "^\\d+,?\\d*\\s*×\\s*\\d+,?\\d*\\s*cm$",
        "description": "Dimensions in centimeters"
      },
      "irányzat": {
        "type": "string",
        "minLength": 1,
        "description": "Art movement classification"
      },
      "kulcsszavak": {
        "type": "array",
        "items": {
          "type": "string",
          "minLength": 1
        },
        "minItems": 1,
        "maxItems": 10,
        "description": "Thematic keywords"
      },
      "kapcsolódó_kérdések": {
        "type": "array",
        "items": {
          "type": "string",
          "minLength": 1
        },
        "minItems": 1,
        "maxItems": 5,
        "description": "Educational questions"
      }
    },
    "additionalProperties": false
  }
}
```

---

## Integration Guidelines

### JavaScript/TypeScript

#### TypeScript Interface

```typescript
interface Artwork {
  sorszám: number;
  fejezet: string;
  alkotó: string;
  cím: string;
  link: string;
  évszám: number | string;
  technika: string;
  méret_cm: string;
  irányzat: string;
  kulcsszavak: string[];
  kapcsolódó_kérdések: string[];
}

// Load and parse
import items from './items.json';
const artworks: Artwork[] = items;
```

#### Loading Data (Node.js)

```javascript
const fs = require('fs');

// Synchronous load
const artworks = JSON.parse(fs.readFileSync('./items.json', 'utf-8'));

// Asynchronous load
fs.readFile('./items.json', 'utf-8', (err, data) => {
  if (err) throw err;
  const artworks = JSON.parse(data);
  console.log(`Loaded ${artworks.length} artworks`);
});
```

#### Parsing Dimensions

```javascript
function parseDimensions(méret_cm) {
  // Extract height and width in cm
  const match = méret_cm.match(/([\d,]+)\s*×\s*([\d,]+)/);
  if (!match) return null;

  const height = parseFloat(match[1].replace(',', '.'));
  const width = parseFloat(match[2].replace(',', '.'));

  return { height, width };
}

// Example usage
const artwork = artworks[0];
const dimensions = parseDimensions(artwork.méret_cm);
console.log(`Height: ${dimensions.height} cm, Width: ${dimensions.width} cm`);
```

#### Parsing Year Range

```javascript
function parseYear(évszám) {
  if (typeof évszám === 'number') {
    return { start: évszám, end: évszám };
  }

  // Handle year range like "1950–1952"
  const match = évszám.match(/(\d{4})(?:–(\d{4}))?/);
  if (!match) return null;

  return {
    start: parseInt(match[1]),
    end: parseInt(match[2] || match[1])
  };
}

// Example usage
const yearInfo = parseYear("1950–1952");
console.log(`Created between ${yearInfo.start} and ${yearInfo.end}`);
```

### Python

#### Data Class Definition

```python
from dataclasses import dataclass
from typing import List, Union
import json

@dataclass
class Artwork:
    sorszám: int
    fejezet: str
    alkotó: str
    cím: str
    link: str
    évszám: Union[int, str]
    technika: str
    méret_cm: str
    irányzat: str
    kulcsszavak: List[str]
    kapcsolódó_kérdések: List[str]

# Load data
with open('items.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    artworks = [Artwork(**item) for item in data]
```

#### Helper Functions

```python
import re

def parse_dimensions(méret_cm: str) -> dict:
    """Parse dimensions string into height and width."""
    match = re.search(r'([\d,]+)\s*×\s*([\d,]+)', méret_cm)
    if not match:
        return None

    height = float(match.group(1).replace(',', '.'))
    width = float(match.group(2).replace(',', '.'))

    return {'height': height, 'width': width}

def parse_year(évszám: Union[int, str]) -> dict:
    """Parse year or year range into start and end."""
    if isinstance(évszám, int):
        return {'start': évszám, 'end': évszám}

    match = re.search(r'(\d{4})(?:–(\d{4}))?', évszám)
    if not match:
        return None

    return {
        'start': int(match.group(1)),
        'end': int(match.group(2) or match.group(1))
    }
```

---

## Common Queries

### Filter by Artist

```javascript
// Get all Rothko artworks
const rothkoWorks = artworks.filter(art => art.alkotó === "Mark Rothko");
```

```python
# Get all Rothko artworks
rothko_works = [art for art in artworks if art.alkotó == "Mark Rothko"]
```

### Filter by Movement

```javascript
// Get all Color Field paintings
const colorFieldWorks = artworks.filter(art =>
  art.irányzat.includes("Color field painting")
);
```

```python
# Get all Color Field paintings
color_field_works = [
    art for art in artworks
    if "Color field painting" in art.irányzat
]
```

### Search by Keyword

```javascript
// Find artworks about political themes
const politicalWorks = artworks.filter(art =>
  art.kulcsszavak.some(keyword =>
    keyword.includes("politikai") || keyword.includes("political")
  )
);
```

```python
# Find artworks about political themes
political_works = [
    art for art in artworks
    if any("politikai" in kw or "political" in kw for kw in art.kulcsszavak)
]
```

### Sort by Year

```javascript
// Sort chronologically
const sortedByYear = [...artworks].sort((a, b) => {
  const yearA = typeof a.évszám === 'number' ? a.évszám : parseInt(a.évszám);
  const yearB = typeof b.évszám === 'number' ? b.évszám : parseInt(b.évszám);
  return yearA - yearB;
});
```

```python
# Sort chronologically
def get_start_year(artwork):
    if isinstance(artwork.évszám, int):
        return artwork.évszám
    return int(re.search(r'(\d{4})', artwork.évszám).group(1))

sorted_by_year = sorted(artworks, key=get_start_year)
```

### Group by Artist

```javascript
// Group artworks by artist
const byArtist = artworks.reduce((acc, art) => {
  if (!acc[art.alkotó]) acc[art.alkotó] = [];
  acc[art.alkotó].push(art);
  return acc;
}, {});

console.log(Object.keys(byArtist)); // List of all artists
console.log(byArtist["Jackson Pollock"].length); // Count Pollock works
```

```python
from collections import defaultdict

# Group artworks by artist
by_artist = defaultdict(list)
for art in artworks:
    by_artist[art.alkotó].append(art)

print(list(by_artist.keys()))  # List of all artists
print(len(by_artist["Jackson Pollock"]))  # Count Pollock works
```

---

## Dataset Statistics

### Artist Distribution

| Artist | Artwork Count |
|--------|---------------|
| Jackson Pollock | 2 |
| Robert Motherwell | 3 |
| Willem de Kooning | 3 |
| Franz Kline | 3 |
| Mark Rothko | 4 |
| Barnett Newman | 2 |
| Clyfford Still | 3 |
| **Total** | **20** |

### Movement Distribution

- **Action Painting / Drip Painting:** 11 artworks
- **Color Field Painting:** 9 artworks

### Year Range

- **Earliest:** 1943 (Robert Motherwell - "Pancho Villa, Dead and Alive")
- **Latest:** 1971 (Robert Motherwell - "Elegy to the Spanish Republic No. 110")
- **Peak Period:** 1950-1963 (majority of works)

---

## Best Practices

### 1. Data Integrity
- Always validate JSON structure before parsing
- Check for required fields before processing
- Handle both numeric and string year formats
- Preserve Unicode characters (Hungarian text)

### 2. Performance
- Cache parsed data to avoid repeated file reads
- Index by `sorszám` for O(1) lookups
- Use hash maps for artist/movement filtering

### 3. Error Handling
- Validate URLs before attempting to display images
- Handle missing or malformed dimension strings gracefully
- Provide fallbacks for year parsing edge cases

### 4. Localization
- All metadata is in Hungarian; consider translation layers for international use
- Preserve original Hungarian field names in data layer
- Use mapping layer for UI localization

### 5. Attribution
- Always credit artists when displaying artwork information
- Respect copyright and fair use guidelines
- Include links to original sources when possible

---

## Changelog

### Version 1.0 (Current)
- Initial dataset with 20 artworks
- Complete metadata for all abstract expressionism pieces
- Standardized schema across all records

---

## Support and Contact

For questions, issues, or contributions related to this dataset, please refer to the repository documentation or contact the maintainers.

**Related Files:**
- `Tankönyv__absztrakt expresszionizmus.md` - Detailed educational content
- `Tartalomjegyzék_absztrakt expresszionizmus.md` - Table of contents

---

## License

Please ensure appropriate usage rights and attribution when using artwork images and metadata from this collection.
