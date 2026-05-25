# Thirukkural · திருக்குறள்

A React + Vite + TypeScript app for exploring couplets from the **Thirukkural**, the classical Tamil text of 1,330 verses by Thiruvalluvar. The UI was ported from a standalone `thirukural.html` page into a modern single-page application with the same parchment-and-gold aesthetic.

## Features

- Random kural display with Tamil verse, English rendering, and elucidation
- Ornate card layout with fade transitions when switching verses
- Auto-fit first verse line so long Tamil text stays on one line inside the card
- Responsive layout for mobile and desktop
- Curated sample of 26 couplets across themes (virtue, education, wisdom, love, and more)

## Screenshots

Run the dev server, then capture the app at `http://localhost:5173` and save images under `docs/`:

```bash
npm run dev
```

Suggested files:

| File | Description |
| ---- | ----------- |
| `docs/screenshot-desktop.png` | Full layout on a wide viewport |
| `docs/screenshot-mobile.png` | Card layout on a narrow viewport |

After adding images, they will render here:

| Desktop | Mobile |
| ------- | ------ |
| ![Desktop view](docs/screenshot-desktop.png) | ![Mobile view](docs/screenshot-mobile.png) |

**What you will see**

- Tamil title **திருக்குறள்** with an English subtitle
- Gold-bordered card showing kural number, chapter (adhikaram), two-line Tamil verse, English rendering, and elucidation
- **New Kural** button to load another random couplet with a fade transition

## Tech stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vite.dev/)
- Google Fonts: Tiro Tamil, Cormorant Garamond, Cinzel

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm (included with Node.js)

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Production build

```bash
npm run build
```

Output is written to the `dist/` folder.

### Preview production build

```bash
npm run preview
```

## Deployment

This is a static SPA. Build once, then upload the `dist/` folder to any static host.

### Vercel

1. Push the repo to GitHub.
2. Import the project at [vercel.com](https://vercel.com).
3. Use the defaults: **Framework Preset** Vite, **Build Command** `npm run build`, **Output Directory** `dist`.

### Netlify

1. Connect the Git repository in [Netlify](https://www.netlify.com/).
2. Set **Build command** to `npm run build` and **Publish directory** to `dist`.

Or deploy from the CLI:

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

### GitHub Pages

For a project site at `https://<user>.github.io/<repo>/`, set the Vite `base` path in `vite.config.ts`:

```ts
export default defineConfig({
  plugins: [react()],
  base: '/<repo-name>/',
})
```

Then add a deploy workflow or run:

```bash
npm run build
npx gh-pages -d dist
```

### AWS (S3 + CloudFront)

1. Create an S3 bucket and enable static website hosting (or use S3 as an origin only).
2. Upload the contents of `dist/`:

```bash
npm run build
aws s3 sync dist/ s3://YOUR_BUCKET_NAME --delete
```

3. Create a CloudFront distribution with the S3 bucket as origin.
4. Point your domain to CloudFront and use HTTPS via ACM.

For SPA routing, configure the error document (or CloudFront custom error response) to return `index.html` with status `200` for unknown paths. This app uses a single route, so the default `index.html` entry is enough.

### Any static host

Upload everything inside `dist/` after `npm run build`. No server-side runtime is required.

## Project structure

```
thiru/
├── docs/               # Screenshot assets (optional)
├── index.html          # Entry HTML and font links
├── thirukural.html     # Original static reference
├── public/             # Static assets (favicon, etc.)
├── src/
│   ├── App.tsx         # Main UI and kural switching logic
│   ├── App.css         # Layout and theme styles
│   ├── kurals.ts       # Kural data and random picker
│   ├── main.tsx        # React entry point
│   └── index.css       # Global base styles
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## How it works

On load, the app shows Kural #1, then picks a random couplet after a short delay. Click **New Kural** to draw another verse with a fade animation. Verse data lives in `src/kurals.ts`; add or edit entries there to expand the collection.

## Adding more kurals

Edit `src/kurals.ts` and append objects with this shape:

```ts
{
  number: 42,
  adhikaram: 'Chapter in Tamil · English chapter name',
  line1: 'First line of the couplet',
  line2: 'Second line of the couplet',
  translation: 'English rendering',
  explanation: 'Short elucidation',
}
```

The random picker in `pickRandomKural()` will include new entries automatically.

## Source

The design and initial content come from `thirukural.html` in this repository. The React app preserves the look and behavior while splitting styles, data, and UI into maintainable modules.

## Scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start dev server with HMR      |
| `npm run build`   | Type-check and build for prod  |
| `npm run preview` | Serve the production build     |

## License

- **Application code** (React app, styles, tooling): [MIT License](LICENSE)
- **Thirukkural text**: Classical Tamil literature; the original verses are in the public domain. English renderings and elucidations in `src/kurals.ts` are curated samples for this demo app.

## Contributing

1. Fork the repository and create a branch.
2. Make changes and run `npm run build` to verify the project compiles.
3. Open a pull request with a short description of what you changed.

Suggestions welcome: more kurals, accessibility improvements, themes, or additional languages.
