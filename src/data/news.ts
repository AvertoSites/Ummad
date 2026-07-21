export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  videoUrl?: string;
  author: string;
  publishedAt: string;
  category: string;
  chapterId: string;
  chapterName: string;
  tags: string[];
}

export const newsArticles: NewsArticle[] = [
  {
    id: "n1",
    title: "UMAD Launches New Agricultural Support Initiative in Adal Region",
    slug: "umad-agricultural-support-adal",
    excerpt:
      "A new program provides 500 farming families with seeds, tools, and training to achieve food security and sustainable income.",
    content: `UMAD's Somalia Chapter has officially launched a new agricultural support initiative targeting 500 farming families across the Adal region. The program provides high-yield seeds, modern farming tools, and hands-on training from agronomists.

"Food security is the foundation of everything we do," said Dahabo Mohamud, Regional Director of the Somalia Chapter. "When families can feed themselves, they can focus on education, healthcare, and building a better future."

The initiative is funded through a combination of diaspora donations from the Ottawa and Washington chapters and a matching grant from a partner development organization. Over the next 12 months, the program will also establish a microfinance component to help farmers expand their operations.

Community leaders in participating villages have welcomed the program, noting that previous seasons have seen crop failures due to drought. The new drought-resistant seed varieties being introduced are expected to significantly improve yields even in challenging conditions.

UMAD plans to document the program's impact and share results with donors and partner organizations at the end of the growing season.`,
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
    author: "Dahabo Mohamud",
    publishedAt: "2026-07-15",
    category: "Food Security",
    chapterId: "somalia",
    chapterName: "Somalia Chapter",
    tags: ["agriculture", "food security", "somalia", "development"],
  },
  {
    id: "n2",
    title: "Ottawa Chapter Youth Leadership Summit Draws 200 Participants",
    slug: "ottawa-youth-leadership-summit",
    excerpt:
      "The annual Youth Leadership Summit brought together Somali-Canadian young people for workshops on civic engagement and career development.",
    content: `The UMAD Ottawa Chapter's fourth annual Youth Leadership Summit was held last weekend, drawing over 200 Somali-Canadian youth from across the National Capital Region.

The two-day event featured workshops on civic engagement, financial literacy, career planning, and Somali cultural heritage. Keynote speakers included a Member of Parliament, a prominent Somali-Canadian entrepreneur, and a recent university graduate who credited UMAD's mentorship program with helping her secure a scholarship.

"Events like this show our young people that they belong — both here in Canada and as proud members of the Somali community," said Amina Hassan, Chapter President. "They are the bridge between two great cultures."

Attendees participated in panel discussions, networking sessions, and a cultural showcase featuring Somali music, poetry, and food. The event concluded with the announcement of the chapter's new mentorship cohort, which will pair 40 youth with professional mentors for the upcoming academic year.

Registration for next year's summit will open in early 2027.`,
    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
    author: "Amina Hassan",
    publishedAt: "2026-07-10",
    category: "Youth",
    chapterId: "ottawa",
    chapterName: "Ottawa Chapter",
    tags: ["youth", "leadership", "ottawa", "education"],
  },
  {
    id: "n3",
    title: "Washington Chapter Advocates for Increased US Aid to Somalia",
    slug: "washington-chapter-somalia-aid-advocacy",
    excerpt:
      "Chapter representatives met with Congressional staffers to advocate for increased humanitarian and development assistance to Somalia.",
    content: `The UMAD Washington Chapter conducted a successful advocacy day on Capitol Hill, with representatives meeting with staff from 12 Congressional offices to discuss US policy toward Somalia and the needs of Somali communities.

The delegation, led by Chapter Director Abdirahman Shire, presented a policy brief outlining recommendations for increased US investment in Somali healthcare infrastructure, food security programs, and education.

"The United States has both a strategic interest and a humanitarian responsibility to support Somalia's development," Shire said. "We were encouraged by the positive reception we received and the genuine interest many offices showed in learning more about the situation on the ground."

The chapter also met with representatives from USAID and the State Department's Bureau of African Affairs to discuss potential partnership opportunities.

Following the advocacy day, the chapter announced that two Congressional offices have agreed to host Somalia-focused briefings for their members later this year.`,
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
    author: "Abdirahman Shire",
    publishedAt: "2026-07-05",
    category: "Advocacy",
    chapterId: "washington",
    chapterName: "Washington Chapter",
    tags: ["advocacy", "washington", "policy", "us-somalia"],
  },
  {
    id: "n4",
    title: "Mobile Health Clinics Reach 3,000 Patients in Rural Districts",
    slug: "mobile-clinics-3000-patients",
    excerpt:
      "UMAD's mobile health units completed their quarterly circuit through remote villages, providing free consultations, vaccinations, and maternal health services.",
    content: `UMAD's Somalia Chapter has completed another successful quarterly round of mobile health clinic visits, reaching over 3,000 patients across 15 villages in remote districts.

The mobile units, staffed by doctors, nurses, and community health workers, provided general consultations, vaccinations for children under five, prenatal checkups, and reproductive health services.

Health coordinator Ismail Jama noted that early detection of malnutrition in children was a significant outcome of this round of visits. "We identified 47 children with moderate acute malnutrition and enrolled them in our nutritional support program immediately," he said.

The clinic program is supported by contributions from both the Ottawa and Washington chapters, supplemented by supplies donated by international medical partners.

UMAD is currently seeking additional funding to expand the mobile clinic program to cover three more districts in the next fiscal year.`,
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80",
    author: "Ismail Jama",
    publishedAt: "2026-06-28",
    category: "Healthcare",
    chapterId: "somalia",
    chapterName: "Somalia Chapter",
    tags: ["health", "mobile clinics", "somalia", "rural"],
  },
  {
    id: "n5",
    title: "Ottawa Chapter Celebrates Somali Cultural Heritage Month",
    slug: "ottawa-cultural-heritage-month",
    excerpt:
      "A month-long series of events celebrated Somali art, music, cuisine, and history in Ottawa, drawing thousands of participants.",
    content: `The UMAD Ottawa Chapter organized a rich calendar of events throughout Cultural Heritage Month, celebrating the contributions of Somali-Canadians to Ottawa's diverse tapestry.

Highlights included a traditional Somali art exhibition at the Ottawa Public Library, a food festival at Lansdowne Park that attracted over 1,500 visitors, a film screening of a documentary about the Somali diaspora experience, and a language workshop for Somali youth born in Canada.

"Cultural heritage isn't just about looking back — it's about giving our children roots so they can have wings," said Secretary Faadumo Warsame, who coordinated the month's programming.

The month culminated in a gala dinner where the chapter recognized five community members for their contributions to both the Somali-Canadian community and UMAD's global mission.

Plans for an expanded Cultural Heritage Month celebration are already underway for 2027.`,
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    author: "Faadumo Warsame",
    publishedAt: "2026-06-20",
    category: "Culture",
    chapterId: "ottawa",
    chapterName: "Ottawa Chapter",
    tags: ["culture", "heritage", "ottawa", "community"],
  },
  {
    id: "n6",
    title:
      "UMAD Completes Construction of Three New Classrooms in Rural School",
    slug: "umad-new-classrooms-rural-school",
    excerpt:
      "Three new classrooms at a rural school in the Adal region will accommodate 150 additional students starting next semester.",
    content: `UMAD's Somalia Chapter has completed the construction of three new classrooms at a primary school in a rural district of the Adal region, a project funded entirely through diaspora donations.

The new classrooms will allow the school to accommodate 150 additional students, reducing class sizes from an overcrowded average of 65 students per class to a more manageable 40.

"These classrooms represent the dreams of our diaspora community who believe that education is the most powerful investment we can make in Somalia's future," said Nasteho Ali, Community Liaison.

The construction project employed 28 local workers and used locally sourced materials where possible, providing an economic benefit to the surrounding community beyond just the educational impact.

The project was celebrated at a community ceremony attended by local officials, teachers, parents, and students. UMAD is planning a similar project at two more schools in neighboring districts next year.`,
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
    author: "Nasteho Ali",
    publishedAt: "2026-06-12",
    category: "Education",
    chapterId: "somalia",
    chapterName: "Somalia Chapter",
    tags: ["education", "schools", "somalia", "construction"],
  },
];

export const getArticleBySlug = (slug: string) =>
  newsArticles.find((a) => a.slug === slug);

export const getArticlesByChapter = (chapterId: string) =>
  newsArticles.filter((a) => a.chapterId === chapterId);
