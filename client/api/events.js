import { api } from './config';

// Fetch the events
export const getEvents = () => api
  .get('/api/events')
  .catch(err => {
    console.log('Error fetching events', err);
  });