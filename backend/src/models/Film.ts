import Mongo from "./base/Mongo";

type FilmT = {
  _id?: string;
  title: string;
  release_date: string;
};

const COLLECTION = "films";

class Film extends Mongo {
  constructor(private film?: FilmT) {
    super(COLLECTION, film);
  }

  rules() {
    return {
      title: "required",
      release_date: "required",
    };
  }
}

export default Film;
