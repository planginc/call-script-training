export interface SalesManualSection {
  id: string;
  title: string;
  section: string;
  description: string;
  content: string;
  fileName: string;
}

export const salesManualSections: SalesManualSection[] = [
  {
    id: 'company-and-industry',
    title: 'Company & Industry Overview',
    section: '01',
    description: 'Who we are, industry background, regulation context, and competition landscape.',
    content: '',
    fileName: '01-company-and-industry.md'
  },
  {
    id: 'debt-relief-options',
    title: 'Debt Relief Options',
    section: '02',
    description: 'Overview of different debt relief solutions and their characteristics.',
    content: '',
    fileName: '02-debt-relief-options.md'
  },
  {
    id: 'ae-role-expectations',
    title: 'AE Role & Expectations',
    section: '03',
    description: 'Account Executive responsibilities, goals, and performance expectations.',
    content: '',
    fileName: '03-ae-role-expectations.md'
  },
  {
    id: 'application-enrollment',
    title: 'Application & Enrollment',
    section: '04',
    description: 'Client application process, enrollment procedures, and account setup.',
    content: '',
    fileName: '04-application-enrollment.md'
  },
  {
    id: 'lead-management',
    title: 'Lead Management',
    section: '05',
    description: 'Lead profiling, assignment, sources, and qualification processes.',
    content: '',
    fileName: '05-lead-management.md'
  },
  {
    id: 'credit-analysis',
    title: 'Credit Analysis',
    section: '06',
    description: 'Credit report analysis, scoring factors, and client assessment.',
    content: '',
    fileName: '06-credit-analysis.md'
  },
  {
    id: 'eligible-debts',
    title: 'Eligible Debts',
    section: '07',
    description: 'Types of debts that qualify for settlement programs.',
    content: '',
    fileName: '07-eligible-debts.md'
  },
  {
    id: 'program-explanation',
    title: 'Program Explanation',
    section: '08',
    description: 'How debt settlement programs work and client expectations.',
    content: '',
    fileName: '08-program-explanation.md'
  },
  {
    id: 'budget-verification',
    title: 'Budget & Verification',
    section: '09',
    description: 'Client budget analysis and verification processes.',
    content: '',
    fileName: '09-budget-verification.md'
  },
  {
    id: 'tools-systems',
    title: 'Tools & Systems',
    section: '10',
    description: 'Software tools, systems, and resources for account executives.',
    content: '',
    fileName: '10-tools-systems.md'
  }
];

// Function to get section by ID
export const getSalesManualSection = (id: string): SalesManualSection | undefined => {
  return salesManualSections.find(section => section.id === id);
};

// Function to get all sections for search
export const getAllSalesManualContent = (): string => {
  return salesManualSections.map(section => 
    `${section.title} ${section.description} ${section.content}`
  ).join(' ');
};
