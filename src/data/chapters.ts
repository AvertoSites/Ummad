export interface Chapter {
  id: string;
  slug: string;
  name: string;
  location: string;
  country: string;
  description: string;
  longDescription: string;
  coverImage: string;
  history: string;
  purpose: string;
  community: string;
  goals: string[];
  email: string;
  phone: string;
  address: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  leadership: Leader[];
  programs: ChapterProgram[];
}

export interface Leader {
  id: string;
  name: string;
  position: string;
  photo: string;
  email?: string;
}

export interface ChapterProgram {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const chapters: Chapter[] = [
  {
    id: "ottawa",
    slug: "ottawa",
    name: "Ottawa Chapter",
    location: "Ottawa, Canada",
    country: "Canada",
    description:
      "Serving the Somali diaspora community in Canada's capital, providing cultural programs, youth mentorship, and community development initiatives.",
    longDescription:
      "The UMAD Ottawa Chapter is one of our founding North American chapters, established to serve the growing Somali diaspora community in Canada's capital region. We bridge the gap between Somali heritage and Canadian life, ensuring community members feel supported, connected, and empowered.",
    coverImage:
      "https://images.unsplash.com/photo-1524566900828-76e2c24059f4?w=1200&q=80",
    history:
      "Founded in 2018, the Ottawa Chapter emerged from a grassroots movement by Somali-Canadians who wanted to give back to both their local community and their homeland. Starting with informal community gatherings, it has grown into a structured organization with regular programs and partnerships with local Canadian institutions.",
    purpose:
      "To empower and unite the Somali diaspora in Ottawa while channeling resources and support to development projects in Somalia.",
    community:
      "The Ottawa Chapter serves approximately 5,000 Somali-Canadians living in Ottawa and the surrounding National Capital Region.",
    goals: [
      "Provide settlement and integration support to newly arrived Somali immigrants",
      "Run youth mentorship and leadership development programs",
      "Fundraise for UMAD's on-the-ground projects in Somalia",
      "Advocate for Somali community interests at the local and national level",
      "Celebrate and preserve Somali culture in Canada",
    ],
    email: "ottawa@umad.org",
    phone: "+1 (613) 555-0199",
    address: "150 Elgin Street, Ottawa, ON, Canada",
    socialLinks: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
    },
    leadership: [
      {
        id: "l1",
        name: "Amina Hassan",
        position: "Chapter President",
        photo:
          "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&q=80",
        email: "amina@umad.org",
      },
      {
        id: "l2",
        name: "Mohamed Osman",
        position: "Vice President",
        photo:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80",
        email: "m.osman@umad.org",
      },
      {
        id: "l3",
        name: "Faadumo Warsame",
        position: "Secretary",
        photo:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80",
        email: "faadumo@umad.org",
      },
    ],
    programs: [
      {
        id: "p1",
        title: "Youth Mentorship Program",
        description:
          "Connecting Somali-Canadian youth with professional mentors to support their academic and career journeys.",
        image:
          "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&q=80",
      },
      {
        id: "p2",
        title: "Settlement Support",
        description:
          "Helping newly arrived Somali families navigate Canadian systems including housing, healthcare, and education.",
        image:
          "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
      },
      {
        id: "p3",
        title: "Cultural Heritage Events",
        description:
          "Celebrating Somali culture through art, music, language workshops, and community festivals.",
        image:
          "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80",
      },
    ],
  },
  {
    id: "washington",
    slug: "washington",
    name: "Washington Chapter",
    location: "Washington D.C., USA",
    country: "USA",
    description:
      "Engaging the Somali-American community in the US capital with advocacy, education, and social support programs.",
    longDescription:
      "The UMAD Washington Chapter is strategically positioned in the US capital to advocate for the Somali community at the highest levels of government while serving the local Somali-American diaspora with vital social programs.",
    coverImage:
      "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=1200&q=80",
    history:
      "The Washington D.C. Chapter was established in 2019 by a group of Somali-American professionals and activists who saw the need for organized advocacy and community services in the greater DC metropolitan area.",
    purpose:
      "To advocate for the Somali diaspora's interests in the United States while supporting community integration and channeling diaspora resources to development projects in Somalia.",
    community:
      "The Washington Chapter serves over 8,000 Somali-Americans in the DC, Maryland, and Virginia (DMV) area.",
    goals: [
      "Advocate for favorable US policies toward Somalia and the Somali diaspora",
      "Provide social services and support to Somali-American families",
      "Create economic opportunities through networking and business development",
      "Support youth education and leadership programs",
      "Coordinate with US government and NGOs on Somalia-focused initiatives",
    ],
    email: "dc@umad.org",
    phone: "+1 (202) 555-0147",
    address: "1825 Connecticut Ave NW, Washington, DC, USA",
    socialLinks: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
    },
    leadership: [
      {
        id: "l4",
        name: "Abdirahman Shire",
        position: "Chapter Director",
        photo:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
        email: "abdirahman@umad.org",
      },
      {
        id: "l5",
        name: "Hodan Ahmed",
        position: "Programs Coordinator",
        photo:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
        email: "hodan@umad.org",
      },
      {
        id: "l6",
        name: "Omar Farah",
        position: "Outreach Manager",
        photo:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
        email: "omar@umad.org",
      },
    ],
    programs: [
      {
        id: "p4",
        title: "Policy Advocacy",
        description:
          "Engaging with policymakers to advance Somalia-friendly legislation and support for the Somali diaspora.",
        image:
          "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=80",
      },
      {
        id: "p5",
        title: "Educational Workshops",
        description:
          "Civic literacy, financial education, and professional development workshops for community members.",
        image:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80",
      },
      {
        id: "p6",
        title: "Community Health Outreach",
        description:
          "Free health screenings, mental health support, and connections to healthcare resources for the community.",
        image:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
      },
    ],
  },
  {
    id: "somalia",
    slug: "somalia",
    name: "Somalia Chapter",
    location: "Somalia",
    country: "Somalia",
    description:
      "On-the-ground operations delivering food security, healthcare access, and education to rural and underserved communities.",
    longDescription:
      "The UMAD Somalia Chapter is the heart of our on-the-ground operations. Working directly with communities across the Adal region, our Somalia Chapter implements the programs that create real, lasting change in people's lives.",
    coverImage:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=80",
    history:
      "The Somalia Chapter is UMAD's founding chapter and the original reason the organization was created. Established in 2015 by community leaders in the Adal region, it has grown from a small volunteer effort into a structured organization running multiple programs across the region.",
    purpose:
      "To directly implement development programs that address poverty reduction, food security, healthcare access, and education for communities in the Adal region of Somalia.",
    community:
      "The Somalia Chapter directly serves over 50,000 people across multiple districts, with a particular focus on rural and underserved communities.",
    goals: [
      "Ensure food security through sustainable agriculture and livestock support",
      "Improve access to quality healthcare especially in rural areas",
      "Expand educational opportunities including school construction and scholarships",
      "Support small business development and economic empowerment",
      "Implement environmental protection programs including reforestation",
    ],
    email: "somalia@umad.org",
    phone: "+252 61 555 0123",
    address: "Adal Region, Somalia",
    socialLinks: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
    },
    leadership: [
      {
        id: "l7",
        name: "Dahabo Mohamud",
        position: "Regional Director",
        photo:
          "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=300&q=80",
        email: "dahabo@umad.org",
      },
      {
        id: "l8",
        name: "Ismail Jama",
        position: "Field Operations Manager",
        photo:
          "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=300&q=80",
        email: "ismail@umad.org",
      },
      {
        id: "l9",
        name: "Nasteho Ali",
        position: "Community Liaison",
        photo:
          "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80",
        email: "nasteho@umad.org",
      },
    ],
    programs: [
      {
        id: "p7",
        title: "Agricultural Support Program",
        description:
          "Providing farmers with seeds, tools, training, and market access to achieve food security and sustainable income.",
        image:
          "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80",
      },
      {
        id: "p8",
        title: "Mobile Health Clinics",
        description:
          "Deploying mobile health units to bring preventive care, vaccinations, and maternal health services to remote villages.",
        image:
          "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80",
      },
      {
        id: "p9",
        title: "School Construction & Scholarships",
        description:
          "Building and equipping schools in underserved areas and providing scholarships to talented students.",
        image:
          "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80",
      },
    ],
  },
];

export const getChapterBySlug = (slug: string) =>
  chapters.find((c) => c.slug === slug);
