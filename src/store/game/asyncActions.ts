import {createAsyncThunk} from "@reduxjs/toolkit";
import GameService from "../../API/GameService";
import {TGameItem} from "./types";

export const fetchGame = createAsyncThunk<TGameItem, number>(
    "game/fetchGameStatus",
    async (id: number) => {
        return await GameService.getById(id) as TGameItem
    }
)