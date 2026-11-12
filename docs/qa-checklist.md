# QA checklist

Run `pnpm dev` and check each item after any UI change. Update this file when a change adds a case.

## Viewports (no horizontal scroll)
- [ ] 375 and 390 px (iPhone, with status bar / notch: header not clipped)
- [ ] 360 px (Android)
- [ ] 820 px (tablet)
- [ ] 1440 px (desktop)

## Flows
- [ ] First load shows skeletons, then the list (loading)
- [ ] API failure shows an alert with "Try again"; cached coins stay visible; retry recovers
- [ ] Search filters by name/symbol, sort reorders, "No coins match" shows when empty
- [ ] Expanded card shows stats; 7D/30D/90D switch the chart; chart error offers retry
- [ ] Marking a favorite adds it to the Favorites section; unmarking removes it; reload keeps it
- [ ] Prices show as currency ($2,040.83), sub-dollar coins keep more decimals; long names truncate with ellipsis
- [ ] Expanding a card shows its chart; collapsing hides it
- [ ] Console has no errors or warnings

## Keyboard and screen reader
- [ ] Tab order: skip link, logo, then each card's star and arrow
- [ ] Focus ring visible on every control, on light and dark surfaces
- [ ] Star announces "pressed"; arrow announces "expanded" and its name includes the coin
- [ ] Chart region has a text alternative

## Preferences
- [ ] Language (EN/ES) translates every visible and aria string; `pnpm test` guards missing keys
- [ ] Theme button flips light/dark on every single click (default follows the system); no flash on reload; chart colours follow the theme
- [ ] Currency selector (USD, EUR, MXN, …) refetches prices and reformats cards, stats and chart
- [ ] Custom selects: mouse, arrows/Home/End/Enter/Esc, outside click closes, focus returns to the button, popups not clipped at 375 px
- [ ] Sort, "favorites only", language and theme survive a reload
- [ ] "Show more" reveals 24 more coins and resets when filters change

## Robustness
- [ ] Expanded charts older than 10 min refetch after a reload (no stale persisted chart)
- [ ] Switching currency/language quickly ends with prices in the last choice
- [ ] Favorites and main list can both show the same coin without duplicate DOM ids
- [ ] Production bundle has no redux logger output in the console

## Contrast and motion
- [ ] Text >= 4.5:1, icons >= 3:1 (tokens in `tailwind.config.js`)
- [ ] With "reduce motion" on: no skeleton shimmer, chart draw or arrow rotation animation

## Real devices (not testable locally)
- [ ] iPhone: safe-area insets with `viewport-fit=cover`
