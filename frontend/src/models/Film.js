import ActiveRecord from "./base/ActiveRecord";

class Film extends ActiveRecord {
  constructor(name) {
    super(name);
    this._form = {
      title: "",
      release_date: "",
    };
  }

  rules() {
    return {
      title: "required",
      release_date: "required",
    };
  }

  messages(type) {
    switch (type) {
      case this.types.create_success:
        return [{ type: "success", msg: "Created film successfully" }];
      case this.types.read_success:
        return [{ type: "info", msg: "Read all films successfully" }];
      case this.types.update_success:
        return [{ type: "warning", msg: "Updated film successfully" }];
      case this.types.delete_success:
        return [{ type: "error", msg: "Deleted film successfully" }];
      default:
        return [{ type: "success", msg: "Film success" }];
    }
  }
}

export default Film;
