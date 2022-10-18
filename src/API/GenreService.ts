import axios from "axios";

export default class GenreService {
    static instance = axios.create({
        baseURL: ``
    });

    static async getAll() {
        return await this.instance.get(`genres`).then(response => response.data)
    }
}