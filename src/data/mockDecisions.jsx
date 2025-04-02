// src/data/mockDecisions.js

/**
 * A list of mock BVA decisions. 
 * You can expand each `bodyText` with a paragraph or more to simulate real decision content.
 */
export const mockDecisions = [
  {
    id: '1',
    title: 'Decision 123456',
    citation: '21-12345',
    description: 'Service connection for post-traumatic stress disorder (PTSD). Evidence demonstrates clear diagnosis and service-related stressor.',
    date: 'March 15, 2024',
    type: 'Medical Appeal',
    url: '/decisions/21-12345',
    bodyText: `Lorem ipsum dolor sit amet, PTSD reasonings... (Body text for decision 1).`,
    details: {
      citation: '21-12345',
      decisionDate: '03/15/2024',
      archiveDate: '03/25/2024',
      docketNo: '22-12 345',
      regionalOffice: 'Phoenix, Arizona',
      issue: 'Entitlement to service connection for PTSD.',
      representation: 'Disabled American Veterans',
      attorney: 'T. Johnson, Associate Counsel',
      introduction: `The Veteran served on active duty from July 2001 to July 2005...`,
      finding: `The evidence supports the conclusion...`,
      conclusion: `The criteria for service connection for PTSD have been met...`,
    },
  },
  {
    id: '2',
    title: 'Decision 123457',
    citation: '21-12346',
    description: 'Increased rating claim for bilateral hearing loss. Medical evidence shows worsening condition supported by audiological exam.',
    date: 'March 14, 2024',
    type: 'Compensation',
    url: '/decisions/21-12346',
    bodyText: `Longer text about hearing loss... (Body text for decision 2).`,
    details: {
      citation: '21-12346',
      decisionDate: '03/14/2024',
      archiveDate: '03/24/2024',
      docketNo: '22-12 346',
      regionalOffice: 'Houston, Texas',
      issue: 'Entitlement to an increased rating for bilateral hearing loss.',
      representation: 'The American Legion',
      attorney: 'M. Carter, Associate Counsel',
      introduction: `The Veteran served on active duty from January 1980 to January 1984...`,
      finding: `Medical evidence demonstrates worsening hearing loss...`,
      conclusion: `The criteria for a higher disability rating...`,
    },
  },
  {
    id: '3',
    title: 'Decision 123458',
    citation: '21-12347',
    description: 'Appeal for denied disability compensation for sleep apnea. Veteran provides new evidence for service connection.',
    date: 'March 13, 2024',
    type: 'Compensation',
    url: '/decisions/21-12347',
    bodyText: `Body text about sleep apnea and new evidence... (Body text for decision 3).`,
    details: {
      citation: '21-12347',
      decisionDate: '03/13/2024',
      // ...
    },
  },
  {
    id: '4',
    title: 'Decision 123459',
    citation: '21-12348',
    description: 'Claim for service connection for back injury. Evidence indicates chronic pain related to service conditions.',
    date: 'March 12, 2024',
    type: 'Medical Appeal',
    url: '/decisions/21-12348',
    bodyText: `Body text about back injury... (Body text for decision 4).`,
    details: {
      citation: '21-12348',
      decisionDate: '03/12/2024',
      // ...
    },
  },
  {
    id: '5',
    title: 'Decision 123460',
    citation: '21-12349',
    description: 'Appeal for denied disability compensation for sleep apnea. Veteran provides new evidence for service connection.',
    date: 'March 11, 2024',
    type: 'Compensation',
    url: '/decisions/21-12349',
    bodyText: `Some other text about a sleep apnea claim... (Body text for decision 5).`,
    details: {
      citation: '21-12349',
      decisionDate: '03/11/2024',
      // ...
    },
  },
  // Add more decisions as needed
];

/**
 * searchMockDecisions - a simple local search function.
 * Accepts a string query, optional filters (decisionDate, decisionType).
 */
export function searchMockDecisions(query, filters = {}) {
  const lowerCaseQuery = query.toLowerCase();

  // Filter based on query + optional filters
  let results = mockDecisions.filter((decision) => {
    // Match if the query is in the description, title, or citation
    const matchesQuery =
      decision.description.toLowerCase().includes(lowerCaseQuery) ||
      decision.title.toLowerCase().includes(lowerCaseQuery) ||
      decision.citation.toLowerCase().includes(lowerCaseQuery);

    // Filter by date if provided
    const matchesDate =
      !filters.decisionDate || decision.date === filters.decisionDate;

    // Filter by type if provided
    const matchesType =
      !filters.decisionType || decision.type === filters.decisionType;

    return matchesQuery && matchesDate && matchesType;
  });

  return {
    results,
    total: results.length,
  };
}

/**
 * getDecisionById - retrieves a single decision object from the mock data by ID
 */
export function getDecisionById(id) {
  return mockDecisions.find((decision) => decision.id === id);
}
