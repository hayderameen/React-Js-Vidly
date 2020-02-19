import http from "./httpService";
import config from "./../config.json";

async function getMovies() {
  const { data: movies } = await http.get(config.moviesEndpoint);
  console.log("Movies got from Server: ", movies);
  return movies;
}

async function deleteMovie(id) {
  await http.delete(`${config.moviesEndpoint}/${id}`);
}

async function getMovie(id) {
  const { data: movie } = await http.get(`${config.moviesEndpoint}/${id}`);
  return movie;
}

async function saveMovie(movie) {
  console.log("This movie", movie);
  await http.post(config.moviesEndpoint, movie);
}

async function updateMovie(id, movie) {
  await http.put(`${config.moviesEndpoint}/${id}`, movie);
}

export { getMovies, deleteMovie, getMovie, saveMovie, updateMovie };
