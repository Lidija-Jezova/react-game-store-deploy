import axios from "axios";

export default class GenreService {
    static instance = axios.create({
        baseURL: `${process.env.BASE_URL}`
    });

    static async getAll() {
        return await this.instance.get(`genres`).then(response => response.data)
    }
}