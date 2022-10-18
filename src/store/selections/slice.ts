import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ISelectionsState, TQuerySelections, TSort} from "./types";
import {fetchTotalCount} from "./asyncActions";
import {fetchGenres} from "../genres/asyncActions";

const initialState = {
    status: 'idle',
    pages: 0,
    currentPage: 1,
    limit: 6,
    searchQuery: "",
    filterQuery: "",
    sort: {by: "releaseDate", order: "desc", name: "Release: Recent"},
    sortOptions: [
        {by: "releaseDate", order: "desc", name: "Release: Recent"},
        {by: "releaseDate", order: "asc", name: "Release: Old"},
        {by: "price", order: "desc", name: "Price: High To Low"},
        {by: "price", order: "asc", name: "Price: Low To High"},
    ],
} as ISelectionsState

const selectionsSlice = createSlice({
    name: 'selections',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload
        },
        setFilterQuery: (state, action: PayloadAction<string>) => {
            state.filterQuery = action.payload
        },
        setSort: (state, action: PayloadAction<TSort>) => {
            state.sort = action.payload
        },
        setSelections: (state, action: PayloadAction<TQuerySelections>) => {
            state.filterQuery = action.payload.filterQuery
            const isSortOption = state.sortOptions.find(option => option.by === action.payload.sort.by && option.order === action.payload.sort.order)
            if (isSortOption) {
                // TODO!
                state.sort = state.sortOptions.find(option => option.by === action.payload.sort.by && option.order === action.payload.sort.order)!
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTotalCount.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchTotalCount.fulfilled, (state, action) => {
                state.pages = action.payload
            })
            .addCase(fetchTotalCount.rejected, (state, action) => {
                state.status = 'failed'
            })
    },
})

export const {
    setCurrentPage,
    setSearchQuery,
    setFilterQuery,
    setSort,
    setSelections
} = selectionsSlice.actions

export default selectionsSlice.reducer