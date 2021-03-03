# Start Wars

A small react/node app to show movies of star wars from an open API.

- The application contains two sub folders, backend and frontend
- Backend is written in node and provide api data
- Frontend is written in React 16.13 and is user UI.

![app](https://raw.githubusercontent.com/iloveyii/starwars/master/frontend/public/images/ss.png)

## DEMO

- [demo](https://minsoft.se/)

## Installations

- Please adjust .env file (e.g API_URL if it is not localhost)

### backend

- cd to backend
- copy .env-example to .env
- `npm install`
- `npm start`

### frontend

- cd to frontend
- copy .env-example to .env
- `npm install`
- `npm start`
- if you want to build frontend run `npm run build`, you can serve using apache/nginx or `npm run serve`

## Tips and tricks

### Webserver

- We use the same node API sever for both api requests and serving the (build / static files) dist directory (frontend/dist/) of React app

### Promise all

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

    const allPromises = await Promise.all(filmsCharacters);
    // ....
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

### The Redux wrapper and Models - frontend

- Working with the redux is as easy as creating one file in src/model and writing attributes of the model eg. title, release_date
- Then goto src/store/index.js and add its entry in redux store, like others. You are now connected to redux store, all your actions, action types, reducers, sagas/api are in place. It also gives validation of the form/model.
- By default all read actions are called at start of app (in browsers), check dev tools network tab

### The Node MVC framework - backend

- You need to create a model at src/models/Film.ts - it is very similar to the model in frontend above
- Create a controller with a few lines of code at src/contollers/film.ts - It is very straight forward in the code already - CRUD functions only and if you need anything more
- Create a route to your controller at src/routes/film.ts - simply express router
- Plug the new routes in the src/app.ts in the section : // Routes Import. Your backend API is ready

### Issues

- Error in frontend : `ENOSPC: System limit for number of file watchers reache`
- Solution: `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`

## Nginx Virutal host

```
server {
    listen 80;
    listen [::]:80;

    root /home/ubuntu/devs/starwars/frontend/dist;
    index index.html index.htm;

    server_name <ip>;

    location / {
        try_files $uri $uri/ =404;
    }
}

```

- sudo certbot --nginx -d site.se
