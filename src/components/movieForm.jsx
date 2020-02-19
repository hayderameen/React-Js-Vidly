import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as Movies from "../services/movieService";
import { getGenres } from "../services/genreService";

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

  async componentDidMount() {
    const tempGenres = await getGenres();
    if (this.props.match.params.id === "new") {
      this.setState({ genres: tempGenres });
      return;
    }

    const movie = await Movies.getMovie(this.props.match.params.id);
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
      genres: tempGenres
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

  async doSubmit() {
    const { history, match } = this.props;
    console.log("Submitted");
    const { data, genres } = this.state;
    // Perform saving action here
    // Getting genre ID to save in final movie object
    const genreId = genres.find(g => g.name === data.genre)._id;

    const saveMovie = {
      title: data.title,
      genreId: genreId,
      numberInStock: data.numberInStock,
      dailyRentalRate: data.dailyRentalRate
    };
    console.log(saveMovie);
    if (this.props.match.params.id === "new") {
      await Movies.saveMovie(saveMovie);
    } else {
      await Movies.updateMovie(this.props.match.params.id, saveMovie);
    }
    history.replace("/movies");

    //console.log("Movies array after saving: ", Movies.getMovies());
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
