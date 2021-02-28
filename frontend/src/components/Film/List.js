import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  card: {
    // marginTop: theme.spacing(1),
    textAlign: "center",
    border: "1px solid grey",
    padding: theme.spacing(3),
    marginBottom: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  title: {
    flex: 1,
    border: "none",
  },
  release_date: {
    flex: 1,
    textAlign: "center",
  },
});

const useStyles = makeStyles((theme) => styles(theme));

const Card = ({ film, i }) => {
  const classes = useStyles();
  return (
    <Link to={`/films/view/${i}`} className={classes.card}>
      <h2 className={classes.title}>{film.title}</h2>
      <h3 className={classes.title}>{film.release_date}</h3>
    </Link>
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
