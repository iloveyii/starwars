import bodyParser from "body-parser";
import { Request, Response, NextFunction, response } from "express";
import Condition from "../models/base/Condition";
import Film from "../models/Film";
const uuidv1 = require("uuid/v1");
import { getResetPasswordMessage, getResetPasswordLink } from "../utils";
import Mongo from "../models/base/Mongo";
import axios from "axios";
import gql from "graphql-tag";

// @desc   Get all from Model
// @route  GET /api/v1/films
export const readFilms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = { query: "{ films { title release_date } } " };
  const films = await axios
    .post("http://localhost:4000/", query)
    .then((response: any) => response.data.data)
    .catch((err: any) => {
      console.error("Error occurred: ", err.message);
    });

  console.log("FILMS: ", films);
  const model = new Film(undefined);
  await model.read();
  return res.status(200).send({ success: true, data: films.films });
};

// @desc   Get a Model
// @route  GET /api/v1/films/:id
export const readFilm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const condition = new Condition({ where: { id: req.params.id } });
  const model = new Film(req.body);
  await model.read(condition);
  return res.status(200).send(model.response);
};

// @desc   Register/Create a Model - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const createFilm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Film received :", req.body);
  const model = new Film(req.body);
  (await model.validate()) && (await model.create());
  return res.status(201).send(model.response);
};

// @desc   Update a Model
// @route  UPDATE /api/v1/films
export const updateFilm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const condition = new Condition({ where: { id: req.params.id } });
  const model = new Film(req.body);
  (await model.validate()) && (await model.update(condition));
  return res.status(200).send(model.response);
};

// @desc   Delete Model
// @route  DELETE /api/v1/films
export const deleteFilm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Deleting record from films with id ", req.params.id);
  const model = new Film(req.body);
  const condition = new Condition({ where: { id: req.params.id } });
  await model.delete(condition);
  return res.status(200).send(model.response);
};
