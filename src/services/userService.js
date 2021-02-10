import http from "./httpService";

import { apiEndpoint } from "../config.json";

const apiUrl = apiEndpoint + "/signup";

export function register(user) {
  return http.post(apiUrl, {
    name: user.name,
    email: user.email,
    password: user.password,
  });
}
