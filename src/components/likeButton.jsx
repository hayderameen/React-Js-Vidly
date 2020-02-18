import React, { Component } from "react";

const LikeButton = ({ movie, onClick }) => {
  if (movie.like)
    return (
      <i
        onClick={() => onClick(movie)}
        style={{ cursor: "pointer" }}
        className="fa fa-heart"
      ></i>
    );
  else
    return (
      <i
        onClick={() => onClick(movie)}
        style={{ cursor: "pointer" }}
        className="fa fa-heart-o"
      ></i>
    );
};

export default LikeButton;
