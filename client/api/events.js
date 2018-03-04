import { api } from './config';

// Fetch the events
export const getEvents = () => api
  .get('/api/events')
  .catch(err => {
    console.log('Error fetching events', err);
  });

// Fetch the events
export const getEvent = (id) => api
  .get(`/api/events/${id}`)
  .catch(err => {
    console.log('Error fetching events', err);
  });

// Fetch the all users
export const getUsers = () => api
  .get('/api/user_info')
  .catch(err => {
    console.log('Error fetching events', err);
  });

// Fetch 1 users
export const getUser = id => api
  .get(`/api/user_info/${id}`)
  .catch(err => {
    console.log('Error fetching events', err);
  });