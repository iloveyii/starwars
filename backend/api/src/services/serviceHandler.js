/**
 * Service for getting exchange data
 * from an external API
 */
import axios from 'axios';
export const BASE_URL_ENDPOINT = 'https://swapi.dev/api/';

async function getFilms() {
  const filmsUrl = `${BASE_URL_ENDPOINT}films`;
  const { data } = await axios.get(filmsUrl);
  return data;
}

async function getFilmsWithSelectedAttributes(attributes) {
  const filmsUrlGql = 'http://localhost:4000';
  const { data } = await axios.post(filmsUrlGql, attributes);
  console.log(data);
  return data;
}

export { getFilms, getFilmsWithSelectedAttributes };
