import http from "./httpService";
import config from "./../config.json";

const endPoint = config.apiEndpoint + "/movies";

async function getMovies() {
  const { data: movies } = await http.get(endPoint);

  return movies;
}

async function deleteMovie(id) {
  await http.delete(`${endPoint}/${id}`);
}

async function getMovie(id) {
  const { data: movie } = await http.get(`${endPoint}/${id}`);
  return movie;
}

async function saveMovie(movie) {
  await http.post(endPoint, movie);
}

async function updateMovie(id, movie) {
  await http.put(`${endPoint}/${id}`, movie);
}

export { getMovies, deleteMovie, getMovie, saveMovie, updateMovie };
