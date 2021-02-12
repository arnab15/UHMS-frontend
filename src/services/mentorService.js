import httpService from "./httpService";

const allMentorsUrl = "/mentors";
const MentorsUrl = "/allmentors";
const addNewMentorUrl = "/mentor";

export function getAllMentors() {
   return httpService.get(allMentorsUrl);
}

export function allMentors() {
   return httpService.get(MentorsUrl);
}

export function addNewMentor(mentor) {
   return httpService.post(addNewMentorUrl, mentor);
}
