import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import Condition from "../models/base/Condition";
import User from "../models/User";
const uuidv1 = require("uuid/v1");
import { getResetPasswordMessage, getResetPasswordLink } from "../utils";
import Mongo from "../models/base/Mongo";

// @desc   Get all from Model
// @route  GET /api/v1/users
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const model = new User(undefined);
  await model.read();
  if (model.response.success) {
    Object.keys(model.response.data).forEach(
      (k, i) => delete model.response.data[i]["password"]
    );
  }
  return res.status(200).send(model.response);
};

// @desc   Get a Model
// @route  GET /api/v1/users/:id
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const condition = new Condition({ where: { id: req.params.id } });
  const model = new User(req.body);
  await model.read(condition);
  return res.status(200).send(model.response);
};

// @desc   Register/Create a Model - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("User received :", req.body.user);
  const model = new User(req.body);
  (await model.validate()) && (await model.create());
  return res.status(201).send(model.response);
};

// @desc   Update a Model
// @route  UPDATE /api/v1/users
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const condition = new Condition({ where: { id: req.params.id } });
  const model = new User(req.body);
  (await model.validate()) && (await model.update(condition));
  return res.status(200).send(model.response);
};

// @desc   Update a Model - update user password with the hash link
// @route  UPDATE /api/v1/users/reset-password/<hash>
export const updateUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const condition = new Condition({ where: { hash: req.params.hash } });
  const model = new User(req.body);
  (await model.validate()) && (await model.findOneAndUpdate(condition));
  const response = {
    success: model.response.success,
    data: model.response.data,
  };
  delete model.response?.data[0]["password"];
  return res.status(200).send(model.response);
};

// @desc   Create a Model - send resetPassword link
// @route  UPDATE /api/v1/users/reset-password
export const sendPasswordResetLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const condition = new Condition({ where: { email: req.body.email } });
  const { body } = req;
  console.log("Body received :", body);
  console.log("Condition :", condition.where);
  const hash = (body.hash = uuidv1());
  const model = new User(body);

  await model.read(condition);
  if (model.response.success) {
    await model.updateHash(condition);
  }

  console.log("Resp : ", model.response);
  if (model.response.success) {
    // send notifications
  }
  delete model.response?.data[0]["password"];
  return res.status(200).send(model.response);
};

// @desc   Delete Model
// @route  DELETE /api/v1/users
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Deleting record from users with id ", req.params.id);
  const model = new User(req.body);
  const condition = new Condition({ where: { id: req.params.id } });
  await model.delete(condition);
  return res.status(200).send(model.response);
};
