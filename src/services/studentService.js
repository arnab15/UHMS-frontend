import httpService from "./httpService";
import { apiEndpoint } from "../config.json";

const addStudentUrl = apiEndpoint + "/student";

export function createStudentDetails(studentDetails) {
   return httpService.post(addStudentUrl, studentDetails);
}
export function getStudentById(id) {
   return httpService.get(`${addStudentUrl}/${id}`);
}
export function submitStudentHealthRecord(studentId, healthrecord) {
   return httpService.post(
      `${addStudentUrl}/${studentId}/healthrecord`,
      healthrecord
   );
}
