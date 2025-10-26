// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  SIGNUP: `${API_BASE_URL}/signup`,
  USERS: `${API_BASE_URL}/users`,
  JOURNALS: `${API_BASE_URL}`,
  MOODS: `${API_BASE_URL}/api/moods`,
  ANONYMOUS_POSTS: `${API_BASE_URL}/anonymousPosts`,
  CREATE_ANONYMOUS_POST: `${API_BASE_URL}/createAnonymousPosts`,
};

export default API_BASE_URL;
