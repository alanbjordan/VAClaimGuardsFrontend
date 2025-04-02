// src/data/mockSavedDecisions.jsx

export const mockSavedDecisions = [
    {
      id: 101,
      decision_citation: '21-12345',
      decision_url: '/decisions/21-12345',
      updated_at: '2025-01-10T10:15:00Z',
    },
    {
      id: 102,
      decision_citation: '21-12346',
      decision_url: '/decisions/21-12346',
      updated_at: '2025-01-12T08:25:00Z',
    },
    {
      id: 103,
      decision_citation: '21-12347',
      decision_url: '/decisions/21-12347',
      updated_at: '2025-01-15T15:10:00Z',
    },
    {
      id: 104,
      decision_citation: '21-12348',
      decision_url: '/decisions/21-12348',
      updated_at: '2025-01-18T09:30:00Z',
    },
    {
      id: 105,
      decision_citation: '21-12349',
      decision_url: '/decisions/21-12349',
      updated_at: '2025-01-20T11:45:00Z',
    },
  ];
  
  /**
   * Simulate fetching saved decisions for the user.
   * If you want to differentiate by user, you could pass a userUUID param or filter accordingly.
   */
  export function getSavedDecisionsMock() {
    // If you want to simulate latency, uncomment:
    // return new Promise((resolve) => setTimeout(() => resolve([...mockSavedDecisions]), 500));
    return Promise.resolve([...mockSavedDecisions]); // Return a cloned array
  }
  