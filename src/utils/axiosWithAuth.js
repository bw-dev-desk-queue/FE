import axios from 'axios';

export function axiosWithAuth() {
  const token = localStorage.getItem('token');
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    baseURL: 'https://dbidwell-dev-desk-queue.herokuapp.com',
  });
}

// do something like axiosWithSecret('/endpoint', 
// grant_type=password&username=admin&password=admin )
export function axiosWithSecret() {
  const clientID = "devdeskqueue";
  const clientSecret = "dudewheresmycarwheresyourcardude";
  const auth = window.btoa(clientID + ':' + clientSecret)
  return axios.create({
    headers: {
      Authorization: 'Basic ' + auth,
      "Content-Type": 'application/x-www-form-urlencoded',
    },
    baseURL: 'https://dbidwell-dev-desk-queue.herokuapp.com',
  });
}

export function axiosSignup() {
  const clientID = "devdeskqueue";
  const clientSecret = "dudewheresmycarwheresyourcardude";
  const auth = window.btoa(clientID + ':' + clientSecret)
  return axios.create({
    headers: {
      Authorization: 'Basic ' + auth,
    },
    baseURL: 'https://dbidwell-dev-desk-queue.herokuapp.com',
  });
}
