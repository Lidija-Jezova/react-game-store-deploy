import {createSlice} from "@reduxjs/toolkit";
import {fetchGame} from "./asyncActions";
import {IGameState} from "./types";

const initialState = {
    game: {},
    status: 'idle'
} as IGameState

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGame.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchGame.fulfilled, (state, action) => {
                state.game = action.payload
                state.status = 'success'
            })
            .addCase(fetchGame.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})

export default gameSlice.reducer