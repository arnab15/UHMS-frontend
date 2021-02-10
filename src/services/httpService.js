import axios from "axios";
import { toast } from "react-toastify";
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;
  if (!expectedError) {
    console.log("Logging the error", error);
    toast.error("An unexpected error occured", {
      hideProgressBar: false,
    });
  }
  return Promise.reject(error);
});
const setJwt = (token) => {
  axios.defaults.headers.common["x-auth-token"] = `Bearer ${token}`;
};
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
