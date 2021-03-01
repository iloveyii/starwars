# Start Wars

A small react/node app to show movies of start wars from an open API.

- The application contains two sub folders, backend and frontend
- Backend is written in node and provide api data
- Frontend is written in React 16.13 and is user UI.

## Installations

- Please adjust .env file (e.g API_URL if it is not localhost)

### backend

- cd to backend
- copy .env-example to .env
- `npm install`
- `npm start`

### frontend

- cd to backend
- copy .env-example to .env
- `npm install`
- `npm start`
- if you want to build frontend run `npm run build`, you can serve using apache/nginx or `npm run serve`

## Promise all

- It is straight forward to resolve array of promises in js by putting them in an array and then calling `Promise.all(arrPromises)`
- But it was tricky to do this with array of arrays containing promises
- It is enticing that it is easy and straight forward to solve it like

```
 const allPromises = {
     promise1: arrayOfPromises,
     promise2: arrayOfPromises,
     promise3: arrayOfPromises,
 }
```

- Then iterating over this object in a loop, however it gives error `promise not iterable`
- Here is a little tactic to cope with it, I added all promises from the above object in one array

```
    const allPromises = [...allPromises.promise1, ...allPromises.promise2,...allPromises.promise3]
```

- And modify the code of the underline arrayOfPromises to call and return like

```
function('promise1', characters) {
    ....
    return {promise1, returnValue}
}
```

- It is more obvious from the real example in this code

```
    // film.characters is an array of urls to characters api end point - hence it makes linear array of promises
    // Using getCharacters to make the above array as one promise, and put it in a linear array filmsCharacters
    films.forEach((film: any) => {
      const characters = getCharacters(film.title, film.characters);
      filmsCharacters.push(characters);
    });

    // Get all characters of a specific movie
    async function getCharacters(title: string, characters: any[]) {
    console.log("Characters : ", characters.length);
    const names: any = [];
    characters.forEach((url: string) => {
        const name = getCharacter(url);
        names.push(name);
    });

    const people = await Promise.all(names);
    return { title, characters: people };
    }
```
