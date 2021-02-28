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

  async create(): Promise<any> {
    // Email already registered - applies to SCENARIO: register
    await this.read(new Condition({ where: { email: this.data.email } }));
    if (this.response.success) {
      this.setResponse(false, [
        {
          email:
            "Film already registered with email : " +
            this.data.email +
            ", we have sent you an email to reset your password.",
        },
      ]);
      return this;
    } else {
      console.log("New email ", this.response);
    }
    const hashedPassword = await bcrypt.hash(this.data.password, 10);
    this.data.password = hashedPassword;
    await super.create();
    return this;
  }

  async update(condition: ConditionI) {
    const hashedPassword = await bcrypt.hash(this.data.password, 10);
    this.data.password = hashedPassword;
    await super.update(condition);
    return this;
  }

  async updateHash(condition: ConditionI) {
    await super.update(condition);
    return this;
  }
}

export default Film;
