// src/mockData.js
export const assessmentData = {
  id: "VA-2024-0123",
  conditions: 12,
  documents: 8,
  newItems: 2,
  timeframe: "this week",
};

export const updates = [
  {
    type: "event",
    title: "In-Service Event Detected",
    description: "Shoulder Injury, January 1992",
    details: "Found in military service records",
    date: "about 2 hours ago",
  },
  {
    type: "condition",
    title: "Current Condition Found",
    description: "Chronic Back Pain",
    details: "Matched against recent medical records",
    date: "about 5 hours ago",
  },
  {
    type: "nexus",
    title: "Nexus Potential Established",
    description: "Back Pain aligned with in-service spinal strain",
    details: "Suggesting stronger claim connection",
    date: "1 day ago",
  },
];


export const conditions = [
  {
    condition_name: "Chronic Back Pain", // if needed by your UI
    name: "Chronic Back Pain",           // displayed name
    in_service: false,                   // true if originally in-service
    status: "Current",                   // e.g. "Current" or "In-Service"
    date_of_visit: "2024-02-15",
    medical_professionals: "Dr. Smith (Orthopedics)",
    findings: "MRI indicates disc protrusion at L4-L5.",
    medications: "Ibuprofen, muscle relaxers",
    treatments: "Physical therapy, stretching exercises",
    comments: "Pain worsens after prolonged sitting. Ongoing issue for 2 years.",
    file: {
      name: "back_pain_report.pdf",
      url: "https://example.com/docs/back_pain_report.pdf", // optional link
    },
  },
  {
    condition_name: "Shoulder Injury",
    name: "Shoulder Injury",
    in_service: true,
    status: "In-Service",
    date_of_visit: "1992-01-15",
    medical_professionals: "Military Med Corps",
    findings: "Torn rotator cuff on the right shoulder.",
    medications: "Anti-inflammatory meds",
    treatments: "Surgery (1992), post-op physical therapy",
    comments: "Pain flares up in colder weather.",
    file: {
      name: "shoulder_injury_docs.pdf",
      url: "https://example.com/docs/shoulder_injury_docs.pdf",
    },
  },
  {
    condition_name: "Tinnitus",
    name: "Tinnitus",
    in_service: false,
    status: "Current",
    date_of_visit: "2024-01-10",
    medical_professionals: "Dr. Green (Audiologist)",
    findings: "Constant ringing in both ears, worse at night.",
    medications: "No current prescription",
    treatments: "Sound therapy machine",
    comments: "Likely related to prior acoustic trauma.",
    file: {
      name: "hearing_test_results.pdf",
      url: "https://example.com/docs/hearing_test_results.pdf",
    },
  },
  {
    condition_name: "Migraines",
    name: "Migraines",
    in_service: false,
    status: "Current",
    date_of_visit: "2025-02-01",
    medical_professionals: "Dr. Clark (Neurologist)",
    findings: "Recurring migraines triggered by bright lights and stress.",
    medications: "Sumatriptan, preventative beta-blockers",
    treatments: "Lifestyle changes, stress management, regular check-ups",
    comments: "Could be linked to prior head injury; ongoing for ~5 years.",
    file: {
      name: "migraine_report.pdf",
      url: "https://example.com/docs/migraine_report.pdf",
    },
  },
  {
    condition_name: "Depression",
    name: "Depression",
    in_service: true,
    status: "In-Service",
    date_of_visit: "2023-12-10",
    medical_professionals: "Mental Health Clinic (Base Hospital)",
    findings: "Persistent sadness, lack of energy, trouble sleeping.",
    medications: "SSRIs",
    treatments: "Therapy sessions, daily journaling",
    comments: "Likely service-related stress; monitored monthly.",
    file: {
      name: "depression_notes.pdf",
      url: "https://example.com/docs/depression_notes.pdf",
    },
  },
];

