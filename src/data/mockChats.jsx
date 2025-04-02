// src/data/mockChats.js

// Array of mock chat threads
export const mockThreads = [
    {
      thread_id: 'thread_abc123',
      created_at: '2025-01-30T12:34:56Z',
      messages_count: 7,
      first_message_preview: 'Hello there! I need help with my claim...',
    },
    {
      thread_id: 'thread_xyz789',
      created_at: '2025-02-01T08:15:30Z',
      messages_count: 3,
      first_message_preview: 'Good morning, I have a question about my conditions...',
    },
    {
      thread_id: 'thread_jkl456',
      created_at: '2025-02-05T17:22:10Z',
      messages_count: 10,
      first_message_preview: 'Hi, I just wanted an update on the status of...',
    },
  ];
  
  // Function to simulate fetching chat threads
  export function getAllMockThreads() {
    // If you'd like to simulate network delay:
    // return new Promise((resolve) => setTimeout(() => resolve([...mockThreads]), 500));
    return Promise.resolve([...mockThreads]); // Return a cloned array
  }
  