import httpService from "./httpService";

const addStudentUrl = "/student";

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
