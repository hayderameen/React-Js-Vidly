import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as Movies from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        title: "",
        genre: "",
        numberInStock: 0,
        dailyRentalRate: 0
      },
      errors: {},
      genres: []
    };
  }

  componentDidMount() {
    if (this.props.match.params.id === "new") {
      this.setState({ genres: getGenres() });
      return;
    }

    const movie = Movies.getMovie(this.props.match.params.id);
    console.log(movie);
    if (!movie) {
      this.props.history.replace("/not-found");
      return;
    }
    this.setState({
      data: {
        title: movie.title,
        genre: movie.genre.name,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate
      },
      genres: getGenres()
    });
  }

  schema = {
    title: Joi.string()
      .required()
      .label("Movie Title"),
    genre: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .label("Stock"),
    dailyRentalRate: Joi.number()
      .max(10)
      .min(1)
      .label("Rate")
  };

  doSubmit() {
    const { history, match } = this.props;
    console.log("Submitted");
    const { data, genres } = this.state;
    // Perform saving action here
    // Getting genre ID to save in final movie object
    const genreId = genres.find(g => g.name === data.genre)._id;

    const saveMovie = {
      _id: match.params.id === "new" ? Date.now() + "" : match.params.id,
      title: data.title,
      genre: { _id: genreId, name: data.genre },
      numberInStock: data.numberInStock,
      dailyRentalRate: data.dailyRentalRate
    };
    console.log(saveMovie);
    Movies.saveMovie(saveMovie);
    history.replace("/movies");

    console.log("Movies array after saving: ", Movies.getMovies());
  }

  render() {
    return (
      <React.Fragment>
        <h1>Movie Form</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Title", "title", true)}
          <label className="my-1 mr-2" htmlFor="genre">
            Genre
          </label>
          <select
            className="custom-select my-1 mr-sm-2"
            id="genre"
            name="genre"
            onChange={this.handleChange}
          >
            <option key={this.state.data.genre} value={this.state.data.genre}>
              {this.state.data.genre}
            </option>
            {this.state.genres.map(genre => {
              if (genre.name != this.state.data.genre) {
                return (
                  <option key={genre.name} value={genre.name}>
                    {genre.name}
                  </option>
                );
              }
            })}
          </select>
          {this.renderInput("Stock", "numberInStock")}
          {this.renderInput("Rate", "dailyRentalRate")}
          {this.renderButton("Save")}
        </form>

        {/* <button
          onClick={() => history.replace("/movies")}
          className="btn btn-primary"
        >
          Save
        </button> */}
      </React.Fragment>
    );
  }
}

export default MovieForm;
