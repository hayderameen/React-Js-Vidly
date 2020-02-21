import axios from "axios";
import { toast } from "react-toastify";
import { getCurrentToken } from "./authService";

axios.defaults.headers.common["x-auth-token"] = getCurrentToken();

axios.interceptors.response.use(null, error => {
  // It is handling unexpected errors globally
  const expectedError =
    error.response &&
    (error.response.status >= 400) & (error.response.status < 500);

  if (!expectedError) {
    console.log("Logging the unexpected error: ", error);
    toast.error("An unexpected error occured");
  } else if (error.response && error.response.status === 403) {
    toast.warn("You are not allowed to delete a movie!");
  } else if (error.response && error.response.status === 400) {
    toast.warn(error.response.data);
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
