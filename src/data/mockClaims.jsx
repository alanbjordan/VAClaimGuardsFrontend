// src/data/mockClaims.js

// A simple array of mock claims, each with various fields
export const mockClaims = [
  {
    claim_id: '001',
    claim_name: 'Back Pain Claim',
    status: 'In Progress',
    date_filed: '2024-01-15',
    conditions: ['Chronic Back Pain', 'Sciatica'],
    last_updated: '2024-01-20',
    evidence_progress: 60, // Example percentage
    description: `Claim submitted for chronic lower back pain and sciatica,
      possibly related to in-service injuries during deployment in 2003.
      Veteran experiences daily pain and limited mobility.`,
    evidence: [
      {
        evidence_id: 'E-001A',
        type: 'Service Records',
        date: '2024-01-10',
        details: 'Deployment health record indicating back injury in 2003',
      },
      {
        evidence_id: 'E-001B',
        type: 'MRI Results',
        date: '2024-01-14',
        details: 'MRI scan showing disc herniation at L4-L5',
      },
    ],
  },
  {
    claim_id: '002',
    claim_name: 'Hearing Loss Claim',
    status: 'Submitted',
    date_filed: '2023-12-10',
    conditions: ['Bilateral Hearing Loss'],
    last_updated: '2024-01-01',
    evidence_progress: 30,
    description: `Claim filed for bilateral hearing loss. 
      Veteran reports significant hearing difficulties in normal conversation 
      and believes exposure to loud engine noise while on active duty is the cause.`,
    evidence: [
      {
        evidence_id: 'E-002A',
        type: 'Audiogram',
        date: '2023-12-12',
        details: 'Audiometry test showing moderate bilateral hearing impairment',
      },
    ],
  },
  {
    claim_id: '003',
    claim_name: 'Migraines Claim',
    status: 'In Progress',
    date_filed: '2024-02-01',
    conditions: ['Migraines'],
    last_updated: '2024-02-15',
    evidence_progress: 45,
    description: `Claim seeks service connection for chronic migraines. Veteran states
      migraines began during service in 2010 and have worsened over time, causing 
      frequent absences from work.`,
    evidence: [
      {
        evidence_id: 'E-003A',
        type: 'Neurology Exam',
        date: '2024-02-05',
        details: 'Neurological evaluation noting recurring migraines',
      },
      {
        evidence_id: 'E-003B',
        type: 'Prescription Records',
        date: '2024-02-10',
        details: 'Medication history for migraine treatments',
      },
    ],
  },
];

// If you want additional claims, just replicate the pattern above

/**
 * Returns a clone of the entire claims array. 
 * If you want to simulate latency, you can wrap in a setTimeout.
 */
export function getAllMockClaims() {
  return Promise.resolve([...mockClaims]);
}

/**
 * Returns a single claim by ID. 
 * Rejects if not found. 
 * Returns a clone so we don't mutate the original array.
 */
export function getClaimById(claimId) {
  const found = mockClaims.find((c) => c.claim_id === claimId);
  if (!found) {
    return Promise.reject(new Error(`Claim with ID "${claimId}" not found.`));
  }
  return Promise.resolve({ ...found });
}

/**
 * Creates a new claim in-memory, generating a random ID. 
 * Unshifts the claim to the front of the array.
 */
export function createMockClaim(newClaim) {
  const randomId = Math.floor(Math.random() * 100000).toString();
  const claimToSave = {
    claim_id: randomId,
    ...newClaim,
  };
  mockClaims.unshift(claimToSave);
  return Promise.resolve(claimToSave);
}

/**
 * Updates an existing claim in-memory by claim_id. 
 * Merges the fields from updatedData into the found claim. 
 * Returns the updated claim.
 */
export function updateMockClaim(claimId, updatedData) {
  const idx = mockClaims.findIndex((c) => c.claim_id === claimId);
  if (idx === -1) {
    return Promise.reject(new Error('Claim not found'));
  }
  mockClaims[idx] = {
    ...mockClaims[idx],
    ...updatedData,
  };
  return Promise.resolve(mockClaims[idx]);
}

/**
 * Deletes an existing claim in-memory by claim_id. 
 * Returns the removed claim.
 */
export function deleteMockClaim(claimId) {
  const idx = mockClaims.findIndex((c) => c.claim_id === claimId);
  if (idx === -1) {
    return Promise.reject(new Error('Claim not found'));
  }
  const removed = mockClaims.splice(idx, 1);
  return Promise.resolve(removed[0]);
}
