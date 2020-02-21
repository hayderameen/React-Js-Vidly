import http from "./httpService";
import config from "./../config.json"; // usersEndpoint, authEndpoint
import { toast } from "react-toastify";

export async function register(user) {
  try {
    const { headers } = await http.post(config.apiEndpoint + "/users", user);
    toast.success(`${user.email} is registered!`);

    return headers["x-auth-token"];
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      toast.error("This user already exists!");
    } else toast.error("Registration unsuccessful. Try again.");
  }
}

export async function login(user) {
  try {
    const { data: token } = await http.post(config.apiEndpoint + "/auth", user);
    return token;
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      toast.error("Invalid Email or Password");
    }
  }
}
