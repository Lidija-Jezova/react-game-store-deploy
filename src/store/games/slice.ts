import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchGames} from "./asyncActions"
import {IGamesState, TGameItem} from "./types";

const initialState = {
    games: [],
    status: 'idle'
} as IGamesState

const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setGames: (state, action: PayloadAction<TGameItem[]>) => {
            state.games = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGames.pending, (state, action) => {
                state.games = []
                state.status = "loading"
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.games = action.payload
                state.status = "success"
            }).addCase(fetchGames.rejected, (state, action) => {
            state.games = []
            state.status = "failed"
        })
    }
})

export default gamesSlice.reducer