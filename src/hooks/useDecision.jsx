import { useState } from 'react';
import { mockDecisions } from '../data/mockDecisions';

export function useDecision(id) {
  const [decision] = useState(() => {
    if (!id) return null;
    return mockDecisions.find(d => d.id === id) || null;
  });

  return { decision };
}
