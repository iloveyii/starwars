import Mongo from "./base/Mongo";
import bcrypt from "bcrypt";
import { ConditionI } from "../interfaces";
import Condition from "./base/Condition";

type UserT = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  zipcode?: string;
  city?: string;
  country?: string;
  phone?: string;
  email: string;
  password?: string;
  hash?: string;
  scenario?: string;
};

const COLLECTION = "users";

class User extends Mongo {
  constructor(private user?: UserT) {
    super(COLLECTION, user);
  }

  rules() {
    if (this.user?.scenario && this.user.scenario === "passwordReset") {
      return {
        password: "required",
      };
    }

    if (this.user?.scenario && this.user.scenario === "passwordResetLink") {
      return {
        email: "required",
        hash: "required",
      };
    }

    if (this.user?.scenario && this.user.scenario === "register") {
      return {
        email: "required|email",
      };
    }

    return {
      firstName: "required",
      lastName: "required",
      email: "required|email",
    };
  }

  async create(): Promise<any> {
    // Email already registered - applies to SCENARIO: register
    await this.read(new Condition({ where: { email: this.data.email } }));
    if (this.response.success) {
      this.setResponse(false, [
        {
          email:
            "User already registered with email : " +
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

export default User;
