import React from "react";
import LikeButton from "../components/likeButton";
import { Link } from "react-router-dom";
import Movies from "./movies";
//import "font-awesome";

const MoviesTable = ({
  paginatedMovies,
  onLike,
  onDelete,
  onSort,
  sorted,
  user
}) => {
  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th style={{ cursor: "pointer" }} onClick={() => onSort("title")}>
            Title{" "}
            <i
              className={
                sorted.property === "title"
                  ? sorted.order === "asc"
                    ? "fa fa-sort-asc"
                    : "fa fa-sort-desc"
                  : ""
              }
            ></i>
          </th>
          <th
            style={{ cursor: "pointer" }}
            onClick={() => onSort("genre.name")}
          >
            Genre{" "}
            <i
              className={
                sorted.property === "genre.name"
                  ? sorted.order === "asc"
                    ? "fa fa-sort-asc"
                    : "fa fa-sort-desc"
                  : ""
              }
            ></i>
          </th>
          <th
            style={{ cursor: "pointer" }}
            onClick={() => onSort("numberInStock")}
          >
            Stock{" "}
            <i
              className={
                sorted.property === "numberInStock"
                  ? sorted.order === "asc"
                    ? "fa fa-sort-asc"
                    : "fa fa-sort-desc"
                  : ""
              }
            ></i>
          </th>
          <th
            style={{ cursor: "pointer" }}
            onClick={() => onSort("dailyRentalRate")}
          >
            Rate{" "}
            <i
              className={
                sorted.property === "dailyRentalRate"
                  ? sorted.order === "asc"
                    ? "fa fa-sort-asc"
                    : "fa fa-sort-desc"
                  : ""
              }
            ></i>
          </th>
          <th>Like</th>
          {user && <th>Delete it?</th>}
        </tr>
      </thead>
      <tbody>
        {paginatedMovies.map(movie => (
          <tr key={movie._id}>
            <td>
              {user && <Link to={`/movies/${movie._id}`}>{movie.title}</Link>}
              {!user && movie.title}
            </td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <LikeButton movie={movie} onClick={onLike} />
            </td>
            {user && (
              <React.Fragment>
                <td>
                  <button
                    onClick={() => onDelete(movie._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </React.Fragment>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
