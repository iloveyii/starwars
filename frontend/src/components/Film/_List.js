import React from "react";
import { Link } from "react-router-dom";

const Card = ({ film, i }) => {
  return (
    <div className="card">
      <div className="card-body">
        <Link to={`/films/view/${i}`}>
          <h2 className="title">{film.title}</h2>
          <h3 className="release_date">{film.release_date}</h3>
        </Link>
      </div>
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
