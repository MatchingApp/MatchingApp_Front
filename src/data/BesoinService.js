import http from "./Http-comman";
class BesoinService {

    getAll() {
        return http.get("/api/besoins");
    }

    createBesoin(data) {
        return http.post("/api/besoins/addbesoin", data)
    }

    UpdateBesoin(data) {
        return http.post("/api/besoins/updatebesoin", data)
    }

    DeleteBesoin(id) {
        return http.delete("/api/besoins/deletebesoin/" + id)
    }

}
export default new BesoinService();