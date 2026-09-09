import sharp from 'sharp';
import { Buffer } from 'node:buffer';
import { fileURLToPath } from 'node:url';
import { writeFile } from 'node:fs/promises';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const mark = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><rect width="180" height="180" rx="20" fill="#244aca"/><text x="25" y="124" font-family="Arial,sans-serif" font-size="116" font-weight="700" letter-spacing="-9" fill="#eeeee8">rs.</text></svg>`;
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#eeeee8"/><path d="M60 95h1080M60 287h1080M60 553h1080" stroke="#c3c9bd"/><g font-family="Arial,sans-serif"><text x="60" y="61" fill="#586257" font-size="20">Systemintegration &amp; Entwicklung</text><text x="1140" y="61" text-anchor="end" fill="#586257" font-size="20">Berlin, Deutschland</text><text x="53" y="233" fill="#202824" font-size="107" font-weight="700" letter-spacing="-5" textLength="1005" lengthAdjust="spacingAndGlyphs">RUBEN SCHULTKA</text><text x="1070" y="168" fill="#244aca" font-size="74">↗</text><text x="60" y="355" fill="#202824" font-size="30">Angehender Fachinformatiker</text><text x="60" y="398" fill="#202824" font-size="30">für Systemintegration.</text><text x="60" y="467" fill="#586257" font-size="21">Software entwickeln. Server verwalten.</text><text x="60" y="502" fill="#586257" font-size="21">Zusammenhänge verstehen.</text><text x="60" y="595" fill="#586257" font-size="18">Praktische Erfahrung. Echte Systeme.</text></g><g stroke="#244aca" stroke-width="2"><path d="m806 355 90-43 115 55-90 44z" fill="#fafbf7"/><path d="m806 355 0 106 115 55V411z" fill="#d8e0d5"/><path d="m921 411 90-44v106l-90 43z" fill="#e7ecdf"/><path d="m820 376 87 42v18l-87-42zm0 28 87 42v18l-87-42zm0 28 87 42v18l-87-42z" fill="#244aca"/><path d="m934 425 62-30m-62 43 62-30m-62 43 62-30m-62 43 62-30" opacity=".4"/></g></svg>`;

await Promise.all([
  writeFile(`${publicDir}/favicon.svg`, mark),
  sharp(Buffer.from(mark)).resize(32, 32).png().toFile(`${publicDir}/favicon.png`),
  sharp(Buffer.from(mark)).png().toFile(`${publicDir}/apple-touch-icon.png`),
  sharp(Buffer.from(social)).png().toFile(`${publicDir}/social.png`),
]);
