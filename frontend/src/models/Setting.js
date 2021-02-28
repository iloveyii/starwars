import ActiveRecord from "./base/ActiveRecord";

class Setting extends ActiveRecord {
  constructor(name) {
    super(name);
    this._form = {
      id: "",
      layout: {},
    };
  }

  rules() {
    return {};
  }

  messages(type) {
    switch (type) {
      case this.types.create_success:
        return [{ type: "success", msg: "Created setting successfully" }];
      case this.types.read_success:
        return [{ type: "info", msg: "Read all settings successfully" }];
      case this.types.update_success:
        return [{ type: "warning", msg: "Updated setting successfully" }];
      case this.types.delete_success:
        return [{ type: "error", msg: "Deleted setting successfully" }];
      default:
        return [{ type: "success", msg: "Setting success" }];
    }
  }
}

export default Setting;
