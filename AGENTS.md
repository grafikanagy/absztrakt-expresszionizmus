# AGENT szabályok – tananyag slide pipeline

## Tipográfia
- Elsődleges betűkészlet: Aptos (fallback: Arial).
- Címsorok legyenek félkövérek, törzsszöveg normál vastagságú.
- Cím minimális méret: 24 pt, képaláírás: 11 pt.

## Margók és rácsrendszer
- 16:9 diaszabvány (`LAYOUT_WIDE`).
- Külső margó: vízszintesen 0.6", függőlegesen 0.4".
- Rács: egységes gutter 0.24".
- Gallery sablonban 3–6 kép jelenhet meg, 2x2 vagy 3x2 rácsban.

## Képaláírás stílus
- Minden képhez kötelező caption.
- Képaláírás színe semleges szürke (`#444444`), balra zárt.
- Képaláírás a kép alatt jelenjen meg kis vertikális térközzel.

## Speaker notes és bibliográfia
- Minden olyan kép `credit.url` mezője menjen a speaker notes-ba.
- A slide-deck végére automatikusan készüljön bibliográfia dia egyedi URL-listával,
  kivéve ha az input tartalmaz explicit `bibliography` diát; ebben az esetben azt kell feltölteni.

## Minőségbiztosítás
- Build előtt JSON validáció Zod sémával kötelező.
- Hiányzó vagy letölthetetlen kép esetén kötelező placeholder használata,
  a build nem állhat le ettől.
- Képek letöltése cache-elve történjen `cache/images` mappába hash-elt néven.
