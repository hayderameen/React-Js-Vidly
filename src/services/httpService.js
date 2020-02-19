import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  // It is handling unexpected errors globally
  const expectedError =
    error.response &&
    (error.response.status >= 400) & (error.response.status < 500);

  if (!expectedError) {
    console.log("Logging the unexpected error: ", error);
    toast.error("An unexpected error occured");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
