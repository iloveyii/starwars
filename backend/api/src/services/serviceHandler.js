/**
 * Service for getting exchange data
 * from an external API
 */
import axios from 'axios';
export const BASE_URL_ENDPOINT = 'https://swapi.dev/api/';

async function getCharacter(url) {
  const data = await axios.get(url).then(response => {
    return response.data;
  });
  const name = data && data.name ? data.name : '';
  return name;
}

async function getCharacters(characters) {
  console.log('Characters : ', characters.length);
  const names = [];
  characters.forEach(url => {
    const name = getCharacter(url);
    names.push(name);
  });

  const people = await Promise.all(names);
  console.log('People: ', people);
  return names;
}

async function getFilms() {
  const filmsUrl = `${BASE_URL_ENDPOINT}films`;
  const { data } = await axios.get(filmsUrl);
  const films = data && data.results && Array.isArray(data.results) ? data.results : [];

  // Fetch people
  if (films.length > 0) {
    console.log('length', films.length);
    /* const newFilms = films.map(film => {
      return {
        title: film.title,
        release_date: film.release_date,
        characters: async () => await getCharacters(film.characters),
      };
    }); */

    await getCharacters(films[0].characters);
  }
  return films;
}

async function getFilmsWithSelectedAttributes(attributes) {
  const filmsUrlGql = 'http://localhost:4000';
  const { data } = await axios.post(filmsUrlGql, attributes);
  // console.log(data);
  return data;
}

getFilms();

export { getFilms, getFilmsWithSelectedAttributes };
