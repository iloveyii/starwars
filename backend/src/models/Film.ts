import Mongo from "./base/Mongo";
import bcrypt from "bcrypt";
import { ConditionI } from "../interfaces";
import Condition from "./base/Condition";

type FilmT = {
  _id?: string;
  title?: string;
  release_date?: string;
};

const COLLECTION = "films";

class Film extends Mongo {
  constructor(private user?: FilmT) {
    super(COLLECTION, user);
  }

  rules() {
    return {
      title: "required",
      release_date: "required",
    };
  }
}

export default Film;
