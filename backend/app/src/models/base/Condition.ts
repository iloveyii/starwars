import { ObjectId } from "mongodb";
import { ConditionT } from "../../types";
import { ConditionI } from "../../interfaces";
import { cond } from "lodash";

const dialect = process.env.CONTROLLER_DIALECT || "mongodb";

class Condition implements ConditionI {
  constructor(private readonly condition: ConditionT) {
    console.log("Inside condi: ", condition);
    if (dialect === "mongodb") {
      if (condition.where._id) {
        this.toObjectId(condition);
      } else if (condition.where.id) {
        condition.where._id = condition.where.id;
        this.toObjectId(condition);
      }
    }
  }

  toObjectId(condition: ConditionT) {
    if (Array.isArray(condition.where._id)) {
      const obj_ids = condition.where._id.map(
        (_id: string) => new ObjectId(_id)
      );
      condition.where["_id"] = { $in: obj_ids };
    } else if (condition.where._id) {
      condition.where["_id"] = new ObjectId(condition.where._id);
    }
  }

  get where(): ConditionT | any {
    return this.condition.where;
  }
}

export default Condition;
