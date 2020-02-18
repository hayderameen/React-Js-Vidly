import React from "react";

const ListGroup = ({ genres, id, item, onGenreChange, activeGenre }) => {
  console.log("Props as: ", id, item);
  return (
    <ul className="list-group" style={{ cursor: "pointer" }}>
      <li
        key={"all"}
        onClick={() => onGenreChange("All")}
        className={
          activeGenre === "All" ? "list-group-item active" : "list-group-item"
        }
      >
        All Movies
      </li>
      {genres.map(g => (
        <li
          key={g[id]}
          onClick={() => onGenreChange(g[item])}
          className={
            g[item] === activeGenre
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {g[item]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  id: "_id",
  item: "name"
};

export default ListGroup;
