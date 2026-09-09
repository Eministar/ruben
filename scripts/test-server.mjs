import { preview } from 'astro';

// Use the programmatic API so tests own the server lifecycle in every environment.
await preview({ server: { host: '127.0.0.1', port: 4322 } });
