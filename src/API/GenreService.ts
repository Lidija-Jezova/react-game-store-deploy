import axios from "axios";

export default class GenreService {
    static instance = axios.create({
        baseURL: `https://react-online-game-store.herokuapp.com/`
    });

    static async getAll() {
        return await this.instance.get(`genres`).then(response => response.data)
    }
}