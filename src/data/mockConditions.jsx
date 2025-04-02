// src/data/mockConditions.js

// A simple array of mock "conditions" items
export const mockConditionsData = [
    {
      condition_id: '1001',
      condition_name: 'Chronic Back Pain',
    },
    {
      condition_id: '1002',
      condition_name: 'Hearing Loss',
    },
    {
      condition_id: '1003',
      condition_name: 'Migraines',
    },
    {
      condition_id: '1004',
      condition_name: 'PTSD',
    },
  ];
  
  // If you want to simulate a fetch, you can wrap it in a Promise:
  export function fetchMockConditions() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockConditionsData]); // Return a clone
      }, 400); // Simulate 0.4s network delay
    });
  }
  