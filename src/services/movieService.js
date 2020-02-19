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

export { getMovies, deleteMovie };
