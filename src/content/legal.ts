import { person } from './portfolio';

// Address is public only in the legal pages, as requested with the imprint addition.
// Birth date stays in private/profile.json and is never imported.
export const legal = {
  name: person.name,
  street: 'Sternblütenweg 5',
  city: '12526 Berlin',
  country: 'Deutschland',
  email: person.email,
  phone: person.phone,
  phoneHref: person.phoneHref,
  hosting: {
    name: 'NovaCloud-Hosting',
    company: 'Tech Tide Portugal Unipessoal LDA',
    address: 'Rua Daniel Guerreiro Joao 4 4AB, 8125-598 Quarteira, Portugal',
    website: 'https://novacloud-hosting.com/',
    imprint: 'https://novacloud-hosting.com/imprint',
    privacy: 'https://www.iubenda.com/privacy-policy/76982670/legal',
    verified: '2026-09-09',
  },
  // Deployment review: actual server logging, retention, TLS, AVV, and any proxy/CDN
  // must be checked against the installed configuration. No fictional retention period.
};
