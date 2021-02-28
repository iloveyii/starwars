import ActiveRecord from "./base/ActiveRecord";

class Confirm extends ActiveRecord {
  constructor(name) {
    super(name);
    this._form = {
      id: "",
      open: false,
      action: "",
      title1: "",
      title2: "",
    };
  }

  rules() {
    return {
      open: "required",
      action: "required",
    };
  }

  messages(type) {
    switch (type) {
      case this.types.create_success:
        return [{ type: "success", msg: "Created order successfully" }];
      case this.types.read_success:
        return [{ type: "info", msg: "Read all orders successfully" }];
      case this.types.update_success:
        return [{ type: "warning", msg: "Updated order successfully" }];
      case this.types.delete_success:
        return [{ type: "error", msg: "Deleted order successfully" }];
      default:
        return [{ type: "success", msg: "Order success" }];
    }
  }
}

export default Confirm;
