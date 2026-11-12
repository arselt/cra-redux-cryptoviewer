# QA checklist

Run `pnpm dev` and check each item after any UI change. Update this file when a change adds a case.

## Viewports (no horizontal scroll)
- [ ] 375 and 390 px (iPhone, with status bar / notch: header not clipped)
- [ ] 360 px (Android)
- [ ] 820 px (tablet)
- [ ] 1440 px (desktop)

## Flows
- [ ] First load shows skeletons, then the list (loading)
- [ ] Offline / API failure leaves the page usable (error)
- [ ] Marking a favorite adds it to the Favorites section; unmarking removes it; reload keeps it
- [ ] Expanding a card shows its chart; collapsing hides it
- [ ] Console has no errors or warnings

## Keyboard and screen reader
- [ ] Tab order: skip link, logo, then each card's star and arrow
- [ ] Focus ring visible on every control, on light and dark surfaces
- [ ] Star announces "pressed"; arrow announces "expanded" and its name includes the coin
- [ ] Chart region has a text alternative

## Contrast and motion
- [ ] Text >= 4.5:1, icons >= 3:1 (tokens in `tailwind.config.js`)
- [ ] With "reduce motion" on: no skeleton shimmer, chart draw or arrow rotation animation

## Real devices (not testable locally)
- [ ] iPhone: safe-area insets with `viewport-fit=cover`
