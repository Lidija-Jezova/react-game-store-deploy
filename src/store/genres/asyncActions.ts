import {createAsyncThunk} from "@reduxjs/toolkit";
import GenreService from "../../API/GenreService";

export const fetchGenres = createAsyncThunk<string[]>(
    'games/fetchGenresStatus',
    async () => {
        return await GenreService.getAll()
    }
)