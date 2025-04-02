// Just a JavaScript module now, no TypeScript types

export const SERVICE_BRANCHES = [
    { value: 'army', label: 'U.S. Army' },
    { value: 'navy', label: 'U.S. Navy' },
    { value: 'air-force', label: 'U.S. Air Force' },
    { value: 'marines', label: 'U.S. Marine Corps' },
    { value: 'coast-guard', label: 'U.S. Coast Guard' },
    { value: 'space-force', label: 'U.S. Space Force' },
  ];
  
  export const generateServicePeriodId = () => 
    Math.random().toString(36).substring(2, 15);
  
  /**
   * @typedef {Object} ServicePeriod
   * @property {string} id
   * @property {string} branch - One of: 'army','navy','air-force','marines','coast-guard','space-force'
   * @property {string} startDate - YYYY-MM-DD format
   * @property {string} endDate - YYYY-MM-DD format
   */
  
  /**
   * @typedef {Object} ServiceFormData
   * @property {ServicePeriod[]} servicePeriods
   * @property {File[]} documents
   */
  