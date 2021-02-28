const { RESTDataSource } = require('apollo-datasource-rest');

class FilmsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api/';
  }

  async getFilms() {
    const data = await this.get(`films/`);
    console.log('Inside FilmsAPI', data);
    return data.results;
  }
}

export default FilmsAPI;
