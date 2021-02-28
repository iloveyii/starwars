import Login from "../models/Login";
import User from "../models/User";
import Setting from "../models/Setting";
import Confirm from "../models/Confirm";

const models = {
  logins: new Login("logins"),
  users: new User("users"),
  settings: new Setting("settings"),
  confirms: new Confirm("confirms"),
};

export default models;
