import axios from "axios";

export default class GenreService {
    static instance = axios.create({
        baseURL: 'http://localhost:3001/'
    });

    static async getAll() {
        return await this.instance.get(`genres`).then(response => response.data)
    }
}