import { ObjectID, ObjectId } from "mongodb";
import { ResponseT, UserT } from "../../types";
import { ConditionI, ModelI } from "../../interfaces";
import { Database } from "./Database";
import { Validator } from "node-input-validator";
import Condition from "./Condition";
import { threadId } from "worker_threads";

// --------------------------------------------------------------
// Mongo base class - It will create any document of TypeT given
// --------------------------------------------------------------
class Mongo implements ModelI {
  // for response
  _response: ResponseT = {
    success: true,
    data: [],
  };
  public database: any;

  constructor(protected readonly collection: string, public data: any) {
    // console.log("Mongo Collection : ", collection, data);
    this.database = Database.database;
  }

  // ----------------------------------
  // Implement interface
  // ----------------------------------
  async create(): Promise<any> {
    const db = await this.database.db();
    const collection = await db.collection(this.collection);
    if (!this.data._id) {
      this.data._id = this.data.id ? this.data.id : null;
    }
    // Make it object id
    if (this.data._id && typeof this.data._id === "string") {
      this.data._id = new ObjectID(this.data._id);
    }
    this.data.isNewRecord ? (this.data.isNewRecord = false) : null;
    try {
      const model = await collection.insertOne(this.data);
      this.setResponse(true, model.ops[0]);
    } catch (e) {
      console.log("Error : Duplicated _id, error no : ", e.code);
      if (e.code === 11000) {
        this.update(new Condition({ where: { _id: this.data._id } }));
      }
    }
    return this;
  }

  /**
   * Will create if model does not exist based on provide condition
   * @param condition - Find criteria
   */
  async createIfNotExist(condition: ConditionI): Promise<any> {
    await this.read(condition);
    if (!this.response.success) {
      await this.create();
    }
    return this;
  }

  async read(condition?: ConditionI, sort?: any) {
    const db = await this.database.db();
    const collection = await db.collection(this.collection);
    let model;
    if (sort && Object.keys(sort).length > 0) {
      model = await collection.find(condition?.where).sort(sort);
    } else {
      model = await collection.find(condition?.where);
    }
    const arr = await model.toArray();
    if (arr.length > 0) {
      this.setResponse(true, arr);
    } else {
      this.setResponse(false, [
        {
          mesg:
            "No record found with condition " +
            JSON.stringify(condition?.where),
        },
      ]);
    }
    return this;
  }

  async update(condition: ConditionI) {
    const db = await this.database.db();
    console.log("Data in update : ", this.data);
    const collection = await db.collection(this.collection);
    delete this.data["_id"]; // it is in condition and should not be in updating fields
    console.log("Update condi: ", condition?.where);
    const model = await collection.findOneAndUpdate(
      condition?.where,
      { $set: { ...this.data } },
      {
        upsert: false,
        returnOriginal: false,
      }
    );
    this.setResponse(true, model.value);
    return this;
  }

  async findOneAndUpdate(condition: ConditionI) {
    await this.read(condition);
    console.log("Read : ", this.response);
    if (this.response.success) {
      return await this.update(condition);
    }
    return this;
  }

  async delete(condition: ConditionI) {
    const db = await this.database.db();
    const collection = await db.collection(this.collection);
    const model = await collection.deleteOne(condition?.where);
    if (model.deletedCount > 0) {
      this.setResponse(true, {
        id: JSON.parse(JSON.stringify(condition.where))["_id"],
        message:
          "Deleted record with condition " + JSON.stringify(condition.where),
      });
    } else {
      this.setResponse(
        false,
        "Cannot delete record with condition " + JSON.stringify(condition.where)
      );
    }
    return this;
  }

  async deleteMany(condition: ConditionI) {
    const db = await this.database.db();
    const collection = await db.collection(this.collection);
    const model = await collection.deleteMany(condition?.where);
    console.log("Deleted : ", model.deletedCount);
  }

  // ----------------------------------
  // Class methods
  // ----------------------------------
  setResponse(success: boolean, data: any) {
    this._response = { success, data: Array.isArray(data) ? data : [data] };
  }

  get response(): ResponseT {
    return this._response;
  }

  rules() {
    return {};
  }

  async validate() {
    const rules = this.rules();
    const validator = new Validator(this.data, rules);
    const matched = await validator.check();
    if (!matched) {
      this.setResponse(false, validator.errors);
      return false;
    }
    this.setResponse(true, validator.errors);
    return true;
  }
}

export default Mongo;
