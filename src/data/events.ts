export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  image: string;
  date: string;
  time: string;
  endDate?: string;
  location: string;
  address: string;
  chapterId: string;
  chapterName: string;
  category: string;
  registrationUrl?: string;
  isFree: boolean;
  capacity?: number;
}

export const events: Event[] = [
  {
    id: "e1",
    title: "UMAD Annual Gala & Fundraising Dinner",
    slug: "umad-annual-gala-2026",
    description:
      "Join us for an elegant evening celebrating UMAD's impact and raising funds for our 2027 programs.",
    fullDescription: `UMAD's Annual Gala is our most prestigious event of the year — an evening of inspiration, celebration, and community.

The evening will feature:
- A welcome reception with Somali-inspired appetizers and music
- Keynote address by UMAD's founding director
- Impact report presentation showcasing 2026 achievements
- Auction of Somali art and cultural items
- Live entertainment including traditional Somali poetry (Maanso)
- Networking with community leaders and diaspora professionals

All proceeds directly fund UMAD's programs across the Ottawa, Washington, and Somalia chapters. Tickets are available in individual, couple, and table formats.

Formal / Business attire requested.`,
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
    date: "2026-09-20",
    time: "6:00 PM - 11:00 PM EDT",
    location: "Shaw Centre, Ottawa",
    address: "55 Colonel By Drive, Ottawa, ON, Canada",
    chapterId: "ottawa",
    chapterName: "Ottawa Chapter",
    category: "Fundraiser",
    isFree: false,
    capacity: 300,
  },
  {
    id: "e2",
    title: "Youth Career Day & Mentorship Fair",
    slug: "youth-career-day-ottawa-2026",
    description:
      "A full-day event connecting Somali-Canadian youth with professionals across various fields for career guidance and mentorship.",
    fullDescription: `UMAD Ottawa's Youth Career Day brings together ambitious young Somali-Canadians with established professionals for a day of inspiration and practical guidance.

The event will include:
- Career panels featuring professionals in tech, healthcare, law, government, and business
- One-on-one mentorship speed-networking sessions
- Resume review booths
- University and college information tables
- Scholarship announcements

Open to Somali-Canadian youth aged 15-25. Lunch provided. Free of charge.`,
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    date: "2026-08-15",
    time: "9:00 AM - 5:00 PM EDT",
    location: "Ottawa Convention Centre",
    address: "55 Colonel By Drive, Ottawa, ON, Canada",
    chapterId: "ottawa",
    chapterName: "Ottawa Chapter",
    category: "Youth",
    isFree: true,
    capacity: 200,
  },
  {
    id: "e3",
    title: "Somalia Policy Forum: Building Partnerships for Development",
    slug: "somalia-policy-forum-dc-2026",
    description:
      "A high-level policy forum bringing together government officials, NGO leaders, and community representatives to discuss Somalia's development.",
    fullDescription: `The UMAD Washington Chapter is hosting a one-day policy forum focused on strengthening partnerships between the US government, diaspora organizations, and Somalia-based NGOs for effective development programming.

Sessions will cover:
- Current humanitarian situation in Somalia
- USAID and State Department engagement with Somali civil society
- Role of the diaspora in Somalia's development
- Best practices for diaspora-to-homeland remittances and investment
- Breakout sessions by sector: Health, Education, Economic Development

Speakers include representatives from USAID, the Somali Embassy, international NGOs, and diaspora organizations.

Open to all interested parties. Registration required.`,
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
    date: "2026-08-28",
    time: "8:30 AM - 5:30 PM EDT",
    location: "National Press Club",
    address: "529 14th St NW, Washington, DC, USA",
    chapterId: "washington",
    chapterName: "Washington Chapter",
    category: "Forum",
    isFree: false,
    capacity: 150,
  },
  {
    id: "e4",
    title: "Eid Ul-Adha Community Celebration",
    slug: "eid-community-celebration-dc-2026",
    description:
      "Join the Washington chapter for a community Eid celebration featuring traditional food, music, and family activities.",
    fullDescription: `The UMAD Washington Chapter invites the entire community to celebrate Eid Ul-Adha together with food, music, and family-friendly activities.

The event will feature:
- Communal prayer
- Traditional Somali food and refreshments
- Children's activities and games
- Cultural performances
- Community announcements and updates from UMAD Washington

All are welcome. This is a free community event.`,
    image:
      "https://images.unsplash.com/photo-1514286327-27c7b42d7c04?w=800&q=80",
    date: "2026-08-05",
    time: "10:00 AM - 4:00 PM EDT",
    location: "Meridian Hill Park",
    address: "2400 16th St NW, Washington, DC, USA",
    chapterId: "washington",
    chapterName: "Washington Chapter",
    category: "Community",
    isFree: true,
  },
  {
    id: "e5",
    title: "Community Health Fair & Free Screenings",
    slug: "health-fair-ottawa-2026",
    description:
      "Free health screenings, wellness information, and connections to healthcare resources for the Somali community in Ottawa.",
    fullDescription: `UMAD Ottawa in partnership with local healthcare providers is hosting a free community health fair offering health screenings, wellness education, and navigation support.

Services available:
- Blood pressure and diabetes screening
- Vision and hearing tests
- Dental checkups for children
- Mental health resources and counselling information
- Connections to family doctors accepting new patients
- Nutritional guidance

Somali-speaking interpreters will be available. All services are free and no health card is required.`,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    date: "2026-09-12",
    time: "10:00 AM - 3:00 PM EDT",
    location: "Carlington Community Centre",
    address: "900 Merivale Rd, Ottawa, ON, Canada",
    chapterId: "ottawa",
    chapterName: "Ottawa Chapter",
    category: "Health",
    isFree: true,
    capacity: 400,
  },
  {
    id: "e6",
    title: "Agricultural Training Workshop — Adal Region",
    slug: "agricultural-workshop-somalia-2026",
    description:
      "A three-day intensive training for farmers in improved cultivation techniques, drought-resistant crops, and market access.",
    fullDescription: `UMAD Somalia Chapter is hosting a three-day agricultural training workshop for 100 farming families in the Adal region.

Topics covered:
- Drought-resistant crop varieties
- Soil health and water conservation
- Livestock management and veterinary basics
- Post-harvest handling and storage
- Connecting to local and regional markets
- Micro-savings and agricultural finance

Training will be conducted in Somali by experienced agronomists. All participants will receive a starter seed kit upon completion.

Transportation assistance available for participants from remote villages.`,
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
    date: "2026-08-10",
    endDate: "2026-08-12",
    time: "8:00 AM - 5:00 PM",
    location: "Community Center, Adal Region",
    address: "Adal Region, Somalia",
    chapterId: "somalia",
    chapterName: "Somalia Chapter",
    category: "Training",
    isFree: true,
    capacity: 100,
  },
];

export const getEventBySlug = (slug: string) =>
  events.find((e) => e.slug === slug);

export const getEventsByChapter = (chapterId: string) =>
  events.filter((e) => e.chapterId === chapterId);
