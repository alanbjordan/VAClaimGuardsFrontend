// src/data/mockStatements.jsx

// An array of "tags" each with some "conditions"
export const mockTagsData = [
    {
      tag_id: 101,
      tag_name: 'Shoulder Condition',
      description: 'Possible rotator cuff tear, chronic pain, limited motion.',
      conditions: [
        {
          condition_id: 501,
          condition_name: 'Right Shoulder Pain',
          date_of_visit: '2024-01-10',
        },
        {
          condition_id: 502,
          condition_name: 'Left Shoulder Strain',
          date_of_visit: '2023-12-18',
        },
      ],
    },
    {
      tag_id: 102,
      tag_name: 'Knee Condition',
      description: 'Osteoarthritis, cartilage damage, patellar issues.',
      conditions: [
        {
          condition_id: 601,
          condition_name: 'Left Knee Osteoarthritis',
          date_of_visit: '2023-11-05',
        },
        {
          condition_id: 602,
          condition_name: 'Right Knee Cartilage Tear',
          date_of_visit: '2024-02-14',
        },
      ],
    },
  ];
  
  /**
   * Simulate fetching the tags/conditions locally.
   * You can also add a setTimeout to mimic async fetch.
   */
  export function getMockTagsData() {
    return Promise.resolve([...mockTagsData]);
  }
  
  /**
   * Simulate generating a claim summary statement.
   * In real code, you'd pass in userUUID, etc., 
   * but here we just return a success message after a delay.
   */
  export async function generateClaimSummary(userUUID, tagsArray) {
    // Do whatever logic you want to "build" a statement
    // For example, just return a mock success message
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: 'Your Statement in Support of Claim was successfully generated (mock).',
          file_id: 999, // mock file ID
        });
      }, 700); // short delay
    });
  }
  