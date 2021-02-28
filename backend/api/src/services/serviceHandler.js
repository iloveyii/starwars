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

async function getCharacters(title, characters) {
  console.log('Characters : ', characters.length);
  const names = [];
  characters.forEach(url => {
    const name = getCharacter(url);
    names.push(name);
  });

  const people = await Promise.all(names);
  // console.log('People: ', people);
  return { title, characters: people };
}

async function getFilms() {
  const filmsUrl = `${BASE_URL_ENDPOINT}films`;
  const { data } = await axios.get(filmsUrl);
  let films = data && data.results && Array.isArray(data.results) ? data.results : [];
  films = films.slice(0, 2);
  // Fetch people
  if (films.length > 0) {
    console.log('length', films.length);
    const filmsCharacters = [];
    films.forEach(film => {
      const characters = getCharacters(film.title, film.characters);
      filmsCharacters.push(characters);
    });

    const allPromises = await Promise.all(filmsCharacters);
    films.map(film => {
      const promise = allPromises.find(promise => promise.title === film.title);
      // console.log('title: ', film.title, promise);
      if (promise) {
        film.characters = promise.characters ? promise.characters : [];
      } else {
        console.log('no promise');
      }
    });
  }
  const filtered = films.map(film => ({
    title: film.title,
    release_date: film.release_date,
    characters: film.characters,
  }));
  return filtered;
}

export { getFilms };
