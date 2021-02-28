import express from "express";
import {
  readFilm,
  readFilms,
  createFilm,
  updateFilm,
  deleteFilm,
} from "../controllers/film";
import { authenticate_user } from "../middlewares/authenticate_user";
import { same_user_id } from "../middlewares/same_user_id";
import { ws_update } from "../middlewares/ws_update";

const router = express.Router();

router
  .route("/:id")
  .get([authenticate_user, same_user_id], readFilm)
  .delete(ws_update, deleteFilm) // should admin delete
  .put(ws_update, updateFilm);

router.route("/").get(readFilms).post(ws_update, createFilm);

export default router;
