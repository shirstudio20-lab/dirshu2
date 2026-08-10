# Fonts

The Figma file uses two licensed Hebrew families:

| Figma family        | Used for                | Expected file(s)                                                     |
| ------------------- | ----------------------- | -------------------------------------------------------------------- |
| `Levi DL v1 AAA`    | display headings (Bold) | `LeviDL-Bold.woff2`                                                   |
| `Atlas DL 3.1 AAA`  | everything else         | `AtlasDL-Light.woff2`, `AtlasDL-Regular.woff2`, `AtlasDL-Bold.woff2`  |

Drop the licensed web files here with exactly those names — `src/styles/fonts.css`
already declares them and they take over with no further changes.

Until then the stacks in `src/styles/tokens.css` fall back to Frank Ruhl Libre
(display) and Heebo (body), loaded from Google Fonts in `index.html`.
