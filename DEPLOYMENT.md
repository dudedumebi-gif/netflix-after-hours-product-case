# Prototype deployment

The prototype is a dependency-free static application. It has no runtime calls to CDNs, fonts, image hosts, APIs, analytics, or storage services.

## Verify locally

```bash
npm run check
```

This builds `dist/index.html`, mirrors the release into `prototype/index.html`, and runs the release contract tests.

## Deploy from the repository

- **Vercel:** import the repository; no framework preset or environment variables are required.
- **Netlify:** publish the repository root or use `dist` after `npm run build`.
- **GitHub Pages:** publish the repository root, or copy `dist/index.html` into the selected Pages source.
- **Static hosting:** serve `index.html` directly.

## Release boundary

This deployment is an interactive portfolio prototype. It does not represent a Netflix production service, UAT completion, customer telemetry, cross-device synchronization, or approved financial case.
