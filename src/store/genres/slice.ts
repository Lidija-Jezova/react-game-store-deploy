import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchGenres} from "./asyncActions";
import {IGenresState} from "./types";

const initialState = {
    genres: [],
    status: 'idle'
} as IGenresState

const genresSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setGenres: (state, action: PayloadAction<string[]>) => {
            state.genres = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenres.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.genres = action.payload
                state.status = 'success'
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})

export default genresSlice.reducer