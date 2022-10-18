import {createAsyncThunk} from "@reduxjs/toolkit";
import GameService from "../../API/GameService";
import {RootState} from "../index";
import {countPages} from "../../utils/pages";

export const fetchTotalCount = createAsyncThunk<number, { searchQuery: string, filterQuery: string }, { state: RootState }>(
    'selections/fetchTotalCountStatus',
    async ({searchQuery, filterQuery}, thunkAPI) => {
        const totalGames = (searchQuery === '' && filterQuery === ''
                ? await GameService.getAll()
                    .then(response => response.length)
                : await GameService.getSearchedFilteredSorted("name", searchQuery, "genres", filterQuery)
                    .then(response => response.length)
        )
        return countPages(totalGames, thunkAPI.getState().selections.limit) as number
    }
)