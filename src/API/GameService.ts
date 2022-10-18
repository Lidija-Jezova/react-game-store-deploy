import axios from "axios";
import React, {Component} from "react";

export default class GameService {
    static instance = axios.create({
        baseURL: `${process.env.BASE_URL}`
    });

    static async getAll() {
        return await this.instance.get(`games`).then(response => response.data)
    }

    static async getById(id: number) {
        return await this.instance.get(`games/${id}`).then(response => response.data)
    }

    static async getSearchedFilteredSorted(searchBy: string, searchQuery: string, filterBy: string, filterQuery: string, sortBy = '', sortOrder = '', page = 1, limit = 6) {
        return await this.instance.get(`games?${searchBy}_like=${searchQuery}&${filterBy}_like=${filterQuery}&_sort=${sortBy}&_order=${sortOrder}&_page=${page}&_limit=${limit}`)
            .then(response => response.data)
    }
}