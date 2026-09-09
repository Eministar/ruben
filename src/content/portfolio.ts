/** Public, verified portfolio content. Never import private/profile.json here. */
export const person = {
  name: 'Ruben Schultka',
  role: 'Angehender Fachinformatiker für Systemintegration',
  location: 'Berlin, Deutschland',
  email: 'rubenschultka@gmail.com',
  phone: '+49 178 4779980',
  phoneHref: '+491784779980',
  description:
    'Ruben Schultka – angehender Fachinformatiker für Systemintegration in Berlin. Praktische Erfahrung mit Serververwaltung, Infrastruktur und FiveM-Entwicklung für bis zu 400 gleichzeitige Nutzer.',
};

export const projects = [
  {
    id: 'nero-v',
    name: 'Nero-V',
    kind: 'FiveM · Entwicklung & Infrastruktur',
    period: 'Februar 2026 – heute',
    location: 'Berlin',
    headline: 'Wenn bis zu 400 Menschen gleichzeitig verbunden sind.',
    summary:
      'Ein größeres FiveM-Projekt verbindet Softwareentwicklung mit den Anforderungen eines intensiv genutzten Serversystems. Hier arbeite ich als Developer.',
    role: 'Ich entwickle und warte Software mit Lua sowie Weboberflächen mit HTML, CSS, JavaScript und Vue.js.',
    challenge:
      'Hohe gleichzeitige Nutzung macht Performance und Serverbetrieb zu wichtigen Themen. Zum technischen Umfeld gehören komplexere Firewall-Strukturen, Loadbalancing und Cache-Server.',
    technologies: [
      'Lua',
      'HTML / CSS',
      'JavaScript',
      'Vue.js',
      'Firewalls',
      'Loadbalancing',
      'Cache-Server',
    ],
  },
  {
    id: 'hosting',
    name: 'Hosting-Projekt',
    kind: 'Serverbetrieb & Support',
    period: 'Januar 2025 – Juni 2026',
    location: 'Berlin',
    headline: 'Am Server. Auch aus der Ferne.',
    summary:
      'Praktische Arbeit mit Rack-Servern: von der Remoteverwaltung bis zur Unterstützung bei technischen Problemen.',
    role: 'Ich habe Rack-Server über IPMI und SSH remote verwaltet und Aufgaben im Servermanagement sowie in der Systemadministration übernommen.',
    challenge:
      'Fehler analysieren, Ursachen eingrenzen und bei technischen Fragen unterstützen: Dazu gehörten sowohl 1st-Level- als auch 2nd-Level-Support.',
    technologies: [
      'IPMI',
      'SSH',
      'Rack-Server',
      'Systemadministration',
      'Fehleranalyse',
      '1st- & 2nd-Level-Support',
    ],
  },
];

export const skills = [
  {
    title: 'Systeme & Infrastruktur',
    description: 'Server verwalten. Verbindungen verstehen.',
    items: [
      'Servermanagement',
      'Systemadministration',
      'Remoteverwaltung',
      'IPMI & SSH',
      'Loadbalancing',
      'Cache-Server',
      'Firewall-Konfiguration',
      'Sicherheitskonzepte',
    ],
  },
  {
    title: 'Programmierung',
    description: 'Logik entwickeln. Oberflächen umsetzen.',
    items: ['Lua', 'Java', 'Python', 'HTML & CSS', 'JavaScript', 'Vue.js'],
  },
  {
    title: 'IT & Support',
    description: 'Fehler eingrenzen. Im Alltag unterstützen.',
    items: [
      'IT-Support',
      '1st- & 2nd-Level-Support',
      'Fehlerdiagnose',
      'Hardware- & Software-Installation',
      'Datenmanagement',
      'Datenbankpflege',
      'IT-Projektmanagement',
    ],
  },
];

export const experience = [
  {
    title: 'Praktikum allgemeine Dienste',
    organization: 'Maz&More',
    location: 'Berlin',
    period: 'Januar – Februar 2025',
    description:
      'Unterstützung bei der Büroverwaltung und Organisation, digitale Paketverarbeitung mit Excel sowie Aufbau und Einrichtung von Computern.',
  },
  {
    title: 'Service-Learning im Kindergarten',
    organization: 'Pfefferwerk Stadtkultur GmbH',
    location: 'Berlin',
    period: 'Service-Learning',
    // REVIEW REQUIRED: source says August 2024 – January 2024.
    // Chronologically contradictory. Do not infer a corrected date.
    sourcePeriod: 'August 2024 – Januar 2024',
    dateNeedsReview: true,
    description:
      'Unterstützung bei kleinen Alltagsaufgaben: aufräumen, Bastelmaterial vorbereiten und den Tisch decken. Begleitung der Kinder beim Spielen und draußen auf dem Hof.',
  },
];

export const education = [
  {
    title: 'Mittlerer Schulabschluss (MSA)',
    organization: 'Grünauer Gemeinschaftsschule, Berlin',
    period: 'Juli 2026',
    description: 'Erfolgreich absolviert in der 10. Klasse.',
  },
  {
    title: 'Berufsbildungsreife (BBR)',
    organization: 'Grünauer Gemeinschaftsschule, Berlin',
    period: 'Januar 2025',
    description: 'Erfolgreich absolviert in der 9. Klasse.',
  },
  {
    title: 'Berufsvorbereitung',
    organization: 'TÜV Rheinland Akademie',
    period: null,
    description: null,
  },
];
