import axios from 'axios';

/**
 * Fetches conditions, feed updates, and documents in parallel,
 * then returns them in a single object.
 *
 * @param {Object} params
 * @param {string} params.userUUID - The user's unique ID
 * @param {string} params.apiUrl - The base API URL
 * @returns {Promise<{ conditions: Array, feedUpdates: Array, documents: Array }>}
 */
export async function fetchDashboardData({ userUUID, apiUrl }) {
  // Retrieve userToken from localStorage
  const userToken = localStorage.getItem('userToken');
  if (!userToken) {
    throw new Error('User token is missing from localStorage.');
  }

  const headers = {
    'Authorization': `Bearer ${userToken}`, // Include auth token
  };

  // Fire off the request for limited feed updates (summary data)
  const [feedUpdatesRes] = await Promise.all([
    axios.get(`${apiUrl}/limited_feed_updates?userUUID=${userUUID}&limit=3`, { headers, withCredentials: true }),
  ]);

  const feedUpdates = feedUpdatesRes.data || [];

  return {
    feedUpdates,
  };
}
