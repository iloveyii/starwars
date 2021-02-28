import ActiveRecord from "./base/ActiveRecord";

class User extends ActiveRecord {
  constructor(name) {
    super(name);
    this._form = {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      zipcode: "",
      city: "",
      country: "",
      phone: "",
      email: "",
      password: "",
      accept: "",
    };
  }

  rules() {
    if (this.form.scenario === "passwordReset") {
      return {
        email: "required|email",
      };
    }

    return {
      email: "required|email",
      firstName: "required",
      lastName: "required",
      address1: "required",
      zipcode: "required",
      city: "required",
      country: "required",
      phone: "required",
      email: "required",
    };
  }

  messages(type) {
    switch (type) {
      case this.types.create_success:
        return [{ type: "success", msg: "Created user successfully" }];
      case this.types.read_success:
        return [{ type: "info", msg: "Read all users successfully" }];
      case this.types.update_success:
        return [{ type: "warning", msg: "Updated user successfully" }];
      case this.types.delete_success:
        return [{ type: "error", msg: "Deleted user successfully" }];
      default:
        return [{ type: "success", msg: "User success" }];
    }
  }
}

export default User;
