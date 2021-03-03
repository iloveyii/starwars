import bodyParser from "body-parser";
import { Request, Response, NextFunction, response } from "express";
import Condition from "../models/base/Condition";
import Film from "../models/Film";
const uuidv1 = require("uuid/v1");
import { getResetPasswordMessage, getResetPasswordLink } from "../utils";
import Mongo from "../models/base/Mongo";
import axios from "axios";
import gql from "graphql-tag";
import { getFilms } from "../utils/swapi";

// @desc   Get all from Model
// @route  GET /api/v1/films
export const readFilms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const films = await getFilms();
  const films = [
    {
      title: "A New Hope",
      release_date: "1977-05-25",
      characters: [
        "Luke Skywalker",
        "C-3PO",
        "R2-D2",
        "Darth Vader",
        "Leia Organa",
        "Owen Lars",
        "Beru Whitesun lars",
        "R5-D4",
        "Biggs Darklighter",
        "Obi-Wan Kenobi",
        "Wilhuff Tarkin",
        "Chewbacca",
        "Han Solo",
        "Greedo",
        "Jabba Desilijic Tiure",
        "Wedge Antilles",
        "Jek Tono Porkins",
        "Raymus Antilles",
      ],
    },
    {
      title: "The Empire Strikes Back",
      release_date: "1980-05-17",
      characters: [
        "Luke Skywalker",
        "C-3PO",
        "R2-D2",
        "Darth Vader",
        "Leia Organa",
        "Obi-Wan Kenobi",
        "Chewbacca",
        "Han Solo",
        "Wedge Antilles",
        "Yoda",
        "Palpatine",
        "Boba Fett",
        "IG-88",
        "Bossk",
        "Lando Calrissian",
        "Lobot",
      ],
    },
    {
      title: "Return of the Jedi",
      release_date: "1983-05-25",
      characters: [
        "Luke Skywalker",
        "C-3PO",
        "R2-D2",
        "Darth Vader",
        "Leia Organa",
        "Obi-Wan Kenobi",
        "Chewbacca",
        "Han Solo",
        "Jabba Desilijic Tiure",
        "Wedge Antilles",
        "Yoda",
        "Palpatine",
        "Boba Fett",
        "Lando Calrissian",
        "Ackbar",
        "Mon Mothma",
        "Arvel Crynyd",
        "Wicket Systri Warrick",
        "Nien Nunb",
        "Bib Fortuna",
      ],
    },
    {
      title: "The Phantom Menace",
      release_date: "1999-05-19",
      characters: [
        "C-3PO",
        "R2-D2",
        "Obi-Wan Kenobi",
        "Anakin Skywalker",
        "Jabba Desilijic Tiure",
        "Yoda",
        "Palpatine",
        "Qui-Gon Jinn",
        "Nute Gunray",
        "Finis Valorum",
        "Padmé Amidala",
        "Jar Jar Binks",
        "Roos Tarpals",
        "Rugor Nass",
        "Ric Olié",
        "Watto",
        "Sebulba",
        "Quarsh Panaka",
        "Shmi Skywalker",
        "Darth Maul",
        "Ayla Secura",
        "Ratts Tyerel",
        "Dud Bolt",
        "Gasgano",
        "Ben Quadinaros",
        "Mace Windu",
        "Ki-Adi-Mundi",
        "Kit Fisto",
        "Eeth Koth",
        "Adi Gallia",
        "Saesee Tiin",
        "Yarael Poof",
        "Plo Koon",
        "Mas Amedda",
      ],
    },
    {
      title: "Attack of the Clones",
      release_date: "2002-05-16",
      characters: [
        "C-3PO",
        "R2-D2",
        "Owen Lars",
        "Beru Whitesun lars",
        "Obi-Wan Kenobi",
        "Anakin Skywalker",
        "Yoda",
        "Palpatine",
        "Boba Fett",
        "Nute Gunray",
        "Padmé Amidala",
        "Jar Jar Binks",
        "Watto",
        "Shmi Skywalker",
        "Ayla Secura",
        "Mace Windu",
        "Ki-Adi-Mundi",
        "Kit Fisto",
        "Plo Koon",
        "Mas Amedda",
        "Gregar Typho",
        "Cordé",
        "Cliegg Lars",
        "Poggle the Lesser",
        "Luminara Unduli",
        "Barriss Offee",
        "Dormé",
        "Dooku",
        "Bail Prestor Organa",
        "Jango Fett",
        "Zam Wesell",
        "Dexter Jettster",
        "Lama Su",
        "Taun We",
        "Jocasta Nu",
        "R4-P17",
        "Wat Tambor",
        "San Hill",
        "Shaak Ti",
        "Sly Moore",
      ],
    },
    {
      title: "Revenge of the Sith",
      release_date: "2005-05-19",
      characters: [
        "Luke Skywalker",
        "C-3PO",
        "R2-D2",
        "Darth Vader",
        "Leia Organa",
        "Owen Lars",
        "Beru Whitesun lars",
        "Obi-Wan Kenobi",
        "Anakin Skywalker",
        "Wilhuff Tarkin",
        "Chewbacca",
        "Yoda",
        "Palpatine",
        "Nute Gunray",
        "Padmé Amidala",
        "Ayla Secura",
        "Mace Windu",
        "Ki-Adi-Mundi",
        "Kit Fisto",
        "Eeth Koth",
        "Adi Gallia",
        "Saesee Tiin",
        "Plo Koon",
        "Poggle the Lesser",
        "Luminara Unduli",
        "Dooku",
        "Bail Prestor Organa",
        "R4-P17",
        "Shaak Ti",
        "Grievous",
        "Tarfful",
        "Raymus Antilles",
        "Sly Moore",
        "Tion Medon",
      ],
    },
  ];
  return res.status(200).send({ success: true, data: films });
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
