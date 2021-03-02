/**
 * Service for getting exchange data
 * from an external API
 */
import axios from "axios";
export const BASE_URL_ENDPOINT = "https://swapi.dev/api/";
const DEBUG = true;

function log(...args: any) {
  if (DEBUG) {
    console.log(...args);
  }
}
// Get a single character from api, name
async function getCharacter(url: string) {
  log("In Character : ", url);
  const data = await axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("Error occurred in fetching Character fro api");
    });
  const name = data && data.name ? data.name : "";
  log("In Character return: ", url, name);
  return name;
}

// Get all characters of a specifig move
async function getCharacters(title: string, characters: any[]) {
  log("Characters : ", characters.length);
  const names: any = [];
  characters.forEach((url: string) => {
    const name = getCharacter(url);
    names.push(name);
  });

  const people = await Promise.all(names);
  return { title, characters: people };
}

// Get all films from api
async function getFilms() {
  const filmsUrl = `${BASE_URL_ENDPOINT}films`;

  let data: any = "";
  try {
    data = await axios.get(filmsUrl);
    data = data.data;
  } catch (error) {
    console.error("Error occurred in fetching Character fro api");
  }

  let films =
    data && data.results && Array.isArray(data.results) ? data.results : [];
  // films = films.slice(0, 3);
  // Fetch people
  if (films.length > 0) {
    log("length", films.length);
    const filmsCharacters: any = [];
    films.forEach((film: any) => {
      const characters = getCharacters(film.title, film.characters);
      filmsCharacters.push(characters);
    });

    const allPromises = await Promise.all(filmsCharacters);
    films.map((film: any) => {
      const promise: any = allPromises.find(
        (promise: any) => promise.title === film.title
      );
      if (promise) {
        film.characters = promise.characters ? promise.characters : [];
      } else {
        log("no promise");
      }
    });
  }
  const filtered = films.map((film: any) => ({
    title: film.title,
    release_date: film.release_date,
    characters: film.characters,
  }));
  return filtered;
}

export { getFilms };
