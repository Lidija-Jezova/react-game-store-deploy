import {createAsyncThunk} from "@reduxjs/toolkit";
import GameService from "../../API/GameService";
import {TGameItem} from "./types";


export const fetchGames = createAsyncThunk<TGameItem[], {
    searchQuery: string, filterQuery: string, sort: {
        by: string
        order: string
    }, currentPage: number, limit: number
}>(
    'games/fetchGamesStatus',
    async ({searchQuery, filterQuery, sort, currentPage, limit}) => {
        return await GameService.getSearchedFilteredSorted("name", searchQuery, "genres", filterQuery, sort.by, sort.order, currentPage, limit)
    }
)