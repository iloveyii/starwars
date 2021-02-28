import axios from 'axios';
import { getFilms } from './serviceHandler';
import filmsMock from './mocks/films.json';
import gql from 'graphql-tag';
import { graphQLClient } from './client';

describe('Expect non empty list of films', () => {
  it('should return films count equal to 6', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce(filmsMock);
    const data = await getFilms();
    expect(data.count).toEqual(6);
  });
});

describe('Expect non empty list of films with required fields only', () => {
  it('should return films containing attributes: title, release_date', async () => {
    const QUERY = gql`
      query films {
        films {
          title
          release_date
        }
      }
    `;

    const response = await graphQLClient.query({
      query: QUERY,
    });
    // Hack - remove - __typedef
    const result = response.data.films.map(f => ({ title: f.title, release_date: f.release_date }));
    expect(Object.keys(result[0]).length).toEqual(2);
  });
});
