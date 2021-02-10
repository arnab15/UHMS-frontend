import http from "./httpService";

import { apiEndpoint } from "../config.json";

const loginUrl = apiEndpoint + "/login";
const signupUrl = apiEndpoint + "/signup";
const loginWithGoogleUrl = apiEndpoint + "/googlelogin";
export function login(email, password) {
  return http.post(loginUrl, {
    email,
    password,
  });
}
export function signup(name, email, password) {
  return http.post(signupUrl, {
    name,
    email,
    password,
  });
}
export function loginWithGoogle(token) {
  return http.post(
    loginWithGoogleUrl,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

// http.get(apiEndpoint + "/test")();
