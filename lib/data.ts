// lib/data.ts
//
// Single source of truth for site copy. Every field here traces back to a
// fact confirmed in the original build brief. Fields still pending client
// confirmation are marked accordingly rather than invented.

export const identity = {
  name: "Mian Umair",
  title: "Advocate, High Court",
  location: "Faisalabad, Pakistan",
  positioning: "Trusted legal counsel & corporate advocacy in Faisalabad",
  mediaInitiative: "Law Talks with Umair",
};

export const contact = {
  phone: null as string | null, // CONFIRM_WITH_CLIENT
  whatsapp: null as string | null, // CONFIRM_WITH_CLIENT
  email: null as string | null, // CONFIRM_WITH_CLIENT
  officeAddress:
    "Office No. 119-A, 2nd Floor, Regent Mall, Chen One Road, Faisalabad, Pakistan",
  officeHours: "Monday – Saturday",
  chamberTiming: "3:00 PM – 7:00 PM",
  chamberNote: "Evening chambers, aligned with typical court timings",
};

export const credentials = {
  litigationYears: "5+",
  courtLevels: "District Courts up to the High Court",
  barCouncilRegistrationNumber: null as string | null, // CONFIRM_WITH_CLIENT
  barEnrollmentDate: null as string | null, // CONFIRM_WITH_CLIENT
};

export type PracticeArea = {
  id: string;
  title: string;
  shortTitle: string;
  summary: string;
  categoryValue: string;
};

export const practiceAreas: PracticeArea[] = [
  {
    id: "corporate-commercial",
    title: "Corporate & Commercial Law",
    shortTitle: "Corporate & Commercial",
    summary:
      "Legal advisory, business compliance, contract drafting, and representation of public and private sector utilities.",
    categoryValue: "Corporate & Commercial",
  },
  {
    id: "civil-litigation",
    title: "Civil Litigation & Liability",
    shortTitle: "Civil Litigation",
    summary: "Property disputes, recovery suits, breach of contract, and appellate writs.",
    categoryValue: "Civil Litigation",
  },
  {
    id: "criminal-defense",
    title: "Criminal Defense",
    shortTitle: "Criminal Defense",
    summary:
      "High-stakes trials, bail applications, and appellate litigation before the Sessions and High Court.",
    categoryValue: "Criminal Defense",
  },
  {
    id: "family-inheritance",
    title: "Family & Inheritance Law",
    shortTitle: "Family & Inheritance",
    summary: "Family rights, divorce proceedings, child custody, and division of assets.",
    categoryValue: "Family & Inheritance",
  },
  {
    id: "consumer-protection",
    title: "Consumer Protection",
    shortTitle: "Consumer Protection",
    summary:
      "Public and individual claims under consumer law frameworks, backed by direct DCPC membership.",
    categoryValue: "Consumer Protection",
  },
];

export const publicServiceRoles = [
  {
    role: "Member, District Consumer Protection Council (DCPC)",
    body: "Faisalabad — participates in the public body that hears and adjudicates consumer complaints for the district.",
  },
  {
    role: "Accredited Advocate, Punjab Legal Aid Agency",
    body: "Government of Punjab — accredited to provide legal aid representation under the provincial legal aid framework.",
  },
  {
    role: "Visiting Lecturer in Law",
    body: "University of Agriculture Faisalabad (UAF) — teaches law on a visiting basis alongside active practice.",
  },
];

export const retainers = [
  { name: "SNGPL", fullName: "Sui Northern Gas Pipelines Limited", sector: "Energy / Utility" },
  { name: "FESCO", fullName: "Faisalabad Electric Supply Company", sector: "Energy / Utility" },
  { name: "TMA", fullName: "Tehsil Municipal Administration", sector: "Local Government" },
];

export const trackRecord = [
  {
    label: "A",
    title: "District to High Court litigation",
    body: "5+ years of active practice, appearing at multiple judicial levels.",
  },
  {
    label: "B",
    title: "Public-sector advisory",
    body: "Standing legal advisor to SNGPL, FESCO, and TMA on corporate and compliance matters.",
  },
  {
    label: "C",
    title: "Public interest & education",
    body: 'Runs "Law Talks with Umair" for public legal awareness, and teaches as a Visiting Lecturer at UAF.',
  },
];

export const lawTalks = [
  {
    title: "Child Custody Law in Faisalabad, Explained",
    category: "Family & Inheritance",
    summary: "A plain-language walkthrough of how custody is decided under Pakistani family law.",
  },
  {
    title: "What Counts as a Consumer Complaint?",
    category: "Consumer Protection",
    summary: "Where the District Consumer Protection Council can and can't help you.",
  },
  {
    title: "Bail Applications: What to Expect",
    category: "Criminal Defense",
    summary: "The stages of a bail application from arrest to hearing.",
  },
];
