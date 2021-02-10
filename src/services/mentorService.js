import httpService from "./httpService";
import { apiEndpoint } from "../config.json";

const allMentorsUrl = apiEndpoint + "/mentors";

export function getAllMentors() {
   return httpService.get(allMentorsUrl);
}
