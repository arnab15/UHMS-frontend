import httpService from "./httpService";
import { apiEndpoint } from "../config.json";
const profileUrl = `${apiEndpoint}/profile`;

export const getProfiles = () => {
  return httpService.get(profileUrl);
};

export const getProfileByUsername = (username) => {
  return httpService.get(profileUrl + "/" + username);
};
