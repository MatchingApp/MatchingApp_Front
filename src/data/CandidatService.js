import http from "./Http-comman";
class CandidatService {

  getAll() {
    return http.get("/api/candidates");
  }

  getCandidateByName(name) {
    return http.get("/api/candidates/byname/" + name);
  }

  getSkills() {
    return http.get("/api/candidates/skills/");
  }


  getCandidate(data) {
    return http.post("/api/candidates/search", data);
  }

  getCandidateBySkills(skills) {
    return http.get("/api/candidates/match/" + skills);
  }

  createCandidate(data) {
    return http.post("/api/candidates/addcandidat", data)
  }

  UpdateCandidate(data) {
    return http.post("/api/candidates/updatecandidat", data)
  }

  DeleteCandidate(id) {
    return http.delete("/api/candidates/deletecandidat/" + id)
  }

}
export default new CandidatService();