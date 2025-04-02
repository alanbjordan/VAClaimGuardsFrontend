// mockDocuments.js

// Mock documents array without TypeScript types:
export const mockDocuments = [
    {
      id: '1',
      title: 'DD Form 214 - Certificate of Release',
      type: 'pdf',
      category: 'service',
      tags: ['DD214', 'discharge', 'service record'],
      uploadedBy: 'VA Records Management',
      uploadedAt: '2024-01-04T10:30:00Z',
      lastModified: '2024-01-04T10:30:00Z',
      size: 2.1 * 1024 * 1024,
      status: 'verified',
      url: '/documents/dd214.pdf',
      confidential: true,
      sourceSystem: 'DoD Personnel',
    },
    {
      id: '2',
      title: 'VA Disability Rating Decision',
      type: 'pdf',
      category: 'claims',
      tags: ['disability', 'rating', 'decision'],
      uploadedBy: 'VA Claims Processing',
      uploadedAt: '2024-02-15T15:45:00Z',
      lastModified: '2024-02-15T15:45:00Z',
      size: 1.8 * 1024 * 1024,
      status: 'verified',
      url: '/documents/rating-decision.pdf',
      confidential: true,
      sourceSystem: 'VA Benefits',
    },
    {
      id: '3',
      title: 'Medical Treatment Records - 2023',
      type: 'pdf',
      category: 'medical',
      tags: ['medical', 'treatment', 'records'],
      uploadedBy: 'VA Medical Center',
      uploadedAt: '2024-01-20T09:15:00Z',
      lastModified: '2024-01-20T09:15:00Z',
      size: 5.4 * 1024 * 1024,
      status: 'verified',
      url: '/documents/medical-records-2023.pdf',
      confidential: true,
      sourceSystem: 'VA Health',
    },
    {
      id: '4',
      title: 'GI Bill Certificate of Eligibility',
      type: 'pdf',
      category: 'education',
      tags: ['education', 'GI Bill', 'benefits'],
      uploadedBy: 'VA Education Office',
      uploadedAt: '2024-03-01T14:20:00Z',
      lastModified: '2024-03-01T14:20:00Z',
      size: 1.1 * 1024 * 1024,
      status: 'verified',
      url: '/documents/gi-bill-coe.pdf',
      confidential: true,
      sourceSystem: 'VA Education',
    },
    {
      id: '5',
      title: 'VA Home Loan Certificate',
      type: 'pdf',
      category: 'housing',
      tags: ['housing', 'loan', 'certificate'],
      uploadedBy: 'VA Home Loan Center',
      uploadedAt: '2024-02-28T11:30:00Z',
      lastModified: '2024-02-28T11:30:00Z',
      size: 890 * 1024,
      status: 'verified',
      url: '/documents/home-loan-cert.pdf',
      confidential: true,
      sourceSystem: 'VA Housing',
    },
    {
      id: '6',
      title: 'Veteran ID Card Photo',
      type: 'jpg',
      category: 'identification',
      tags: ['ID', 'photo', 'identification'],
      uploadedBy: 'Veteran',
      uploadedAt: '2024-01-10T16:45:00Z',
      lastModified: '2024-01-10T16:45:00Z',
      size: 250 * 1024,
      status: 'pending_review',
      url: '/documents/id-photo.jpg',
      confidential: true,
      expirationDate: '2029-01-10T16:45:00Z',
    },
    {
      id: '7',
      title: 'VA Correspondence - Benefits Update',
      type: 'pdf',
      category: 'correspondence',
      tags: ['letter', 'benefits', 'update'],
      uploadedBy: 'VA Benefits Administration',
      uploadedAt: '2024-03-05T13:20:00Z',
      lastModified: '2024-03-05T13:20:00Z',
      size: 420 * 1024,
      status: 'needs_update',
      url: '/documents/benefits-update.pdf',
      confidential: true,
      sourceSystem: 'VA Benefits',
    }
  ];
  
  // Options object can be passed to searchDocuments to filter results
  // categories: Array of categories to filter by
  // status: Array of statuses to filter by
  // dateRange: { start: string, end: string } (ISO date strings)
  // tags: Array of tags
  // confidential: boolean
  export function searchDocuments(query, options = {}) {
    let results = [...mockDocuments];
  
    // Search by query
    if (query) {
      const searchTerms = query.toLowerCase();
      results = results.filter(doc => 
        doc.title.toLowerCase().includes(searchTerms) ||
        (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(searchTerms))) ||
        doc.category.toLowerCase().includes(searchTerms)
      );
    }
  
    // Filter by categories
    if (options.categories && options.categories.length) {
      results = results.filter(doc => options.categories.includes(doc.category));
    }
  
    // Filter by status
    if (options.status && options.status.length) {
      results = results.filter(doc => options.status.includes(doc.status));
    }
  
    // Filter by date range
    if (options.dateRange) {
      const { start, end } = options.dateRange;
      const startDate = new Date(start);
      const endDate = new Date(end);
      
      results = results.filter(doc => {
        const docDate = new Date(doc.uploadedAt);
        return docDate >= startDate && docDate <= endDate;
      });
    }
  
    // Filter by tags
    if (options.tags && options.tags.length) {
      results = results.filter(doc =>
        doc.tags && doc.tags.some(tag => options.tags.includes(tag))
      );
    }
  
    // Filter by confidentiality
    if (typeof options.confidential === 'boolean') {
      results = results.filter(doc => doc.confidential === options.confidential);
    }
  
    return {
      results,
      total: results.length,
    };
  }
  