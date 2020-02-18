import React, { Component } from "react";
import * as movies from "../services/fakeMovieService";
import * as genres from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";

class Movies extends Component {
  state = {
    moviesCount: movies.getMovies().length,
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: "All",
    searchQuery: "",
    sort: { property: "title", order: "asc" }
  };
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.pagedData = this.pagedData.bind(this);
  }

  componentDidMount() {
    this.setState({ movies: movies.getMovies(), genres: genres.getGenres() });
    console.log("Genres in state as: ", genres.getGenres());
  }

  handleDelete(movieId) {
    movies.deleteMovie(movieId);
    this.setState({
      moviesCount: this.state.moviesCount - 1,
      movies: movies.getMovies()
    });
  }

  handleLike(movie) {
    let movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].like = !movies[index].like;

    this.setState({ movies });
  }

  handlePageChange(page) {
    this.setState({ currentPage: page });
  }

  handleGenreChange(genre) {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  }

  handleSort(property) {
    this.setState({
      sort: {
        property: property,
        order: this.state.sort.order === "asc" ? "desc" : "asc"
      }
    });
  }

  handleSearch(query) {
    this.setState({ searchQuery: (this.state.searchQuery = query) });
    console.log("Search Query: ", this.state.searchQuery);
  }

  pagedData() {
    let paginatedMovies = this.state.movies;

    if (this.state.searchQuery) {
      paginatedMovies = paginatedMovies.filter(m =>
        m.title.toLowerCase().startsWith(this.state.searchQuery.toLowerCase())
      );
    }
    if (this.state.selectedGenre != "All") {
      paginatedMovies = paginatedMovies.filter(
        m => m.genre.name === this.state.selectedGenre
      );
    }

    let tempPaginatedMovies = [...paginatedMovies];

    console.log("CURRENTLY SELECTED MOVIES BASED ON GENRE: ", paginatedMovies);

    tempPaginatedMovies = _.orderBy(
      tempPaginatedMovies,
      [this.state.sort.property],
      this.state.sort.order
    );

    paginatedMovies = paginate(
      tempPaginatedMovies,
      this.state.currentPage,
      this.state.pageSize
    );

    console.log("Paginated Movies after paginate function", paginatedMovies);
    console.log(this.state.sort, "is going to be sorted");

    return { paginatedMovies, tempPaginatedMovies };
  }
  render() {
    if (this.state.moviesCount === 0) {
      return (
        <main className="container">
          <h1>No More Movies Left</h1>
        </main>
      );
    }
    const { paginatedMovies, tempPaginatedMovies } = this.pagedData();
    return (
      <div className="row">
        <div className="col-md-2">
          <ListGroup
            genres={this.state.genres}
            onGenreChange={this.handleGenreChange}
            activeGenre={this.state.selectedGenre}
          />
        </div>
        <div className="col-md-8">
          <Link to={`/movies/new`}>
            <button className="btn btn-primary">New Movie</button>
          </Link>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
          <h3>Total movies: {tempPaginatedMovies.length}</h3>
          <MoviesTable
            paginatedMovies={paginatedMovies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sorted={this.state.sort}
          />
          <Pagination
            itemsCount={tempPaginatedMovies.length}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
