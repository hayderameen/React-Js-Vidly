import http from "./httpService";
import config from "./../config.json";

export async function getGenres() {
  const { data: genres } = await http.get(config.genresEndpoint);

  return genres;
}
