import React from "react";
import LikeButton from "../components/likeButton";
import { Link } from "react-router-dom";
import Movies from "./movies";
import { getCurrentUser } from "../services/authService";
//import "font-awesome";

const MoviesTable = ({ paginatedMovies, onLike, onDelete, onSort, sorted }) => {
  //const temp = { ...user }; // I don't understand why can't I use it directly without copying first. Otherwise it gives undefined error
  const user = getCurrentUser();
  let adminStatus = false;
  if (user) {
    adminStatus = user.isAdmin;
  }
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
          {adminStatus && <th>Delete it?</th>}
        </tr>
      </thead>
      <tbody>
        {paginatedMovies.map(movie => (
          <tr key={movie._id}>
            <td>
              <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
            </td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <LikeButton movie={movie} onClick={onLike} />
            </td>
            {adminStatus && (
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
