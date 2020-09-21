import axios from 'axios';

export function axiosWithAuth() {
  const token = localStorage.getItem('token');
  return axios.create({
    headers: {
//      Authorization: `Bearer ${token}`,
    },
    baseURL: 'https://dbidwell-dev-desk-queue.herokuapp.com',
  });
}

export function axiosWithSecret() {
  const clientID = "devdeskqueue";
  const clientSecret = "dudewheresmycarwheresyourcardude";
  const auth = window.btoa(clientID + ':' + clientSecret)
  return axios.create({
    headers: {
      Authorization: 'Basic ' + auth,
    },
    baseURL: 'https://dbidwell-dev-desek-queue.herokuapp.com',
  });
}
