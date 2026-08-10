# דרשו — להחיות את תורתו

Sections 1–3 of the Figma file
[דרשו](https://www.figma.com/design/481GWANJjkyJOCGlGzQjwS/%D7%93%D7%A8%D7%A9%D7%95?node-id=52-1236),
built as React components. RTL throughout (`<html dir="rtl" lang="he">`).

```bash
npm install
npm run dev
```

## How the design is reproduced

The Figma file is one fixed 1920px canvas (`Frame 5`, node 52:1236) with
absolutely placed layers. Every measurement in this project is therefore
written at its literal Figma value, and `ScaledStage` scales the whole canvas
down proportionally to the viewport (`useDesignScale`). Nothing is re-flowed
or re-guessed — positions, sizes, colours and type sizes are the numbers from
the file, and each rule cites the node it came from.

## Structure

```
src/
  components/
    ScaledStage/   1920 canvas → viewport scaler
    PillButton/    gold gradient pill (nodes 52:1251, 52:1593)
    SiteHeader/    utility group, nav, crest (52:1250, 52:1256, 52:1264)
    Hero/          section 1 (52:1249, 52:1266)
    TorahStages/   section 2 (Frame 5 + the four states of Frame 14)
    JourneyAds/    section 3 carousel (52:1238–52:1958)
  data/
    navigation.ts     main menu
    stages.ts         the four states of section 2
    announcements.ts  carousel slides
  hooks/useDesignScale.ts
  styles/            tokens, fonts, reset
```

## Section 2 — scroll-driven states

The section pins to the top of the viewport, exactly one viewport tall, with
the canvas centred inside it. One wheel gesture moves it on by exactly one
state (repeat events from the same gesture are swallowed); past the last state
the wheel is released and the page continues to section 3. Heading, thumbnail
rail and progress track stay put; the artwork, copy, counter and progress run
are swapped **instantly** — no fade, no crossfade. Clicking a thumbnail scrolls
to that state.

Frame 14 is drawn at 1.60462× the scale of Frame 5, so every geometry value in
`data/stages.ts` has been converted back to the 1920 canvas and expressed in
the coordinate space of the stage group (node 52:1280).

Two things the file did not state outright:

- Frame 14 only carries the small Hebrew date for state 4 (`ז׳ חשון`). States 2
  and 3 use the dates their frames are named after — `כ"ד אלול`, `כ"ו תשרי`.
- The design fixes the gold progress run for state 1 only (261.736 of 851). It
  grows linearly from there to the full track on state 4.

## Section 3 — announcements carousel

Data-driven from `data/announcements.ts`; add an entry and it appears. The
centre card is the active slide at full size with the drop shadow of node
52:1590; neighbours are the same card at 0.6107 — which is exactly the size
of the placeholder cards in the design (524 × 360 vs 858 × 590).

Reading order is RTL, so the next announcement sits to the **left** and the ←
arrow advances. The carousel is endless: slides are rendered by absolute
position rather than by array index, so there is always a card to the left and
to the right however many announcements the data holds, and the active one is
always dead centre.

Breakpoints (`components/JourneyAds/layout.ts`) keep the card's aspect ratio
and the desktop centre-to-centre relationship (0.869 of the card width):

| Viewport | Card width          | Neighbours        | Arrows         |
| -------- | ------------------- | ----------------- | -------------- |
| ≥ 1024   | 858 canvas px       | both peeking      | left / right   |
| 768–1023 | min(620, 64vw)      | both peeking      | left / right   |
| < 768    | 86vw                | off screen        | below the card |

## Fonts

See [`public/fonts/README.md`](public/fonts/README.md) — the two licensed
Hebrew families are declared and fall back to Frank Ruhl Libre / Heebo until
the real files are dropped in.
