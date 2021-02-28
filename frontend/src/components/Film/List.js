import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "./style.css";

const styles = (theme) => ({});

const useStyles = makeStyles((theme) => styles(theme));

const Card = ({ film, i }) => {
  const classes = useStyles();
  return (
    <div className="card">
      <Link to={`/films/view/${i}`} className={classes.card}>
        <h2 className="title">{film.title}</h2>
        <h3 className="release_date">{film.release_date}</h3>
      </Link>
    </div>
  );
};

export default function List({ films }) {
  return (
    <>
      {films &&
        Array.isArray(films) &&
        films.map((film, i) => <Card key={i} film={film} i={i} />)}
    </>
  );
}
